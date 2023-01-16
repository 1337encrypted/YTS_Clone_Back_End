// Setup
require("dotenv").config();

// Connect to MongoDB
const mongoose = require("./src/utils/mongodb.util");

// Imports
const { expressApp, httpApp } = require("./src/utils/express.util");

// Yts Routes
expressApp.use("/user", require("./src/routes/user.route"));
expressApp.use("/yts", require("./src/routes/yts.route"));
