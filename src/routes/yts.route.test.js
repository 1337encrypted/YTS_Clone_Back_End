// Setup
require("dotenv").config();

// Imports
const fetch = require("node-fetch").default;
const { expressApp, httpApp } = require("../utils/express.util");

// Constants
const { PORT } = process.env;
const HOST = `http://localhost:${PORT}/yts`;
const listMoviesTestPayload = [
    {
        urls: [`${HOST}/list_movies?limit=sometext`, `${HOST}/list_movies?limit=0`, `${HOST}/list_movies?limit=69`],
        errcode: "ERR_LIM",
    },
    {
        urls: [`${HOST}/list_movies?page=sometext`, `${HOST}/list_movies?page=0`],
        errcode: "ERR_PG",
    },
    {
        urls: [`${HOST}/list_movies?quality=sometext`],
        errcode: "ERR_QLT",
    },
    {
        urls: [`${HOST}/list_movies?minimum_rating=sometext`, `${HOST}/list_movies?minimum_rating=-1`, `${HOST}/list_movies?minimum_rating=69`],
        errcode: "ERR_MINR",
    },
    {
        urls: [`${HOST}/list_movies?genre=sometext`],
        errcode: "ERR_GNR",
    },
    {
        urls: [`${HOST}/list_movies?sort_by=sometext`],
        errcode: "ERR_SBY",
    },
    {
        urls: [`${HOST}/list_movies?order_by=sometext`],
        errcode: "ERR_OBY",
    },
    {
        urls: [`${HOST}/list_movies?with_rt_ratings=sometext`],
        errcode: "ERR_RTR",
    },
];
const movieDetailsTestPayload = [
    {
        urls: [`${HOST}/movie_details`],
        errcode: "ERR_NOID",
    },
    {
        urls: [`${HOST}/movie_details?movie_id=`, `${HOST}/movie_details?imdb_id=`, `${HOST}/movie_details?movie_id=sometext`, `${HOST}/movie_details?imdb_id=sometext`],
        errcode: "ERR_INVID",
    },
    {
        urls: [`${HOST}/movie_details?movie_id=10&with_images=`, `${HOST}/movie_details?movie_id=10&with_images=sometext`],
        errcode: "ERR_WIE",
    },
    {
        urls: [`${HOST}/movie_details?movie_id=10&with_cast=`, `${HOST}/movie_details?movie_id=10&with_cast=sometext`],
        errcode: "ERR_WCE",
    },
];

// Consume Routes and Listen
expressApp.use("/yts", require("./yts.route"));

afterAll(() => httpApp.close());

// Tests
test("Validates query parameters for `/list_movies` endpoint", async () => {
    // eslint-disable-next-line no-restricted-syntax, node/no-unsupported-features/es-syntax
    for await (const testPayload of listMoviesTestPayload) {
        // eslint-disable-next-line no-restricted-syntax, no-await-in-loop, node/no-unsupported-features/es-syntax
        for await (const url of testPayload.urls) {
            const response = await fetch(url);
            const json = await response.json();

            if (!testPayload.errcode) {
                expect(json.success).toBe(true);
                expect(json.error).toBeNull();
            } else {
                expect(json.success).toBe(false);
                expect(json.error.split(":")[0]).toBe(testPayload.errcode);
            }
        }
    }
});

test("Validates query parameters for `/movie_details` endpoint", async () => {
    // eslint-disable-next-line no-restricted-syntax, node/no-unsupported-features/es-syntax
    for await (const testPayload of movieDetailsTestPayload) {
        // eslint-disable-next-line no-restricted-syntax, no-await-in-loop, node/no-unsupported-features/es-syntax
        for await (const url of testPayload.urls) {
            const response = await fetch(url);
            const json = await response.json();

            if (!testPayload.errcode) {
                expect(json.success).toBe(true);
                expect(json.error).toBeNull();
            } else {
                expect(json.success).toBe(false);
                expect(json.error.split(":")[0]).toBe(testPayload.errcode);
            }
        }
    }
});
