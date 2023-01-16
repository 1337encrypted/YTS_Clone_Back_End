// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Constants
const BCRYPT_SALTROUNDS = 10;
const { JWT_SECRET } = process.env;

// Body
async function bcryptHash(s) {
    return bcrypt.hash(s, BCRYPT_SALTROUNDS);
}

async function bcryptCompare(hash, s) {
    return bcrypt.compare(s, hash);
}

async function jwtSign(obj, expires = undefined) {
    return jwt.sign(obj, JWT_SECRET, !expires ? undefined : { expiresIn: expires });
}

async function jwtDecoded(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            return resolve(decoded);
        });
    });
}

module.exports = {
    bcryptHash,
    bcryptCompare,
    jwtSign,
    jwtDecoded,
};
