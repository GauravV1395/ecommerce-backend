const express = require('express');
const app = express();
const { mongoose } = require('./config/db');
const { routes } = require('./config/routes');
const port = 3000;

app.use(express.json()); // to ensure that my json data is being read.  
//middlewares
app.use('/', routes);

//Route Handlers

// app.get('/',(req,res) => {
//     res.send('welcome to our site.');
// }); 

// //app.METHOD(PATH, HANDLER)

// app.get('/account/orders', (req,res) => {
//     //fetch users orders
//     res.send('here is the list of your order');
// });

//localhost: 3000/categories

// app.get ('/categories', (req,res) => {
//     Category.find().then ((categories) => {
//         res.send(categories);
//     }).catch((err) => {
//         res.send(err);
//     });
// });

app.listen(port, () => {
    console.log('listening to port', port);
});



