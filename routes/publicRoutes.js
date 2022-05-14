const express = require("express");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const {
  welcome,
  // showRegister,
  storeUser,
  profile,
  // showLogin,
  // showLoginError,
  // login,
} = require("../controllers/publicRoutesController");
const { getToken } = require("../controllers/tokenController");

const publicRouter = express.Router();

publicRouter.get("/profile/:username", profile);

//Register
publicRouter.post("/users", storeUser);
// Log In
publicRouter.post("/tokens", getToken);

module.exports = publicRouter;
