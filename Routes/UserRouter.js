const express = require("express");
const {
  userSignup,
  userLogin,
  userLogout,
} = require("../Controllers/UserController");
const UserRouter = express.Router();

UserRouter.route("/signup").post(userSignup);
UserRouter.route("/login").post(userLogin);
UserRouter.route("/logout").post(userLogout);

module.exports = UserRouter;
