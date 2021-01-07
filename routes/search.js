const express = require('express');
const router = express.Router();
// importo cosas importantes
const Product = require('../models/Product');
const Store = require('../models/Store');


// ruta para buscar un producto por regex
router.get('/products/:exp', (req, res, next) =>{
    const {exp: searchTerm} = req.params
    Product.find({$or: [{title: {$regex: new RegExp(searchTerm, "i")}}, {description: {$regex: new RegExp(searchTerm, "i")}}]})
        .then((results)=>{
            res.status(210).json({result:results})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

// ruta para buscar un producto por regex
router.get('/stores/:exp', (req, res, next) =>{
    const {exp: searchTerm} = req.params
    Store.find({store_name: {$regex: new RegExp(searchTerm, "i")}})
        .then((results)=>{
            res.status(210).json({result:results})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})


module.exports = router;