const express = require("express");
const {
  createHistory,
  getHistory,
} = require("../Controllers/HistoryController");
const { isAuthenticatedUser } = require("../Controllers/UserController");
const historyRouter = express.Router();

historyRouter.route("/history/create").post(isAuthenticatedUser, createHistory);
historyRouter.route("/history").post(isAuthenticatedUser, getHistory);

module.exports = historyRouter;
