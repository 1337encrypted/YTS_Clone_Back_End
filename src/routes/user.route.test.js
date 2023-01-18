// Setup
require("dotenv").config();

// Imports
const fetch = require("node-fetch").default;
const { expressApp, httpApp } = require("../utils/express.util");

// Constants
const { PORT } = process.env;
const HOST = `http://localhost:${PORT}/user`;
const loginTestPayload = [
    {
        body: {},
        errcode: "ERR_NOE",
    },
    {
        body: {
            email: "sometext",
        },
        errcode: "ERR_INVE",
    },
    {
        body: {
            email: "sometext@example.com",
        },
        errcode: "ERR_NOP",
    },
    {
        body: {
            email: "sometext@example.com",
            password: "short",
        },
        errcode: "ERR_INVP",
    },
    {
        body: {
            email: "sometext@example.com",
            password: "thispasswordislongerthansixteencharacters",
        },
        errcode: "ERR_INVP",
    },
];
const registerTestPayload = [
    {
        body: {},
        errcode: "ERR_NOE",
    },
    {
        body: {
            email: "sometext",
        },
        errcode: "ERR_INVE",
    },
    {
        body: {
            email: "sometext@example.com",
        },
        errcode: "ERR_NOP",
    },
    {
        body: {
            email: "sometext@example.com",
            password: "short",
        },
        errcode: "ERR_INVP",
    },
    {
        body: {
            email: "sometext@example.com",
            password: "thispasswordislongerthansixteencharacters",
        },
        errcode: "ERR_INVP",
    },
    {
        body: {
            email: "sometext@example.com",
            password: "thispasswordislongerthansixteencharacters",
        },
        errcode: "ERR_INVP",
    },
    {
        body: {
            email: "sometext@example.com",
            password: "goodpassword",
            name: "!NV@L!DN@/^^\\3",
        },
        errcode: "ERR_INVN",
    },
];

// Consume Routes and Listen
expressApp.use("/user", require("./user.route"));

afterAll(() => httpApp.close());

// Tests
test("Validates body parameters for `/login` endpoint", async () => {
    // eslint-disable-next-line no-restricted-syntax, node/no-unsupported-features/es-syntax
    for await (const testPayload of loginTestPayload) {
        const response = await fetch(`${HOST}/auth`, {
            method: "post",
            body: JSON.stringify(testPayload.body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error.split(":")[0]).toBe(testPayload.errcode);
    }
});

test("Validates body parameters for `/register` endpoint", async () => {
    // eslint-disable-next-line no-restricted-syntax, node/no-unsupported-features/es-syntax
    for await (const testPayload of registerTestPayload) {
        const response = await fetch(`${HOST}/register`, {
            method: "post",
            body: JSON.stringify(testPayload.body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error.split(":")[0]).toBe(testPayload.errcode);
    }
});
