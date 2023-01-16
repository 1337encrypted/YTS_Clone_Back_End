// Imports
const mongoose = require("mongoose");

// Constants
const { MONGODB_CONN_STR } = process.env;

// Body

// Suppress deprecation warnings
mongoose.set("strictQuery", true);

mongoose
    .connect(MONGODB_CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("[mongodb.script.js] MongoDB connection successful"))
    .catch(error => {
        console.error(error);
    });

module.exports = mongoose;
