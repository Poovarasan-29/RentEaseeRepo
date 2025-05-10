const multer = require("multer");
const driverdetails = require("../models/driverRoleApplyModel");

let imgPaths = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "aadherCardDoc":
        cb(null, "../frontend/public/Images/Driver-Aadhar-Documents");
        break;
      case "licenceCardDoc":
        cb(null, "../frontend/public/Images/Driver-Licence-Documents");
        break;
      case "expiranceDoc":
        cb(null, "../frontend/public/Images/Driver-Experiance-Documents");
        break;
      case "driverPhoto":
        cb(null, "../frontend/public/Images/Driver-Profile-Documents");
        break;
      default:
        break;
    }
  },
  filename: (req, file, cb) => {
    switch (file.fieldname) {
      case "aadherCardDoc":
        path = {
          [file.fieldname]:
            "/Images/Driver-Aadhar-Documents/" + Date.now() + file.originalname,
        };
        break;
      case "licenceCardDoc":
        path = {
          [file.fieldname]:
            "/Images/Driver-Licence-Documents/" +
            Date.now() +
            file.originalname,
        };
        break;
      case "expiranceDoc":
        path = {
          [file.fieldname]:
            "/Images/Driver-Experiance-Documents/" +
            Date.now() +
            file.originalname,
        };
        break;
      case "driverPhoto":
        path = {
          [file.fieldname]:
            "/Images/Driver-Profile-Documents/" +
            Date.now() +
            file.originalname,
        };
        break;
      default:
        break;
    }
    imgPaths.push(path);
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1000 * 1000,
  },
});
const uploadHandler = upload.fields([
  { name: "aadherCardDoc", maxCount: 1 },
  { name: "licenceCardDoc", maxCount: 1 },
  { name: "expiranceDoc", maxCount: 1 },
  { name: "driverPhoto", maxCount: 1 },
]);

exports.getNewDriverDetails = (req, res) => {
  uploadHandler(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code == "LIMIT_FILE_SIZE") {
        res.status(400).json({ message: "Maximum size 2MB" });
      }
      return;
    } else {
      const values = req.body;
      values.createdAt = new Date();
      for (let i of imgPaths) {
        const key = Object.keys(i);
        values[key] = i[key];
      }
      const driverRegisteredIDs = await driverdetails.find(
        {},
        { driverID: 1, _id: 0 }
      );
      let randomID = Math.floor(Math.random() * 99999999) + 1;
      const driverIDs = driverRegisteredIDs.map((id) => id.driverID);
      while (driverIDs.includes(randomID)) {
        randomID = Math.floor(Math.random() * 99999999) + 1;
      }
      values.driverID = randomID;
      const newDriverDetails = new driverdetails(values);
      const savedPost = await newDriverDetails.save();
      res.status(201).json({ message: savedPost });
    }
  });
};

// ------------------------------------------------- get-drivers ------------

exports.getDrivers = async (req, res) => {
  const { state, district, city } = req.query;
//   console.log(req.query);

  let query = {};

//   if (state) query.state = state;
  if (district) query.district = district;
  if (city) query.city = city;

  try {
    const Drivers = await driverdetails.find(query);
    res.status(200).json({
      allDrivers: Drivers,
    });
  } catch (error) {
    res.status(404).send("Not Found");
  }
};

// ---------------------------------- driver-details ---------------

exports.getDriverFullDetails = async (req, res) => {
  try {
    const { id } = req.params; // Asume here id = 56788
    const driverDetails = await driverdetails.find({ driverID: id }); // here the value must be a single document object Array
    if (driverDetails.length === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    const relatedDrivers = await driverdetails.find({
      district: driverDetails[0].district,
      driverID: { $ne: id },
    });
    res.status(200).json({ driverDetails, relatedDrivers });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createNewDriver = async (req, res) => {
  const { imageUrls, inputs, selectedDistrict, selectedCity, selectedState } =
    req.body;
  const values = inputs;
  inputs.state = selectedState[0].state; // Re check this line Not sure it will work
  inputs.district = selectedDistrict[0].district;
  inputs.city = selectedCity[0].city;
  inputs.expiranceDoc = imageUrls.expiranceDoc;
  inputs.driverPhoto = imageUrls.driverPhoto;
  inputs.licenceCardDoc = imageUrls.licenceCardDoc;
  inputs.aadherCardDoc = imageUrls.aadherCardDoc;
  try {
    const newDriver = new driverdetails(values);
    await newDriver.save();
    res.status(200).send("Image paths saved to MongoDB");
  } catch (error) {
    res.status(500).send("Failed to save image paths");
  }
};
