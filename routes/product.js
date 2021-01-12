const express = require('express');
const router = express.Router();
// importo cosas importantes
const Product = require('../models/Product');
const Store = require('../models/Store');
const {verifyToken} = require('../utils/auth');


//ruta para crear producto
router.post('/', verifyToken, (req, res, next) =>{
    const { _id:_owner } = req.user
    const product = {...req.body, _owner}
    Product.create(product)
        .then((product)=>{
            res.status(201).json({result:product});
                })
        .catch((error)=> {
                res.status(400).json({msg:"Algo salió mal", error});
    })
});


//ruta para leer todos los productos por tienda
router.get('/store/:id', verifyToken, (req, res, next) => {
    const {id} = req.params
    Store.findById(id)
        .then((store)=>{
            const owner = store._owner
            Product.find({_owner:owner})
                .populate({
                    path:"product",
                    populate:{
                        path:"_store",
                        select: "name",
                    },
                })
                .then((products)=>{
                    res.status(200).json({results:products})
                })
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer todos los productos por query
router.get('/', (req, res, next) => {
    Product.find(req.query)
        .populate("_owner", "_id name lastname")
        .then((products)=>{
            res.status(200).json({result:products})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer todos los productos
router.get('/allproducts', (req, res, next) => {
    Product.find()
        .then((products)=>{
            res.status(200).json({result:products})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para update/editar un producto
router.patch('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user
    Product.findById(id)
        .then((product)=> {
            const Owner = JSON.stringify(product._owner)
            const idString = JSON.stringify(_id)
            if(Owner === idString) {
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

router.delete('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user
    Product.findById(id)
        .then((product) =>{
            const Owner = JSON.stringify(product._owner)
            const idString = JSON.stringify(_id)
            if(Owner === idString) {
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