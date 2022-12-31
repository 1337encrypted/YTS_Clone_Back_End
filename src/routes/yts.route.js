// Imports
const Router = require("express").Router();
const { completeRequest } = require("../controllers/basic.controller");
const { ytsApiGetController } = require("../controllers/yts.controller");
const { ytsListMoviesApiMiddleware, ytsMovieDetailsApiMiddleware } = require("../middlewares/yts.middleware");

// Body
Router.get("/list_movies", ytsListMoviesApiMiddleware, ytsApiGetController, completeRequest);

Router.get("/movie_details", ytsMovieDetailsApiMiddleware, ytsApiGetController, completeRequest);

module.exports = Router;
