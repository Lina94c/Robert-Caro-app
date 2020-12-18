const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Productos", userSchema);