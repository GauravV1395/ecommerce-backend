const { User } = require('../models/user');

// middleware created to validate the user.

const authenticateUser = function(req, res, next) {
    let token = req.header('x-auth'); //request header that contains the user id token.
    User.findByToken(token).then((user) => {
        //console.log(user);
        req.locals = {
            user,   // information that is to be sent across to the contollers file. req.locals is the property that allows variables to be passed on from one middleware to another middleware or from a middleware to other files too.
            token  // information that is to be sent across to the contollers file.
        }
        next();
    }).catch((err) => {
        res.status(401).send(err);
    });
}

const authorizeUser = function(req, res, next){  // to check if the logged in person is an admin or a user.
    if(req.locals.user.role == 'admin') {
        next();
    } else {
        res.status(403).send('you are not authorized to access this page.');
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}

