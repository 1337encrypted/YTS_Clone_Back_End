// Setup
require("dotenv").config();

// Imports
const express = require("express");
const http = require("http");
const cors = require("cors");

// Constants
const expressApp = express();
const httpApp = http.createServer(expressApp);
const { PORT } = process.env;

// Body
expressApp.use(express.json());
expressApp.use(cors());

httpApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));

module.exports = {
    expressApp,
    httpApp,
};
