// Setup
require("dotenv").config();

// Imports
const express = require("express");
const cors = require("cors");

// Constants
const app = express();
const { PORT } = process.env;

// Body
app.use(express.json());
app.use(cors());

app.listen(PORT, () =>
    console.log("[express.util] Express server running on port", PORT)
);

module.exports = app;
