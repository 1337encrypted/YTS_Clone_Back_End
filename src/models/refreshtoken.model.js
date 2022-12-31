// Imports
const mongoose = require("mongoose");
const config = require("../configs/refreshtokenmodel.config.json");

// Constants
const { Schema } = mongoose;
const schema = new Schema({
    expireAfter: {
        type: Date,
        default: () => Date.now() + config.refreshToken.expiresAfter * 1000,
        expires: config.refreshToken.expiresAfter,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

// Body
schema.methods.isExpired = function () {
    return Date.now() >= this.expireAfter;
};

schema.methods.prolongToken = async function () {
    this.expireAfter = Date.now() + config.refreshToken.expiresAfter * 1000;
    await this.save();
};

module.exports = mongoose.model("refreshtoken", schema);
