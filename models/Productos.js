const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name:{
        type:String,
        required: [true, "Debes agregar tu nombre"]
    },
    description: {
      type: String,
      required: [true, "Debes agregar un correo"],
    },
    price:{
        type:String,
        required:[true,"Ingresa un precio"]
    },
    image:{
        type:String,
        required:[true,"Debes ingresar una foto"]
    },
    _store:{
        type: Schema.Types.ObjectId,
        ref:"Tienda",
        required:true
    },
    //imagen 
    // Discount
    // Tienda origen --> este es un id
    // Número de piezas disponibles
  },
  { timestamps: true }
);

module.exports = mongoose.model("Productos", productSchema);