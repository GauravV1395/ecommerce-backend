let name = "Gaurav";

// let dataFromAnotherFile = require('./place); // practises to stay away from.
// console.log(require('./place'));
// let city = require('./place').city;
//let skills = require(./place).skills;

//Using the js es6 methods

let {city, skills, details} = require('./place');
console.log(city);

console.log(name + " " + 'lives in' + " " + city);
//console.log(details); // says details is a function.
console.log(details(name,skills)); // 
