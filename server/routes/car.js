const express = require('express');
const { getCars, getSingleCarFullDetails, getRelatedCars, newCar } = require('../controllers/carPost');
const { addNewCar } = require('../controllers/newCarPosting');
const router = express.Router();


router.route('/rent-cars').get(getCars)
router.route('/car-details/:id').get(getSingleCarFullDetails)
router.route('/add-new-car').post(addNewCar);
router.route('/new-car').post(newCar);
router.route('/related-cars').get(getRelatedCars)


module.exports = router;