# bibliotecaCampus

# TECNOLOGIAS IMPLEMENTADAS

<div>
<img src="img/nodejs-1-logo.svg" alt="MySQL Logo" width="100">
<img src="img/Unofficial_JavaScript_logo_2.svg.png" alt="MySQL Logo" width="100">
<img src="img/mysql-logo.svg" alt="MySQL Logo" width="100">
<img src="img/nodemon.svg" alt="MySQL Logo" width="100">
<img src="img/Typescript_logo_2020.svg.png" alt="MySQL Logo" width="100">
<img src="img/2560px-Npm-logo.svg.png" alt="MySQL Logo" width="100">
</div> 


# DEPENDENCIAS IMPLEMENTADAS

Express,
express-session,
class-transformer,
reflect-metadata,
mysql2,
dotenv,
nodemon,
typescript


# INTALACION DEPENDENCIAS

1. Inicializar el archivo package.json en la consola:
```
npm init -y
```
2. Instalar nodemon (para desarrollo):
```
npm i -E -D nodemon
```
3. Instalar Express (framework web):
```
npm i -E -D express
```
4. Instalar dotenv (para gestionar variables de entorno):
```
npm i -E -D dotenv
```
5. Instalar mysql2 (para la conexión con la base de datos):
```
npm i -E -D mysql2
```
6. Instalar class-transformer (para la transformación de datos):
```
npm i -E -D class-transformer
```
7. Instalar reflect-metadata (para habilitar los decoradores):
```
npm i -E -D reflect-metadata
```
8. Instalar TypeScript (para el soporte de tipado):
```
npm i -E -D typescript
```


# INICIAR nodemon

```
npm run dev
```


# INICIAR tsc

```
npm run tsc
```


# CONFIGURACION DEL .env

En el archivo .env, configurar las siguientes variables de conexión a la base de datos:

```
MY_CONFIG={"hostname": "", "port":}
MY_CONNECT={"host":"localhost","user":"","database":"","password":"","port":}

```

# CONFIGURACION tsconfig

En el archivo tsconfig.json, agregar las siguientes opciones de configuración:

```
{
    "compilerOptions":{
        "target":"es6",
        "module":"ES6",
        "moduleResolution":"node",
        "outDir":"./dtocontroller",
        "esModuleInterop":true,
        "experimentalDecorators":true,
        "emitDecoratorMetadata": true
    }
}
```

## VALIDACION TOKEN 

Con esta linea verificamos que el token en la url coincida con el que generamos, esto debido a la persistencia de cookies de la url

```
if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        return res.sendStatus(403);
    }
```

# express-session

Express-session es un middleware de Express que proporciona un sistema de gestión de sesiones para las aplicaciones web. Las sesiones son un mecanismo que permite a los servidores web mantener información sobre el estado de un usuario entre diferentes solicitudes del cliente.

Cuando un cliente (navegador) se conecta a una aplicación web, el servidor web crea una sesión única para ese cliente. Esta sesión se identifica mediante un identificador único (un ID de sesión) que se envía al cliente en forma de cookie. En las solicitudes posteriores, el cliente incluirá este ID de sesión en las cabeceras de sus peticiones, lo que permite al servidor reconocer al cliente y mantener información específica relacionada con esa sesión.

Con esto eliminamos la persistencia que tenia la cookiees, que nos hacia tener que dar a buscar dos veces

# INTALACION

```
npm i -E -D express-session
```

#Configurar la sesión
```
Configurar la sesión
storageGenero.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true,   
}));
```

# express-query-boolean

Es una libreri que nos permite parsear los parámetros de consulta y luego definir cada tipo de consulta en una función separada.
Con este enfoque, cada tipo de consulta se maneja de manera separada en su propia función, lo que hace que el código sea más fácil de mantener y extender. Además, el uso de async/await y Promise permite manejar los errores de manera más efectiva

# INSTALACION

```
npm i -E -D express-query-boolean
```

# DEFINIMOS

Agregamos el middleware expressQueryBoolean para parsear los parámetros booleanos

```
storageTarea.use(expressQueryBoolean());
```

Función para obtener tareas por ID

```
const getTareaById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = [`SELECT * FROM tareas WHERE id_tarea = ?`, id];
    con.query(...sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

## Almacenar el JWT en la variable de sesión

```
req.session.jwt = jwt;
```

## Obtener el JWT de la variable de sesión

```
const jwt = req.session.jwt;
```

# Implementacion de los jwt y Coookies en el GET antes de enviar solicitud a la DB

<img src="./img/getjwt.png">

# Implementacion de los jwt y Cookies en el metodo POST

<img src="./img/jwtpost.png">

# Implementacion de los jwt y Cookies en el metodo PUT

<img src="./img/jwtput.png">

# Implementacion de los jwt y Cookies en el metodo DELETE

<img src="./img/jwtdel.png">

# Implementacion de los jwt y Cookies en el Archivo Middlewawre

<img src="./img/middleware.png"> 

---

# Tiempo de expiracion de permanencia de la cookies

Con esto eliminamos el tiempo de persistencia de la cookie en el navegador, ademas del masAge, tambien podemos usar "expire". 
```
const maxAgeInSeconds = 3600;
        res.cookie('token', jwt, { httpOnly: true, maxAge: maxAgeInSeconds * 1000 });
```

---

# Funcion getBody(req)

Con esta funcion vamos a enviar los parametros obtenidos de jwt y pasar el cuerpo al metodo post, aca aplicamos ya la obttencion de la variable de sesion.

```
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
```

---

# CONSULTAS

## GET Para todas las tablas

Donde '?', es el nombre de cualquier tabla, nos arrojara el contenido de estas mismas

## Consulta Autor por nacionalidad

```
http://127.10.16.15:5027/autor?nacionalidad=Colombiano
```

## Consulta Autor por id

```
http://127.10.16.15:5027/autor?id=2
```

## Consulta Libro por id

```
http://127.10.16.15:5027/libro?id=2
```
## Consulta Libro por estado

```
http://127.10.16.15:5027/libro?estado=2
```
