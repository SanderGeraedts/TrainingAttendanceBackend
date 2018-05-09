const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: String,
    regular: Boolean
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;