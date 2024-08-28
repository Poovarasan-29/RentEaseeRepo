const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Databse Connected : ", process.env.MONGODB_URL);
    } catch (error) {
        process.exit(1);
    }
}


module.exports = connectDatabase