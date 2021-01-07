const {Schema, model} = require('mongoose');

const addressSchema = new Schema(
{
    _user:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required: [true, "La tienda debe tener un dueño"],
    },
        street: {
            type: String,
            required:[true, "Debes de incluir la la calle en tu dirección"]
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
            length: [5, "Debes de incluir el código postal de 5 digitos"],
        }
    },  
{timestamps:true}

    );
    module.exports = model("Address",addressSchema)