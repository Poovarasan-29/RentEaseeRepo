const bcrypt = require('bcryptjs');
const NewUserRegistrationModel = require("../models/newUserRegistration");


exports.newUserRegistration = async (req, res) => {
    try {
        const saltRounds = 10;
        const values = req.body;

        const isExistPhoneNumber = await NewUserRegistrationModel.find({ phoneNumber: values.phoneNumber });

        if (isExistPhoneNumber.length !== 0) {
            res.json({ success: false, message: "Mobile Number Already Exists" });
        } else {
            const existsUserIDs = await NewUserRegistrationModel.find({}, { userID: 1, _id: 0 });
            const userIDs = existsUserIDs.map(user => user.userID);

            let randomNumber = Math.floor(Math.random() * 999999) + 1
            while (userIDs.includes(randomNumber))
                randomNumber = Math.floor(Math.random() * 999999) + 1

            values.userID = randomNumber;

            // bcrypt the Password - HASHPASSWORD
            async function hashPassword(password) {
                // const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                return hashedPassword;
            }

            hashPassword(values.password).then(async (hashed) => {
                values.password = hashed;
                await NewUserRegistrationModel.create(values)
                    .then(response => {
                        res.status(201).json({ success: true, message: response })
                    }).catch(err => {
                        res.status(500).json({ success: false, message: err })
                    });
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
}

exports.loginUser = async (req, res) => {

    async function comparePassword(enteredPassword, storedHashedPassword) {
        const match = await bcrypt.compare(enteredPassword, storedHashedPassword);
        return match;
    }

    try {
        const { emailOrPhone, password } = req.body;
        let user;
        const userSignUpPassword = user.password;
        if (isNaN(emailOrPhone))
            user = await NewUserRegistrationModel.findOne(({ email: emailOrPhone }));
        else
            user = await NewUserRegistrationModel.findOne(({ phoneNumber: emailOrPhone }));

        if (!user) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const verified = comparePassword(password, userSignUpPassword);

        if (verified) {
            res.json({ success: true, message: "Successfully Login", userID: user.userID });
        } else {
            res.json({ success: false, message: "You entered wrong password " });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error Retry" });
    }
}