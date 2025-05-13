const bcrypt = require("bcryptjs");
const NewUserRegistrationModel = require("../models/newUserRegistration");

exports.newUserRegistration = async (req, res) => {
  try {
    const saltRounds = 10;
    const values = req.body;

    const isUserExists = await NewUserRegistrationModel.find({
      $or: [{ phoneNumber: values.phoneNumber }, { email: values.email }],
    });

    if (isUserExists.length !== 0) {
      if (isUserExists[0].phoneNumber == values.phoneNumber)
        return res.json({
          success: false,
          message: "Mobile Number Already Exists",
        });
      return res.json({
        success: false,
        message: "Email Already Exists",
      });
    } else {
      const existsUserIDs = await NewUserRegistrationModel.find(
        {},
        { userID: 1, _id: 0 }
      );
      const userIDs = existsUserIDs.map((user) => user.userID);

      let randomNumber = Math.floor(Math.random() * 999999) + 1;
      while (userIDs.includes(randomNumber))
        randomNumber = Math.floor(Math.random() * 999999) + 1;

      values.userID = randomNumber;

      // bcrypt the Password - HASH PASSWORD
      async function hashPassword(password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      }

      hashPassword(values.password).then(async (hashed) => {
        values.password = hashed;
        await NewUserRegistrationModel.create(values)
          .then((response) => {
            res
              .status(201)
              .json({ success: true, message: response, userID: randomNumber });
          })
          .catch((err) => {
            res.status(500).json({ success: false, message: err });
          });
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.loginUser = async (req, res) => {
  async function comparePassword(enteredPassword, storedHashedPassword) {
    const match = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return match;
  }

  try {
    const { emailOrPhone, password } = req.body;
    let user;
    // const userSignUpPassword = user.password;
    if (!Number(emailOrPhone)) {
      user = await NewUserRegistrationModel.findOne({ email: emailOrPhone });
    } else {
      user = await NewUserRegistrationModel.findOne({
        phoneNumber: emailOrPhone,
      });
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const verified = await comparePassword(password, user.password);

    if (verified) {
      return res.json({
        success: true,
        message: "Successfully Login",
        userID: user.userID,
      });
    } else {
      return res.json({
        success: false,
        message: "You entered wrong password ",
      });
    }

    // if (Number(password) === Number(user.password)) {
    //   res.json({
    //     success: true,
    //     message: "Successfully Login",
    //     userID: user.userID,
    //   });
    // } else {
    //   res.json({ success: false, message: "You entered wrong password " });
    // }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error Retry" });
  }
};
