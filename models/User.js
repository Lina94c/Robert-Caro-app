const mongoose = require("mongoose")
//Schema = Schema
const {Schema} = mongoose;

const userSchema = new Schema(
{
    name:{
        type: String,
        required:[true,"Debes agregar un nombre"]
    },
    lastname:{
        type: String,
        required:[true,"Debes agregar un apellido"]
    },
    phone:{
        type:Number,
        required:[true, "Debes incluir un nùmero telefónico de contacto"],
        maxlength:[10, "El número debe de incluir 10 digitos"]
    },
    mobile:{
        type:Number,
        default: null,
        maxlength:[10, "El número debe de incluir 10 digitos"]
    },
    
    role:{
        type:String,
        default:"USER",
        enum:["ADMIN","USER","STORE"],
    },
    email:{ /**Revisar si en efecto queremos que para tiendas exista sola una tienda asociada al correo electrónico o puede haber más tiendas */
        type:String,
        required:[true,"Debes agregar un email"],
        validate:{
            message:"El email ya tiene una tienda asociada",
            validator: async ( email ) => {
                const items = await mongoose.models["User"].count({email})
                return items < 1
            },
        },
    },
    password:{
        type:String,
        required:[true,"Debes agregar un password"],
    }
},
{timestamps:true}

);

module.exports = mongoose.model("User",userSchema)