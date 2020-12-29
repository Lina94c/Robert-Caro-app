const express = require('express');
const router = express.Router();
// importo cosas importantes
const Address = require('../models/Address');
const {verifyToken} = require('../utils/auth');


//ruta para crear dirección
router.post('/', verifyToken, (req, res, next) =>{
    const { _id:_user } = req.user
    const address = {...req.body, _user}
    Address.create(address)
        .then((address)=>{
            res.status(201).json({result:address});
        }).catch((error)=> {
            res.status(400).json({msg:"Algo salió mal", error});
        });
});


//ruta para leer todas las direcciones por usuario
router.get('/user', verifyToken, (req, res, next) => {
    const {_id} = req.user
    Address.find({_user: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"address",
            populate:{
                path:"_user",
                select: "name",
            },
        })
        .then((address)=>{
            res.status(200).json({result:address})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer una dirección por ID
router.get('/:id', verifyToken, (req, res, next) => {
    const {id} = req.params
    Address.findById(id)
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"address",
            populate:{
                path:"_user",
                select: "name",
            },
        })
        .then((address)=>{
            res.status(200).json({result:address})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer todas las direcciones
router.get('/', (req, res, next) => {
    Address.find()
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"address",
            populate:{
                path:"_user",
                select: "name",
            },
        })
        .then((addresses)=>{
            res.status(200).json({result:addresses})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para update/editar una dirección
router.patch('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    const {_id} = req.user;
    Address.findById(id)
        .then((address)=>{
            const addressOwner = JSON.stringify(address._user)
            const idString = JSON.stringify(_id)
            if( addressOwner === idString){
                Address.findByIdAndUpdate(id, req.body, {new:true})
                    .then((address)=>{
                        res.status(200).json({result:address})
                    })
            } else {
                res.status(403).json({msg:"No tienes permisos para editar esta dirección"})
            }

        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

//ruta para borrar dirección
router.delete('/:id', verifyToken, (req, res, next) =>{
 const {id} = req.params;
    const {_id} = req.user;
    Address.findById(id)
        .then((address)=>{
            const addressOwner = JSON.stringify(address._user)
            const idString = JSON.stringify(_id)
            if( addressOwner === idString){
                Address.findByIdAndDelete(id)
                    .then((address)=>{
                        res.status(200).json({result:address})
                    })
            } else {
                res.status(403).json({msg:"No tienes permisos para editar esta dirección"})
            }

        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

module.exports = router;