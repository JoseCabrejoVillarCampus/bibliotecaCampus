import expressQueryBoolean from 'express-query-boolean';
import session from 'express-session'; 
import mysql from 'mysql2'; 
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyReserva from '../middleware/reservamiddleware.js';
const storageReserva = Router(); 
let con = undefined;

storageReserva.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageReserva.use("/:id?", async (req, res, next) => {
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
storageReserva.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
}) 
storageReserva.use(expressQueryBoolean());
const getReservaById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT r. id_reserva, fecha_reserva, fecha_reserva_fin, estado , u.nombre AS usuario,
    l.titulo AS libro
    FROM reserva r
    INNER JOIN usuario u ON r.id_reserva = u.id_usuario
    INNER JOIN libro l ON r.id_reserva = l.id_editorial 
    WHERE id_reserva = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
storageReserva.get("/:id?", proxyReserva , async (req,res)=>{
    try {
        const { id} = req.query;
        if (id) {
            const data = await getReservaById(id);
            res.send(data);
        } else {
            const sql = [
                `SELECT r. id_reserva, fecha_reserva, fecha_reserva_fin, estado , u.nombre AS usuario,
                l.titulo AS libro
                FROM reserva r
                INNER JOIN usuario u ON r.id_reserva = u.id_usuario
                INNER JOIN libro l ON r.id_reserva = l.id_editorial;`
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
storageReserva.post("/", proxyReserva ,async (req, res) => {
    con.query( 
        /*sql*/
        `INSERT INTO reserva SET ?`,
        await getBody(req),  
        (err, result) => {
            if (err) {
                console.error('Error al crear reserva:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            } 
        }
    );
});
storageReserva.put("/:id", proxyReserva,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE reserva SET ? WHERE id_reserva = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar reserva:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageReserva.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM reserva WHERE id_reserva = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando reserva ${req.params.id}: `, err.message);
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
export default storageReserva;