const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const { validateID } = require('../middlewares/utilities');
const { Product } = require('../models/product');
const { authenticateUser, authorizeUser } = require('../middlewares/authentication'); // authenticate user is to check if the user has logged in or not and authorizeuser is to check if the user is authorized to perform sme of the operations like put pot and delete.

//show all 
router.get('/', (req, res) => {
    Category.find().then((categories) => {
        res.send(categories);
    }).catch((err) => {
        res.send(err);
    });
});

//show one
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Category.findById(id).then((category) => {
        if(category){
            res.send(category);
        }else{
            res.send({
                notice: 'category not found'
            });
        }     
    }).catch((err) => {
        res.send(err);
    });
});

//create
router.post('/', authenticateUser, authorizeUser, (req, res) => { // matches the path sees if the user is logged in and then sees if the customer is an admin or a user and then if he's an admin the function post will get executed or an error will be thrown saying the user is not authoried.
    let body = req.body;
    let category = new Category(body);
    category.save().then((category) => {
        res.send({
            category,
            notice: 'successfully created the product'
        });
    }).catch((err) => {
        res.send(err);
    });
});

//update
router.put('/:id', validateID, authenticateUser, authorizeUser, (req,res) => {
    let id = req.params.id;
    let body = req.body;

    Category.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, runValidators: true }).then((category) => {
        if (category) {
            res.send({
                category,
                notice: 'successfully updated'
            });
        } else {
            res.send({
                notice: 'category not found.'
            });
        }
    }).catch((err) => {
        res.send(err);
    });
});

//delete

router.delete('/:id', validateID, authenticateUser, authorizeUser, (req,res) => {
    let id = req.params.id;
    Category.findOneAndRemove(id).then((category) => {
        if(category){
            res.send({
                category,
                notice: 'successfully removed'
            })
        }else{
            res.send({
                notice: 'category not found'
            });
        }
    }).catch((err) => {
        res.send(err);
    });
});

//show all the products belonging to that particular category defining our own static method.
router.get('/:id/products',validateID,(req,res) => {
    let id = req.params.id;
    // Product.find({ category : id}).then((products) => {
    //     res.send(products);
    // }).catch((err) => {
    //     res.send(err);
    // });
    Product.findByCategory(id).then((products) => { // find by category is the method that has been defined using the static method.
        res.send(products);
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = {
    categoriesController: router
}
