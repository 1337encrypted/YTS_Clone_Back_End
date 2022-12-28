// Imports
const fetch = require("node-fetch").default;
const errors = require("../configs/error.codes.config.json");
const Response = require("../models/standard.response.model");

// Body
async function ytsApiGetController(req, res, next) {
    try {
        if (!req.ytsUrl) return res.status(500).send(Response(errors.ERR_INTE));

        const url = req.ytsUrl;
        const response = await fetch(url);

        if (response.status !== 200)
            return res.status(500).send(Response(errors.ERR_APIF));

        if (!res.body) res.body = {};
        res.body.apiResponse = await response.json();

        return next();
    } catch (error) {
        console.error("[yts.controller]", error);
        return res.status(500).send(Response(String(error)));
    }
}

module.exports = {
    ytsApiGetController,
};
