const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true); // to remove the deprecation error that was being thrown.

mongoose.connect
('mongodb://localhost:27017/mern-july-ecommerce', { useNewUrlParser: true}).then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
});

module.exports = {
    mongoose
}
