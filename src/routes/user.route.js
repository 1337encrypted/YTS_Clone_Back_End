// Imports
const Router = require("express").Router();
const { completeRequest } = require("../controllers/basic.controller");
const { userLoginInputValidationMiddleware, userRegisterInputValidationMiddleware, userAuthValidationMiddleware } = require("../middlewares/user.middleware");
const { userLoginController, userRegisterController, userLogoutController } = require("../controllers/user.controller");

// Body
Router.post("/register", userRegisterInputValidationMiddleware, userRegisterController, completeRequest);
Router.post("/auth", userLoginInputValidationMiddleware, userLoginController, completeRequest);
Router.get("/auth", userAuthValidationMiddleware, completeRequest);
Router.delete("/auth", userAuthValidationMiddleware, userLogoutController, completeRequest);

module.exports = Router;
