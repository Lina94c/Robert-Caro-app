const express = require('express');
const router = express.Router();
// importo cosas importantes
const Store = require('../models/Store');
const {verifyToken} = require('../utils/auth');


//ruta para crear tienda
router.post('/', verifyToken, (req, res, next) =>{
    const { _id:_owner } = req.user
    const store = {...req.body, _owner}
    Store.create(store)
        .then((store)=>{
            res.status(201).json({result:store});
        }).catch((error)=> {
            res.status(400).json({msg:"Algo salió mal", error});
        });
});


//ruta para leer todas las tiendas por usuario
router.get('/user/', verifyToken, (req, res, next) => {
    const {_id} = req.user
    Store.find({_owner: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"store",
            populate:{
                path:"_user",
                select: "name",
            },
        })
        .then((stores)=>{
            res.status(200).json({result:stores})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer una tienda por ID
router.get('/:id', verifyToken, (req, res, next) => {
    const {id} = req.params
    Store.findById(id)
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"_owner",
            populate:{
                path:"user",
                select: "name",
            },
        })
        .then((stores)=>{
            res.status(200).json({result:stores})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer todas las tiendas
router.get('/', (req, res, next) => {
    Store.find()
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"_owner",
            populate:{
                path:"user",
                select: "name",
            },
        })
        .then((stores)=>{
            res.status(200).json({result:stores})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para update/editar una tienda
router.patch('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user;
    Store.findById(id)
        .then((store)=>{
            const storeOwner = JSON.stringify(store._owner)
            const idString = JSON.stringify(_id)
            console.log(storeOwner)
            console.log(idString)
            if( storeOwner === idString){
                Store.findByIdAndUpdate(id, req.body, {new:true})
                .then((store)=>{
                    res.status(200).json({result:store})
                })
            } else {
                res.status(403).json({msg:"no tienes permisos para editar esta tienda"})
            }
        })
        .catch((error)=>{
           res.status(400).json({msg:"Algo salió mal", error}) 
        })
})

//ruta para borrar tienda
router.delete('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user;
    Store.findById(id)
        .then((store)=>{
            const storeOwner = JSON.stringify(store._owner)
            const idString = JSON.stringify(_id)
            console.log(storeOwner)
            console.log(idString)
            if( storeOwner === idString){
                Store.findByIdAndDelete(id)
                .then((store)=>{
                    res.status(200).json({result:store})
                })
            } else {
                res.status(403).json({msg:"no tienes permisos para borrar esta tienda"})
            }
        })
        .catch((error)=>{
           res.status(400).json({msg:"Algo salió mal", error}) 
        })
})

module.exports = router;