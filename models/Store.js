const mongoose = require("mongoose")
const {Schema, model} = require('mongoose');

const storeSchema = new Schema(
{
    _owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: [true, "La tienda debe tener un dueño"],
        validate:{
            message:"El email ya tiene una tienda asociada",
            validator: async ( _owner) => {
                const items = await mongoose.models["Store"].count({_owner})
                return items < 1
            },
        },
    },
    store_name:{
        type: String,
        required:[true,"Debes agregar el nombre de la tienda"]
    },
    store_picture:{
        type: String,
        default:"https://cdn.icon-icons.com/icons2/1706/PNG/512/3986701-online-shop-store-store-icon_112278.png"
    },
   
    street: {
        type: String,
        required:[true, "Debes de incluir la dirección de la ubicación donde se recolectarán los productos"]
    },
    ext_number: {
        type: String,
        default: null,
    },
    int_number: {
        type: String,
        default: null,
    },
    neighborhood: {
        type: String,
        required: [true, "Debes de incluir la colonia o asentamiento"]
    },
    municipality: {
        type: String,
        required:[true, "Tu dirección debe de incluir ciudad o municipio"]
    },
    state: {
        type: String,
        required:[true, "Debes de incluir el estado en tu dirección"],
    },
    country: {
        type: String,
        required: [true, "Debes incluir el país"],
        default: "Mexico"
    },
    zipcode: {
        type: String,
        length: [5, "Debes de incluir el código postal"],
    },
    clabe: {
        type: Number,
        length: [18, "La cuenta CLABE a donde te depositaremos tus ventas debe de contener 18 dìgitos"],
        default: null
    },
    bank: { /**Creo que tenemos que "pre-poblar" una lista de bancos elegibles */
        type: String,
        default: null,
    },
    account_holder_name:{
        type:String,
        default: null
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
    email: {
        type:String,
        required:[true,"Debes agregar un email"],
    },
        
},
{timestamps:true}

    );
    module.exports = model("Store",storeSchema)