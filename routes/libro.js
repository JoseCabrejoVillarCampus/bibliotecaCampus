import expressQueryBoolean from 'express-query-boolean';
import session from 'express-session'; 
import mysql from 'mysql2'; 
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyLibro from '../middleware/libromiddleware.js';
const storageLibro = Router(); 
let con = undefined;

storageLibro.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageLibro.use("/:id?", async (req, res, next) => {
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
storageLibro.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
}) 
storageLibro.get("/:id?", proxyLibro , async (req,res)=>{
    const jwt = req.session.jwt;
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        return res.sendStatus(403);
    }
    let sql = (jwtData.payload.id)
        ? [`SELECT * FROM libro WHERE id_libro = ?`, jwtData.payload.id] 
        : [`SELECT * FROM libro`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    ); 
})
storageLibro.post("/", proxyLibro ,async (req, res) => {
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
storageLibro.put("/:id", proxyLibro,async (req, res) => {
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
storageLibro.delete("/:id",async (req, res) => {
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
export default storageLibro;