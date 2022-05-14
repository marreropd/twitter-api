const express = require("express");
const checkJwt = require("express-jwt");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.use(checkJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ["HS256"] }));
userRouter.get("/logout", userController.userLogOut);
userRouter.post("/tweets", userController.storeTweet);

userRouter.post("/user/follow/:username", userController.toggleFollowUser);

userRouter.delete("/tweet/:id", userController.removeTweet);

userRouter.get("/profile/followers/:username", userController.showFollowers);

userRouter.post("profile/follow/:id", userController.toggleFollowBack);

userRouter.get("/profile/following/:username", userController.showFollowing);

userRouter.post("/like/tweet/:id", userController.toggleLike);

module.exports = userRouter;
