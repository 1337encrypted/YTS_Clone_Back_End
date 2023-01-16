// Setup
require("dotenv").config();

// Imports
const { v4: uuidv4 } = require("uuid");
const mongoose = require("../utils/mongodb.util");
const RefreshToken = require("./refreshtoken.model");

afterAll(mongoose.disconnect);

test("CRUD operations", async () => {
    // Creation
    let id = new mongoose.Types.ObjectId("12byteslong!");
    const rt = await RefreshToken.create({
        identifier: uuidv4(),
        user: id,
    });
    expect(rt).toBeDefined();

    // Reading
    expect(rt).toHaveProperty("user", id);

    // Updation
    id = new mongoose.Types.ObjectId("new12bytes!!");
    rt.user = id;
    await rt.save();
    expect(rt).toHaveProperty("user", id);

    // Deletion
    await rt.remove();
    expect(await RefreshToken.findOne({ user: id }).exec()).toBeNull();
});

test("Schema methods", async () => {
    // Creation
    const id = new mongoose.Types.ObjectId();
    const rt = await RefreshToken.create({
        identifier: uuidv4(),
        user: id,
    });
    expect(rt).toBeDefined();

    // `isExpired`
    expect(rt.isExpired()).toBe(false);
    rt.expireAfter = Date.now();
    await rt.save();
    expect(rt.isExpired()).toBe(true);

    // `prolongToken`
    expect(rt.isExpired()).toBe(true);
    await rt.prolongToken();
    expect(rt.isExpired()).toBe(false);

    // Deletion
    await rt.remove();
});
