const mongoose = require('mongoose');

const carPostModel = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    manufacturedYear: {
        type: String,
        required: true
    }, 
    fuelType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    KMdriven: {
        type: String,
        required: true
    },
    noOfOwners: {
        type: String,
        required: true
    },
    ac: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    carLocation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    depositAmountDay: {
        type: String,
        required: true
    },
    rentAmountDay: {
        type: String,
        required: true
    },
    depositAmountMonth: {
        type: String,
        required: true
    },
    rentAmountMonth: {
        type: String,
        required: true
    },
    insuranceDocument: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    carPhotos: {
        type: Array,
        required: true
    },
    vechileNo: {
        type: String,
        required: true
    },
    milage: {
        type: String,
        required: true
    },
    fuelCapacity: {
        type: String
    },
    state: {
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
    createdAt: Date
});

const carpost = mongoose.model('carpost', carPostModel)
module.exports = carpost