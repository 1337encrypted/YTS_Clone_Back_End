// Imports
const { v4: uuidv4 } = require("uuid");
const errors = require("../configs/error.codes.config.json");
const Response = require("../models/standard.response.model");
const User = require("../models/user.model");
const RefreshToken = require("../models/refreshtoken.model");
const utils = require("../utils/utils");

// Body
async function userLoginController(req, res, next) {
    try {
        if (!req.loginVars) return res.status(500).send(Response(errors.ERR_INTE));

        const { email, password } = req.loginVars;

        // Check if user exists
        const user = await User.findByEmail(email);
        if (!user) return res.status(404).send(Response(errors.ERR_UNF));

        // Check if the password matches
        const { pass: hash } = user;
        if (!(await utils.bcryptCompare(hash, password))) return res.status(403).send(Response(errors.ERR_PMM));

        // Generate refresh and access token
        const rt = new RefreshToken({
            identifier: uuidv4(),
            // eslint-disable-next-line no-underscore-dangle
            user: user._id,
        });
        await rt.save();

        const at = await utils.jwtSign({
            identifier: rt.identifier,
            // eslint-disable-next-line no-underscore-dangle
            user: user._id,
        });

        if (!res.body) res.body = {};
        res.body.access_token = at;

        return next();
    } catch (error) {
        console.error("[user.controller]", error);
        return res.status(500).send(Response(errors.ERR_INTE));
    }
}

async function userRegisterController(req, res, next) {
    try {
        if (!req.registerVars) return res.status(500).send(Response(errors.ERR_INTE));

        const { email, password, name = null } = req.registerVars;

        // Check if email is available
        if (!(await User.isEmailAvailable(email))) return res.status(403).send(Response(errors.ERR_EUSE));

        // Create
        const user = await User.create({
            username: Date.now().toString(),
            email,
            pass: await utils.bcryptHash(password),
            name,
        });

        if (!res.body) res.body = {};
        // eslint-disable-next-line no-underscore-dangle
        res.body.profile = await User.findById(user._id, "-pass").exec();

        return next();
    } catch (error) {
        console.error("[user.controller]", error);
        return res.status(500).send(Response(errors.ERR_INTE));
    }
}

async function userLogoutController(req, res, next) {
    try {
        await RefreshToken.remove({ identifier: req.rt.identifier });

        return next();
    } catch (error) {
        console.error("[user.controller]", error);
        return res.status(500).send(Response(errors.ERR_INTE));
    }
}

module.exports = {
    userLoginController,
    userRegisterController,
    userLogoutController,
};
