import expressQueryBoolean from 'express-query-boolean';
import session from 'express-session'; 
import mysql from 'mysql2'; 
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyAutor from '../middleware/autormiddleware.js';
const storageAutor = Router(); 
let con = undefined;

storageAutor.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageAutor.use("/:id?", async (req, res, next) => {
    try {
        const encoder = new TextEncoder();
        const payload = { body: req.body, params: req.params, id: req.params.id  };
        const jwtconstructor = new SignJWT(payload);
        const jwt = await jwtconstructor 
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY)); 
        req.body = payload.body;
        req.session.jwt = jwt;
        const maxAgeInSeconds = 3600;
        res.cookie('token', jwt, { httpOnly: true, maxAge: maxAgeInSeconds * 1000 });
        next();  
    } catch (err) { 
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500); 
    }
});
storageAutor.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
}) 
storageAutor.use(expressQueryBoolean());
const getAutorById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT * FROM autor WHERE id_autor = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getAutorByNacionalidad = (nacionalidad) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT a.*
    FROM autor a WHERE a.nacionalidad= ?`, nacionalidad];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
storageAutor.get("/:id?", proxyAutor , async (req,res)=>{
    try {
        const { id, nacionalidad} = req.query;
        if (id) {
            const data = await getAutorById(id);
            res.send(data);
        } else if (nacionalidad) {
            const data = await getAutorByNacionalidad(nacionalidad);
            res.send(data); 
        } else {
            const sql = [
                `SELECT * FROM autor;`
            ];
            con.query(...sql, (err, data) => {
                if (err) {
                    console.error("Ocurrió un error intentando traer los datos de tareas", err.message);
                    res.status(err.status || 500);
                } else {
                    res.send(data);
                }
            });
        }
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
})
storageAutor.post("/", proxyAutor ,async (req, res) => {
    con.query( 
        /*sql*/
        `INSERT INTO autor SET ?`,
        await getBody(req),  
        (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            } 
        }
    );
});
storageAutor.put("/:id", proxyAutor,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE autor SET ? WHERE id_autor = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar autor:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageAutor.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM autor WHERE id_autor = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando autor ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
});
const getBody = async (req) =>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify( 
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    delete jwtData.payload.iat;
    delete jwtData.payload.exp;   
    return jwtData.payload.body 
}
export default storageAutor;