import Mongoose from 'mongoose';

const personSchema = Mongoose.Schema({
    name: String,
    regular: Boolean
});

export const Person = Mongoose.model('Person', personSchema);