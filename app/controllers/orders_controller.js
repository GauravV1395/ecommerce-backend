const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const { authenticateUser } = require('../middlewares/authentication');

// /ordrs = he gets to see all his orders.

router.get('/', authenticateUser, (req, res) => {
    let user = req.locals.user; // logged in user
    Order.find({user : user._id}).then((orders) => { // in the Order schema looks for the user with the user id and then returns that user's order.
        res.send(orders);
    }).catch((err) => {
        res.send(err);
    });
});

// create order

router.post('/', authenticateUser, (req,res) => {
    let user = req.locals.user; // logged in user
    let order = new Order();
    order.user = user._id; // the order id is set as the logged in user's id so that when the user is logged in the order id is set to the logged in user's id to view his orders.
    order.save().then((order) =>{
        res.send(order);
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = {
    orderController : router
}
