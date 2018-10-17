const bcrypt = require('bcryptjs');

// registration process

let email = 'gaurav.v1395@gmail.com';
let password = 'secret123';

bcrypt.genSalt(10).then((salt) => {
    console.log(salt);
    bcrypt.hash(password, salt).then((hashedPassword) => {
        console.log(hashedPassword);
        // in db storing the password in encrypted format.
    });
}).catch((err) => {
    console.log(err);
});
