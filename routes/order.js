const express = require('express');
const router = express.Router();
// importo cosas importantes
const Order = require('../models/Order');
const {verifyToken} = require('../utils/auth');


//ruta para crear orden
router.post('/order', verifyToken, (req, res, next) =>{
    const {_id} = req.user
    const order = {...req.body, _id}
        Order.create(order)
            .then((order)=>{
                res.status(201).json({result:order});
            })
            .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error});
    })
});


//ruta para leer todas las ordenes por usuario
router.get('/order/user/:_id', verifyToken, (req, res, next) => {
    const {_id} = req.user
    Order.find({_user: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"order",
            populate:{
                path:"_user",
                select: "name",
            },
        })
        .then((orders)=>{
            res.status(200).json({result:orders})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer orden por id
router.get('/order/:_id', verifyToken, (req, res, next) => {
    const {_id} = req.params
    Order.find({_id: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"order",
            populate:{
                path:"_user",
                select: "name",
            },
        })
        .then((order)=>{
            res.status(200).json({result:order})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});


//ruta para update/editar una orden
router.patch('/order/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user
    Order.findById(id)
        .then((order)=> {
            const orderOwner = JSON.stringify(order._user)
            const idString = JSON.stringify(_id)
            if(orderOwner === idString) {
                Order.findByIdAndUpdate(id, req.body, {new:true})
                    .then((order)=>{
                        res.status(210).json({result:order})
                    })
            } else {
                res.status(403).json({msg:"No tienes permisos para editar esta orden"})
            }

        })
        .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error})
})
})


//ruta para borrar una orden
router.delete('/order/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user
    Order.findById(id)
        .then((order)=> {
            const orderOwner = JSON.stringify(order._user)
            const idString = JSON.stringify(_id)
            if(orderOwner === idString) {
                Order.findByIdAndDelete(id)
                    .then((order)=>{
                        res.status(210).json({result:order})
                    })
            } else {
                res.status(403).json({msg:"No tienes permisos para borrar esta orden"})
            }

        })
        .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error})
})
})


module.exports = router;