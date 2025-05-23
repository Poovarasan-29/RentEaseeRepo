const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDatabase = require("./config/connectDB");
const carRouter = require("./routes/car");
const driverRouter = require("./routes/driver");
const authenticationRouter = require("./routes/authentication");
const userProfileRouter = require("./routes/userProfile");

dotenv.config({ path: path.join(__dirname, ".env") });
const port = process.env.PORT || 5000;

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(carRouter);
app.use(driverRouter);
app.use(authenticationRouter);
app.use(userProfileRouter);

app.get("/", (req, res) => {
  console.log("Server Running ");
});

app.listen(port, () => {
  console.log("Running at Port : ", port);
});
