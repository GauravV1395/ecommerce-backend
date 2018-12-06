const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId, // used for declaring paths in the schema that should be mongodb objectIDs.
        ref: 'Category'
    },

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64    
    },

    price: {
        type: Number,
        required: true,
        min: 1
    },

    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    codEligible: {
        type: Boolean,
        required: true,
        default: true
    },

    maxUnitPurchase : {
        type: Number,
        required: true,
        min: 1
    },

    lowStockAlert: {
        type: Number,
        required: true,
        min: 0
    }
});

productSchema.statics.findByCategory = function(id){   //static method that has been defined and is being used in the controller. static method called findByCategory has been created that is used in the categories controller.
    let Product = this; //this refers to that particular thing on which the function is called upon.
    return Product.find({category: id}); // returns a promise that will be handled in the controllers file.
}

const Product = mongoose.model('Product',productSchema);

module.exports = {
    Product
}

 