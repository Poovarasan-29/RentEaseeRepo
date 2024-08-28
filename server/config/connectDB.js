const mongoose = require('mongoose');

const connectDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
        .then(con => {
            console.log("MogoDB connected", con.connection.host);
        }).catch(err => {
            console.log("Yes Error occured", err);
        })
}


module.exports = connectDatabase