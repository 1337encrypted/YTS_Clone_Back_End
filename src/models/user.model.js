// Imports
const mongoose = require("mongoose");
const config = require("../configs/usermodel.config.json");

// Constants
const { Schema } = mongoose;
const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: RegExp(config["username.regex"], "i"),
    },
    pass: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        max: 256,
        validate: RegExp(config["name.regex"]),
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: RegExp(config["email.regex"]),
    },
});

// Body
schema.statics.findByUsername = async function (username) {
    return this.findOne({ username }).exec();
};

schema.statics.isUsernameAvailable = async function (username) {
    return (await this.findOne({ username }).exec()) == null;
};

schema.statics.findByEmail = async function (email) {
    return this.findOne({ email }).exec();
};

schema.statics.isEmailAvailable = async function (email) {
    return (await this.findOne({ email }).exec()) == null;
};

module.exports = mongoose.model("user", schema);
