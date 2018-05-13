import Mongoose from 'mongoose';

const userSchema = Mongoose.Schema({
    email: String,
    password: String
});

export const User = Mongoose.model('User', userSchema);