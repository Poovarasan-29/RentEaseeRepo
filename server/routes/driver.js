const express = require('express');
const { getNewDriverDetails, getDrivers, getDriverFullDetails, createNewDriver } = require('../controllers/driverController');
const router = express.Router();


router.route('/driver-role-apply').post(getNewDriverDetails);
router.route('/new-driver').post(createNewDriver);
router.route('/get-drivers').get(getDrivers);
router.route('/driver-details/:id').get(getDriverFullDetails);





module.exports = router;