const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { getCars, getSingleCarFullDetails, newCar, getRelatedCars } = require('./controllers/carPost');
const { createNewDriver, getDrivers, getDriverFullDetails } = require('./controllers/driverController');
const { newUserRegistration, loginUser } = require('./controllers/authenticationController');
const { getUserProfileInformations } = require('./controllers/userProfileController');

dotenv.config({ path: path.join(__dirname, '.env') })
const port = process.env.PORT || 5000;

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://spking222005:SayHi_29@rent-easee.vaswv.mongodb.net/?retryWrites=true&w=majority&appName=Rent-Easee")
    } catch (error) {
        console.log("Not connected");
    }
}
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', getDrivers);

app.get('/rent-cars', getCars)
app.get('/car-details/:id', getSingleCarFullDetails)
app.post('/new-car', newCar);
app.get('/related-cars', getRelatedCars);

app.post('/new-driver', createNewDriver);
app.get('/get-drivers', getDrivers);
app.get('/driver-details/:id', getDriverFullDetails);

// app.post('/register', newUserRegistration);
// app.post('/login', loginUser);

app.get('/user-profile', getUserProfileInformations);





app.listen(port, () => {
    console.log("Running at Port : ", port);
});