const NewUserRegistrationModel = require("../models/newUserRegistration");

exports.getUserProfileInformations = async (req, res) => {
    const { userid } = req.query;
    try {
        const profileInformation = await NewUserRegistrationModel.find({ userID: userid });
        res.status(200).json(profileInformation);
    } catch (error) {
        res.status(404).send("Cannt'get user Details");
    }
};
