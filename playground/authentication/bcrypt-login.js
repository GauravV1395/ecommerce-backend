const bcrypt = require('bcryptjs');

// value in db

let encryptedPassword = "$2a$10$UpvdJnHHOkSzeQRXz1L7meh6m5EuPvzDMECpL0xbW1Z0SeDYo3Ua2";

// login

let userEmail = 'gaurav.v1395@gmail.com';
let userPassword = 'secret123';

bcrypt.compare(userPassword,encryptedPassword).then((res) => {
    console.log(res);
});
