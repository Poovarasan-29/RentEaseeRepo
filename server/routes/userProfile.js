const express = require('express');
const { getUserProfileInformations } = require('../controllers/userProfileController');
const router = express.Router();


router.route('/user-profile').get(getUserProfileInformations);


module.exports = router;