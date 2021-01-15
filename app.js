//agregar dotenv
require("dotenv").config();


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require("mongoose");
const cors = require('cors')

const database = process.env.DB
//const database = 'mongodb://localhost/robert-caro-app'

//Agregamos la conexion de mongoose

mongoose.connect(database,{
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
        origin: ['http://localhost:3001','https://robert-caro-back.herokuapp.com'],
        credentials: true,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const storeRouter = require('./routes/store');
const productRouter = require('./routes/product');
const addressRouter = require('./routes/address');
const searchRouter = require('./routes/search')

app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/store', storeRouter);
app.use('/api/product', productRouter);
app.use('/api/address', addressRouter);
app.use('/api/search', searchRouter);

app.use("*", (req,res)=>{
 res.sendFile(path.join(__dirname, "public","index.html"));
});

module.exports = app;