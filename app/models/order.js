const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { User } = require('../models/user');
const sh = require('shorthash');

const orderSchema = new Schema({

    orderNumber:{
        type: String,
        required: true,
        unique: true
    },

     orderDate:{
        type: Date,
        required: true,
        default: Date.now
    },

    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    total:{
        type: Number, 
        default: 0,
        required: true
    },

    status:{
        type: String,
        enum: ['confirmed', 'packed', 'out for delivery', 'delivered'],
        default: 'confirmed',
        required: true
    },

    orderItems:[{
        product:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },

        price:{
            type: Number,
            required: true
        },

        quantity:{
            type: Number,
            required: true,
            default: 1
        }
    }]
});

orderSchema.pre('validate', function(next){
    let order = this;
    order.orderNumber = `DCT-${sh.unique(`${order.orderDate} + ${order.user}`)}`;
    next();
});

orderSchema.pre('save', function(next){
    let order = this;
    let total = 0;
    //console.log(cartItem.product.price);
    User.findOne({_id : order.user }).populate
    ('cartItems.product').then((user) => {
        user.cartItems.forEach(function(cartItem){
            order.orderItems.push({
                product : cartItem.product._id,
                price: cartItem.product.price,
                quantity: cartItem.quantity
            });
            total += cartItem.product.price * cartItem.quantity;
        });
        order.total = total;
        next();
    });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order
}