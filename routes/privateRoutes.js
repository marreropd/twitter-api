const express = require("express");
const checkJwt = require("express-jwt");
const privateRoutes = require("../controllers/privateRoutesController");
const privateRouter = express.Router();

privateRouter.use(checkJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ["HS256"] }));
privateRouter.get("/tweets", privateRoutes.index);

module.exports = privateRouter;
