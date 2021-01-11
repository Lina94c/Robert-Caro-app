const {Schema, model, isValidObjectId} = require('mongoose');

const productSchema = new Schema(
    {
        _owner: { /**Revisar que la referencia esté bien configurada despues de hacer el modelo de seller */
            type:Schema.Types.ObjectId,
            ref:'User',
            required: [true, "El producto debe de estar asociado a un vendedor"],
        },
        title: {
            type:String,
            required:[true, "El producto debe de tener un tìtulo"],
        },
        description: {
            type:String,
            minlength:[50, "El producto debe de tener una descripción"],
        },
        price: {
            type: Number,
            min:[1, "El precio del producto debe de ser mayor a 1"],
            required:[true, "El producto debe de incluir un precio"],
        },
        discount: {
            type: Number,
            default: 0,
        },
        images: [{
            type:String,
            minlength:[1, "El producto debe de contener al menos 1 imagen"],
        }],
        inventory: { /**Revisar con Dylan que el min y required pueda cambiarse despues en caso de que se agote un producto */
            type: Number,
            min:[1, "Requieres tener al menos una unidad en exitensia para ofertar el producto"],
            required:[true, "El producto requere al menos una unidad disponible para venta"],
        }
        /** Evaluar incluir categoría del producto para aplicar en la navegación más adelante */
    },
    {timestamps:true}
);
module.exports = model("Product",productSchema)