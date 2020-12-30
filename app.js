//agregar dontenv
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Agregar mongoose para base de datos
const mongoose = require("mongoose");
const cors = require("cors")

//Agregar conexión antes de que empiece la app
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((x)=>{
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((error)=>{
    console.log("Error conecting to mongo",error)
})

const app = express();
//utilizo cors para darle permisos a otras apps

app.use(
    cors({
      origin:["http://localhost:3001"],
      credentials: true,
    })
);


const mongoose = require("mongoose");
const cors = require('cors')



//Agregamos la conexion de mongoose

mongoose.connect(process.env.DB,{
   useNewUrlParser:true,
   useUnifiedTopology:true 
}).then((x)=>{
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((err)=>{
    console.log("Error connecting to mongo", err)
})



const app = express();
//utilizo cors para darle permisos a otras apps
app.use(
    cors({
        origin: ['http://localhost:3001', 'https://robert-caro-back.herokuapp.com/'],
        credentials: true,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Estas son las rutas, por practica agregamos prefijo api
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const storeRouter = require('./routes/store');
const productRouter = require('./routes/product');
const addressRouter = require('./routes/address');

app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/store', storeRouter);
app.use('/api/product', productRouter);
app.use('/api/address', addressRouter)

module.exports = app;
