let city = "Bangalore";
let skills = ['js', 'rb', 'py'];
const details = function(name, skills) {
return name + " " + 'knows' + " " + skills; 
}

module.exports = {
    city, // string
    skills, // array
    details //function
}
// module.exports is an object that can hold any variable.. it can hold a string, array, object, or a function.
