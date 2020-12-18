const express = require("express");
const router = express.Router();
//Modelo
const Product = require("../models/Productos");

// GET de todos los productos
router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ result: products });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// GET de un solo producto
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id);
});

// CREATE un producto
router.post("/", (req, res) => {
  Product.create(req.body);
});

// UPDATE de un producto
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true });
});

// DELETE de un producto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id);
});