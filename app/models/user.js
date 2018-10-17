const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {cartItemSchema} = require('../models/cart_item');

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 64,
        unique: true, // will not allow to store two similiar usernames.
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        // validate property is used to setup our own validations.
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function () {
                return 'invalid email format';
            }
        }
    },

    password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        required: true
    },

    tokens: [{ //tokens field is created to generate the token. the type of the token should be a string and it shoub be an object.
        token: {
            type: String
        }
    }],

    role : {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
    },

    cartItems : [cartItemSchema],

    wishlist : [{
        product : { type : Schema.Types.ObjectId, ref: 'product', required: true },
        created_at : { type: Date, default: Date.now },
        isPublic : { type: Boolean, default: true }

    }]
    
});



userSchema.pre('save', function (next) { // to perform an operation to encrypt the password before saving the data on to the database. //pre hook //this is a model middleware.
    let user = this;
    bcrypt.genSalt(10).then((salt) => { //gensalt is a method provided by bcrypt that will generate salt and shuffle the string 10 times..
        bcrypt.hash(user.password, salt).then((hashed) => { // takes two parameters that is the user name and the salt and then hashes the password.
            user.password = hashed;
            next(); // will call the next function.
        });
    });
})

 userSchema.methods.shortInfo = function () { //instance method named shortInfo which returns the object that is being created. This function is written to return only the id and username and the email of the user.
    return {
        _id: this._id,
        username: this.username,
        email: this.email
    };
};

userSchema.methods.generateToken = function (next) { //instance method to generate a token.
    let user = this;
    let tokenData = {
        _id: user.id
    };

    let token = jwt.sign(tokenData, 'supersecret');
    user.tokens.push({
        token
    });

    return user.save().then(() => {

        return token;
    });
}

userSchema.statics.findByToken = function (token) { // static method created to define the function findByToken
    let User = this;
    let tokenData;
    try {
        tokenData = jwt.verify(token, 'supersecret');
    } catch (e) {
        return Promise.reject(e);
    }

    return User.findOne({
        '_id': tokenData._id,
        'tokens.token': token
    }).then((user) => {
        if (user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject(user);
        }
    })
};

const User = mongoose.model('User', userSchema);


module.exports = {
    User
}