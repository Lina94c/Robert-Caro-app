const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name:{
        type:String,
        required: [true, "Debes agregar tu nombre"]
    },
    email: {
      type: String,
      required: [true, "Debes agregar un correo"],
    },
    password:{
        type:String,
        required:[true,"Ingresa una dirección"]
    },
    address:{
        type:String,
        required:[true,"Ingresa una dirección"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);