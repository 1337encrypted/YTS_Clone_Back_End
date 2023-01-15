// Imports
const Response = require("../models/standard.response.model");
const errors = require("../configs/error.codes.config.json");
const UserConfig = require("../configs/usermodel.config.json");
const User = require("../models/user.model");
const RefreshToken = require("../models/refreshtoken.model");
const utils = require("../utils/utils");

// Body
async function userLoginInputValidationMiddleware(req, res, next) {
    try {
        const { body } = req;

        // `email`
        if (!("email" in body)) return res.status(400).send(Response(errors.ERR_NOE));
        if (!RegExp(UserConfig["email.regex"]).test(body.email)) return res.status(400).send(Response(errors.ERR_INVE));
        const { email } = body;

        // `password`
        if (!("password" in body)) return res.status(400).send(Response(errors.ERR_NOP));
        if (!/^.{6,16}$/i.test(body.password)) return res.status(400).send(Response(errors.ERR_INVP));
        const { password } = body;

        req.loginVars = { email, password };

        return next();
    } catch (error) {
        console.error("[user.middleware]", error);
        return res.status(500).send(Response(errors.ERR_INTE));
    }
}

async function userRegisterInputValidationMiddleware(req, res, next) {
    try {
        const { body } = req;

        // `email`
        if (!("email" in body)) return res.status(400).send(Response(errors.ERR_NOE));
        if (!RegExp(UserConfig["email.regex"]).test(body.email)) return res.status(400).send(Response(errors.ERR_INVE));
        const { email } = body;

        // `password`
        if (!("password" in body)) return res.status(400).send(Response(errors.ERR_NOP));
        if (!/^.{6,16}$/i.test(body.password)) return res.status(400).send(Response(errors.ERR_INVP));
        const { password } = body;

        // `name`
        if ("name" in body && !RegExp(UserConfig["name.regex"]).test(body.name)) return res.status(400).send(Response(errors.ERR_INVN));
        const { name = null } = body;

        req.registerVars = { email, password, name };

        return next();
    } catch (error) {
        console.error("[user.middleware]", error);
        return res.status(500).send(Response(errors.ERR_INTE));
    }
}

async function userAuthValidationMiddleware(req, res, next) {
    try {
        const { headers } = req;

        if (!("authorization" in headers)) return res.status(401).send(Response(errors.ERR_UNC));
        let { authorization } = headers;
        // eslint-disable-next-line prefer-destructuring
        authorization = /^Bearer +(.+)/i.exec(authorization)[1];

        let decoded = null;
        try {
            decoded = await utils.jwtDecoded(authorization);
        } catch (error) {
            console.error(error);
            return res.status(400).send(Response(errors.ERR_INVAT));
        }

        const { identifier, user } = decoded;
        const rt = await RefreshToken.findOne({ identifier });
        if (!rt) return res.status(403).send(Response(errors.ERR_INVAT));
        // eslint-disable-next-line eqeqeq
        if (rt.user != user) return res.status(403).send(Response(errors.ERR_INVAT));

        req.user = await User.findById(user);
        if (!req.user) return res.status(404).send(Response(errors.ERR_UNF));

        if (rt.isExpired()) return res.status(403).send(Response(errors.ERR_EXPAT));
        await rt.prolongToken();

        if (!res.body) res.body = {};
        res.body.profile = await User.findById(user, "-pass");

        return next();
    } catch (error) {
        console.error("user.middleware", error);
        return res.status(500).send(Response(errors.ERR_INTE));
    }
}

module.exports = {
    userLoginInputValidationMiddleware,
    userRegisterInputValidationMiddleware,
    userAuthValidationMiddleware,
};
