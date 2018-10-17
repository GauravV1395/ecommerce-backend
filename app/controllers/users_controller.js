const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { authenticateUser } = require('../middlewares/authentication');
const _ = require('lodash');
const { CartItem } = require('../models/cart_item');
const { validateID } = require('../middlewares/utilities');

router.post('/', (req, res) => {
    let body = _.pick(req.body, ['username', 'password', 'email']);
    let user = new User(body);
    user.save().then((user) => {
        return user.generateToken();
    }).then((token) => {
        res.header('x-auth', token).send(user.shortInfo()); //whatever the response we are sending that is the token will be in the header of the file.
    }).catch((err) => {
        res.send(err);
    })
});

//testing url//will later be done in the orders controller.//authenticating the user.

router.get('/orders', authenticateUser, (req, res) => {
    //console.log(req.header('x-auth'));
    res.send('listing all the orders of the user.');
});

// Logout user

router.delete('/logout', authenticateUser, (req, res) => {
    let user = req.locals.user; // user info from the locals object in the authentication middleware.
    let token = req.locals.token; // token info from the locals object in the token middleware. that is the token given by the client while trying to log out.
    let activeToken = user.tokens.find(function (inDbToken) { // to find the token that has been sent by the client while logging out of the system.
        return inDbToken.token == token; // checks if the token given and the token in the DB is equal.
    });
    user.tokens.id(activeToken._id).remove(); //to remove the token in the db.
    user.save().then((user) => {
        res.send(); //to send a message to the client saying he has successfully logged out.
    }).catch((err) => {
        res.send(err);
    })
});

//nested routes to add, put, delelete and items in our cart.

// get items in the cart.
// GET users/cart_items

router.get('/cart_items', authenticateUser, (req, res) => {
    res.send(req.locals.user.cartItems);
});

// add items to the cart.
// POST users/cart_items

router.post('/cart_items', authenticateUser, (req, res) => {
    let user = req.locals.user;
    let body = _.pick(req.body, ['product', 'quantity']);
    let cartItem = new CartItem(body);
    //when we are trying to match the ids of any two products we should use the equals method.
    let inCart = user.cartItems.find(function (item) {
        return item.product.equals(cartItem.product);
    });
    if (inCart) {
        inCart.quantity = inCart.quantity + cartItem.quantity;
    } else {
        user.cartItems.push(cartItem);
    }
    user.save().then((user) => {
        res.send({
            cartItem,
            notice: "successfully added to the cart."
        });
    }).catch((err) => {
        res.send(err);
    })
});

//update items in the cart.
// PUT users/cart_items/cart_item_id

router.put('/cart_items/:id', validateID, authenticateUser, (req, res) => {
    let cartItemId = req.params.id;
    let user = req.locals.user;
    let body = _.pick(req.body, ['quantity']);
    let inCart = user.cartItems.id(cartItemId); // mongoose method to check if the product referred by the user is present in the cart by using its id.
    inCart.quantity = body.quantity;

    user.save().then((user) => {
        res.send({
            inCart,
            notice: "successfully updated the product."
        });
    }).catch((err) => {
        res.send(err);
    });
});


//delete an item in the cart.
//DELETE users/cart_items/cart_item_id

router.delete('/cart_items/:id', validateID, authenticateUser, (req, res) => {
    let cartItemId = req.params.id;
    let user = req.locals.user;
    user.cartItems.id(cartItemId).remove(); // mongoose method to check if the product is available in the cart and remove by using its id.
    user.save().then((user) => {
        res.send({
            notice: "successfully removed the product from the cart."
        });
    }).catch((err) => {
        re.send(err);
    })
});

//empty the cart.
//DELETE users/cart_items/empty

//return all the user wishlists

router.get('/wishlist_items', authenticateUser, (req, res) => {
    res.send(req.locals.user.wishlist);
});

// to post items in into the wishlist

router.post('/wishlist_items', authenticateUser, (req, res) => {
    let user = req.locals.user;
    let body = _.pick(req.body, ['product', 'created_at', 'isPublic']);
    let inWish = user.wishlist.find(function (item) {
        return body.product == item.product;
    })
    if (inWish) {
        res.send('item has already been added to the wishlist.');
    } else {
        user.wishlist.push(body);
    }
    user.save().then((user) => {
        res.send({
            wishlist: user.wishlist
        });
    }).catch((err) => {
        res.send(err);
    });
});

//to delete the wishlist

router.delete('/wishlist_items/:id', authenticateUser, (req, res) => {
    let user = req.locals.user;
    let productId = req.params.id;
    user.wishlist.id(productId).remove();
    user.save().then((user) => {
        res.send({
            notice: 'successfully removed the product from the wishlist.'
        })
    }).catch((err) => {
        res.send(err);
    })
});

// to view the wishlist of other selected users.

router.get('/:id/wishlist_items', (req, res) => {
    let userId = req.params.id;
        User.findOne({ _id: userId, 'wishlist.isPublic' : true}).then((user) => {
            res.send({
                wishlist: user.wishlist
            });
        }).catch((err) => {
            res.send(err);
        });
});

module.exports = {
    usersController: router
}