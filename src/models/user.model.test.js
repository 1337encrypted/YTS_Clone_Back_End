// Setup
require("dotenv").config();

// Imports
const mongoose = require("../utils/mongodb.util");
const User = require("./user.model");

afterAll(mongoose.disconnect);

test("CRUD operations", async () => {
    // Creation
    const user = await User.create({
        username: "test123123",
        email: "test123123@testing.com",
        pass: "test123123",
    });
    expect(user).toBeDefined();

    // Reading
    expect(user).toHaveProperty("username", "test123123");

    // Updation
    user.username = "updatedtest123";
    await user.save();

    expect(user).toHaveProperty("username", "updatedtest123");

    // Deletion
    await user.remove();
    expect(await User.findByUsername("updatedtest123")).toBeNull();
});

test("Schema methods", async () => {
    // Creation
    const user = await User.create({
        username: "test123123",
        email: "test123123@testing.com",
        pass: "test123123",
    });
    expect(user).toBeDefined();

    // Deletion
    await user.remove();
});

test("Schema statics", async () => {
    // Creation
    const user = await User.create({
        username: "test123123",
        email: "test123123@testing.com",
        pass: "test123123",
    });
    expect(user).toBeDefined();

    // `findByUsername`
    expect(await User.findByUsername("test123123")).toBeDefined();
    expect(await User.findByUsername("test321321")).toBeNull();

    // `isUsernameAvailable`
    expect(await User.isUsernameAvailable("test123123")).toBe(false);
    expect(await User.isUsernameAvailable("test321321")).toBe(true);

    // `findByEmail`
    expect(await User.findByEmail("test123123@testing.com")).toBeDefined();
    expect(await User.findByEmail("test321321@testing.com")).toBeNull();

    // `isEmailAvailable`
    expect(await User.isEmailAvailable("test123123@testing.com")).toBe(false);
    expect(await User.isEmailAvailable("test321321@testing.com")).toBe(true);

    // Deletion
    await user.remove();
});
