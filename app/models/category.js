//const { mongoose } = require('../../config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true // server side validation
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category
}

// let category = new Category({ name: 'electronics'});
// category.save().then((category) => {
//     console.log(category);
// }).catch((err)=>{
//     console.log(err);
// });


// Category.find().then((categories) => {
//     console.log(categories);
// }).catch((err)=>{
//     console.log(err);
// });

//find category by id
// Category.findById('5ba153216cd4ae2c94a0ca80').then((category) => {
//     console.log(category);
// }).catch((err) => {
//     console.log(err);
// })

//find category by name
// Category.find({name : 'furniture'}).then((categories) => {
//     console.log(categories);
// }).then((err) => {
//     console.log(err);
// })


//find one category by name
//can also do truthy using if else conditions.
// Category.findOne({ name : 'fashion'}).then((categories) => {
//     console.log(categories);
// }).then((err) => {
//     console.log(err);
// })

// update a category's name.
// 2 step process, first find and then update.

// Category.findOneAndUpdate({ _id: '5ba153216cd4ae2c94a0ca80'}, { $set: { name: 'electronics and items'}}, {new : true})
// .then((category) => {
//     console.log(category);
// }).catch((err)=> {
//     console.log(err);
// })

//list the total number of records in categories and display them as a list.
// Category.find().then((categories) => {
//     //console.log(categories);
//     console.log(`Listing Categories = ${categories.length}`);
//     for(var i = 0; i < categories.length; i++){
//         console.log(i+1 + '.' + categories[i].name);
//     }
// }).catch((err)=>{
//     console.log(err);
// });

//find the first element of the categories collection and update the name to 'gardening'.

// Category.find().then((categories) => {
//     //console.log(categories[0].id);
//     Category.findOneAndUpdate({ _id: categories[0].id }, { $set: { name: 'gardening' } }, { new: true })
//         .then((category) => {
//             console.log(category);
//         }).catch((err) => {
//             console.log(err);
//         })
// }).catch((err) => {
//     console.log(err);
// });

// Delete a record.

// Category.findOneAndDelete({ _id: '5ba23c582451044210560d5b'})
// .then((category) => {
//     console.log(category);
// }).catch((err) =>{
//     console.log(err);
// })
