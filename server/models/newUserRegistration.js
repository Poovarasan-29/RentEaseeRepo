const mongoose = require('mongoose');


const newUserRegistrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        required: true
    }
})

const NewUserRegistrationModel = mongoose.model('user', newUserRegistrationSchema);
module.exports = NewUserRegistrationModel;