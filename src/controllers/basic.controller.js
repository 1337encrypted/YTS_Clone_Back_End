// Imports
const Response = require("../models/standard.response.model");

// Body
async function completeRequest(req, res) {
    return res.status(200).send(Response(false, res.body));
}

module.exports = {
    completeRequest,
};
