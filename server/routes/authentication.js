const express = require('express');
const { newUserRegistration, loginUser } = require('../controllers/authenticationController');
const router = express.Router();



router.route('/register').post(newUserRegistration);
router.route('/login').post(loginUser);



module.exports = router;