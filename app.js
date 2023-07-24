import express from "express";
import appCliente from './routers/cliente.js';

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());
appExpress.use(express.json());
appExpress.use("/campus", appCliente);

appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})