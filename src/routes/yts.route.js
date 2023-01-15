// Imports
const Router = require("express").Router();
const { completeRequest } = require("../controllers/basic.controller");
const { ytsApiGetController } = require("../controllers/yts.controller");
const { ytsListMoviesInputValidationMiddleware, ytsMovieDetailsInputValidationMiddleware } = require("../middlewares/yts.middleware");

// Body
Router.get("/list_movies", ytsListMoviesInputValidationMiddleware, ytsApiGetController, completeRequest);

Router.get("/movie_details", ytsMovieDetailsInputValidationMiddleware, ytsApiGetController, completeRequest);

module.exports = Router;
