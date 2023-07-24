import dotenv from 'dotenv';
import express from "express";
import cookieParser from 'cookie-parser';
import storageUsuario from "./routes/usuario.js";

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());
appExpress.use(express.json());
appExpress.use("/usuario", storageUsuario);

const config =JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));