const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Databse Connected");
    } catch (error) {
        console.log("Mongodb Connecting Error ");
        process.exit(1);

    }
}


module.exports = connectDatabase