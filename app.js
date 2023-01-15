// Connect to MongoDB
const mongoose = require("./src/utils/mongodb.util");

// Imports
const { expressApp, httpApp } = require("./src/utils/express.util");

// Yts Routes
expressApp.use("/yts", require("./src/routes/yts.route"));
