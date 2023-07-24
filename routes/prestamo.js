import expressQueryBoolean from 'express-query-boolean';
import session from 'express-session'; 
import mysql from 'mysql2'; 
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyPrestamo from '../middleware/prestamosmiddleware.js';
const storagePrestamo = Router(); 
let con = undefined;

storagePrestamo.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storagePrestamo.use("/:id?", async (req, res, next) => {
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
storagePrestamo.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
}) 
storagePrestamo.use(expressQueryBoolean());
const getPrestamoById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT p. id_prestamo, fecha_prestamo, fecha_devolucion, estado , a.nombre AS autor,
    l.titulo AS libro
    FROM prestamo p
    INNER JOIN autor a ON p.id_prestamo = a.id_autor
    INNER JOIN libro l ON p.id_prestamo = l.id_editorial 
    WHERE id_prestamo = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
storagePrestamo.get("/:id?", proxyPrestamo , async (req,res)=>{
    try {
        const { id} = req.query;
        if (id) {
            const data = await getPrestamoById(id);
            res.send(data);
        } else {
            const sql = [
                `SELECT p. id_prestamo, fecha_prestamo, fecha_devolucion, estado , a.nombre AS autor,
                l.titulo AS libro
                FROM prestamo p
                INNER JOIN autor a ON p.id_prestamo = a.id_autor
                INNER JOIN libro l ON p.id_prestamo = l.id_editorial;`
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
storagePrestamo.post("/", proxyPrestamo ,async (req, res) => {
    con.query( 
        /*sql*/
        `INSERT INTO libro SET ?`,
        await getBody(req),  
        (err, result) => {
            if (err) {
                console.error('Error al crear libro:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            } 
        }
    );
});
storagePrestamo.put("/:id", proxyPrestamo,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE libro SET ? WHERE id_libro = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar libro:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storagePrestamo.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM libro WHERE id_libro = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando libro ${req.params.id}: `, err.message);
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
export default storagePrestamo;