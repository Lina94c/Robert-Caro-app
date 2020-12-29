const express = require('express');
const router = express.Router();
// importo cosas importantes
const Product = require('../models/Product');
const Store = require('../models/Store');
const {verifyToken} = require('../utils/auth');


//ruta para crear producto
router.post('/store/:_id', verifyToken, (req, res, next) =>{
    const { _id:_store } = req.params
    const product = {...req.body, _store}
    const {_id} = req.user
    Store.findById(_store)
        .then((store)=> {
            const storeOwner = JSON.stringify(store._owner)
            const idString = JSON.stringify(_id)
            if(storeOwner === idString) {
                Product.create(product)
                 .then((product)=>{
                    res.status(201).json({result:product});
                })
               
            } else {
               res.status(403).json({msg:"No tienes permisos para crear productos"}) 
            }
            
        })
    .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error});
    })
});


//ruta para leer todos los productos por tienda
router.get('/store/:_id', verifyToken, (req, res, next) => {
    const {_id} = req.params
    Product.find({_store: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"product",
            populate:{
                path:"_store",
                select: "name",
            },
        })
        .then((products)=>{
            res.status(200).json({result:products})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer todos los productos
router.get('/', (req, res, next) => {
    Product.find()
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"product",
            populate:{
                path:"_store",
                select: "name",
            },
        })
        .then((products)=>{
            res.status(200).json({result:products})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para update/editar un producto
router.patch('/store/:_id/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id:_store} = req.params;
    const {_id} = req.user
    Store.findById(_store)
        .then((store)=> {
            const storeOwner = JSON.stringify(store._owner)
            const idString = JSON.stringify(_id)
            if(storeOwner === idString) {
                Product.findByIdAndUpdate(id, req.body, {new:true})
                    .then((product)=>{
                        res.status(210).json({result:product})
                    })
            } else {
                res.status(403).json({msg:"No tienes permisos para editar productos"})
            }

        })
        .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error})
})
})

//ruta para borrar un producto

router.delete('/store/:_id/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id:_store} = req.params;
    const {_id} = req.user
    Store.findById(_store)
        .then((store) =>{
            const storeOwner = JSON.stringify(store._owner)
            const idString = JSON.stringify(_id)
            if(storeOwner === idString) {
                Product.findByIdAndDelete(id)
                    .then((product)=>{
                        res.status(210).json({result:product})
                    })
            } else {
                res.status(403).json({msg:"No tienes permisos para borrar productos"})
            }

        })
        .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error})
})
})


module.exports = router;