const mongoose = require('mongoose');

const driverRoleApplySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    aadharNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    licenceNo: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    alternateNumber: {
        type: String,
    },
    experience: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    comfortWith: {
        type: String,
        required: true
    },
    aadherCardDoc: {
        type: String,
        required: true
    },
    licenceCardDoc: {
        type: String,
        required: true
    },
    expiranceDoc: {
        type: String
    },
    driverPhoto: {
        type: String,
        required: true
    },
    driverID: {
        type: Number,
    },
    createdAt: Date

})

const driverdetails = mongoose.model('driverdetail', driverRoleApplySchema);
module.exports = driverdetails;