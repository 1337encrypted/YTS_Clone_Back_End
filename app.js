// Setup (Scripts)
require("./src/scripts/mongodb.script");

// Imports
const { expressApp, httpApp } = require("./src/utils/express.util");

// Yts Routes
expressApp.use(require("./src/routes/yts.route"));
