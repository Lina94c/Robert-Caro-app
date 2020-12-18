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
    address:{
        type:String,
        required:[true,"Ingresa una dirección"]
    },
    deparment:{
        type:String,
        required:[true,"Ingresa a que se dedica tu empresa"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);