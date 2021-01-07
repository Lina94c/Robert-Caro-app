const {Schema, model} = require('mongoose');

const orderSchema = new Schema(
{
    _user:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
    _address:{
        type: Schema.Types.ObjectId,
        ref:"address",
        required: true,
    },
    products:{
        _product: {
            type: Schema.Types.ObjectId,
            ref:"product",
        }
    },
    order_total:{
        type: Number,
        required: true
    },
    },  
{timestamps:true}

    );
    module.exports = model("Address",orderSchema)