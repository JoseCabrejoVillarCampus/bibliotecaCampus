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
storageLibro.use(expressQueryBoolean());
const getLibroById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT * FROM libro WHERE id_libro = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getLibroByEstado = (estado) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT l.* , el.nombre AS id_estado,
    el.descripcion AS descripcion
    FROM libro l
    INNER JOIN estado_libro el ON l.id_libro = el.id_estado
    LEFT JOIN estado_libro el2 ON l.id_libro = el.descripcion
    WHERE el.nombre = ?`, estado];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getLibroByDisponible = () => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT l.* , el.nombre AS id_estado,
    el.descripcion AS descripcion
    FROM libro l
    INNER JOIN estado_libro el ON l.id_libro = el.id_estado
    LEFT JOIN estado_libro el2 ON l.id_libro = el.descripcion
    WHERE el.nombre = 'Disponible'`];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getLibroByPrestado = () => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT l. id_libro, el.nombre AS id_estado,
    el.descripcion AS descripcion,
    p.fecha_devolucion AS fecha_devolucion
    FROM libro l
    INNER JOIN prestamo p ON l.id_libro = p.id_prestamo
    INNER JOIN estado_libro el ON l.id_libro = el.id_estado
    LEFT JOIN estado_libro el2 ON l.id_libro = el.descripcion
    WHERE el.nombre = 'Prestado'`];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
storageLibro.get("/", proxyLibro , async (req,res)=>{
    try {
        const { id, estado} = req.query;
        if (id) {
            const data = await getLibroById(id);
            res.send(data);
        } else if (estado) {
            const data = await getLibroByEstado(estado);
            res.send(data); 
        } else {
            const sql = [
                `SELECT l. id_libro, titulo  , a.nombre AS autor,
                e.nombre AS editorial
                FROM libro l
                INNER JOIN autor a ON l.id_libro = a.id_autor
                INNER JOIN editorial e ON l.id_libro = e.id_editorial;`
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
storageLibro.get("/disponible", proxyLibro, async (req, res) => {
    try {
        const data = await getLibroByDisponible();
        res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageLibro.get("/prestado", proxyLibro, async (req, res) => {
    try {
        const data = await getLibroByPrestado();
        res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
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