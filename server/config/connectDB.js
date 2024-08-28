const mongoose = require('mongoose');

const connectDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
}


module.exports = connectDatabase