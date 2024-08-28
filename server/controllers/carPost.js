const carpost = require("../models/carPostModel");
const mongoose = require('mongoose');


exports.getCars = async (req, res) => {
    try {
        const { brand, model, manufacturedYear, state } = req.query;
        let query = {};

        if (brand) query.brand = brand;
        if (model) query.model = model;
        if (manufacturedYear) query.manufacturedYear = manufacturedYear;
        if (state) query.state = state;


        const cars = await carpost.find(query);

        res.status(200).json(cars)
    } catch (error) {
        res.status(404).send("Not Found")
    }
}

// --- GET A SINGLE CAR FULL DETAILS USING ID
exports.getSingleCarFullDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const carDetails = await carpost.findById(id);

        res.status(200).json(carDetails);
    } catch (error) {
        res.status(404).send("Not Found")
    }
}

exports.getRelatedCars = async (req, res) => {
    try {
        const { brand, model, fuelType } = req.query;
        let carDetails;

        const searchCriteria = [
            { brand, model, fuelType },
            { brand, model },
            { $or: [{ brand }, { model }] }
        ]

        for (const criteria of searchCriteria) {
            carDetails = await carpost.find(criteria);
            if (carDetails.length >= 6)
                break;
        }
        res.status(200).json(carDetails)
    } catch (error) {
        res.status(404).send("Not Found")
    }

}

exports.newCar = async (req, res) => {
    const { imageUrls, inputs } = req.body;
    const values = inputs;
    values.insuranceDocument = imageUrls.insuranceDocument;
    values.carPhotos = imageUrls.carPhotos;
    values.createdAt = new Date();
    
    try {
        const newCar = new carpost(values);
        await newCar.save();
        res.status(200).send('Image paths saved to MongoDB');
    } catch (error) {
        res.status(500).send('Failed to save image paths');
    }
}
