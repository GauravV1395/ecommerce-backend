const { ObjectID } = require('mongodb'); // to get the function validateID that checks if the id is valid or not.

const validateID = function (req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.send({
            notice: 'Invalid ID'
        });
    } else {
        next();
    }
}

module.exports = {
    validateID
}