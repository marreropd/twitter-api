const User = require("../models/User");
const Tweet = require("../models/Tweet");

async function storeTweet(req, res) {
  console.log(req.body);

  const user = await User.findById(req.user.sub);

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  const tweet = await new Tweet({
    content: req.body.tweet,
    user: req.user.sub,
  });

  console.log(tweet);
  await tweet.save();
  await User.findByIdAndUpdate(req.user.sub, {
    $push: {
      tweets: {
        $each: [tweet],
        $sort: -1,
      },
    },
  });
  res.json(await tweet.populate("user"));
}

async function toggleFollowUser(req, res) {
  const userId = req.user.sub;

  const userNameToFollow = req.params.username;

  const currentUser = await User.findById(userId);

  const userToFollow = await User.findOne({ username: userNameToFollow });

  if (currentUser._id === userToFollow._id) {
    return res.status(400).json({ message: "ERROR: No puedes seguirte a tí mismo" });
  }

  if (!userToFollow.followers.includes(userId)) {
    await User.findByIdAndUpdate(userToFollow._id, { $addToSet: { followers: currentUser._id } });
    await User.findByIdAndUpdate(currentUser._id, { $addToSet: { following: userToFollow._id } });
    console.log("no lo seguía");
    res.json({ message: "Following" });
  } else {
    await User.findByIdAndUpdate(userToFollow._id, { $pull: { followers: currentUser._id } });
    await User.findByIdAndUpdate(currentUser._id, { $pull: { following: userToFollow._id } });
    console.log("Soy yo mismo o ya lo sigo");
    res.json({ message: "Unfollow" });
  }
}

async function showFollowers(req, res) {
  const username = req.params.username;
  const user = await User.find({ username: username }).populate("followers");
  console.log(user);
  // const suggestedUsers = await User.find().skip(Math.floor(Math.random() * 3));
  res.json(user.followers);
}

async function toggleFollowBack(req, res) {
  const userId = req.user.sub;
  const userToFollowId = req.params.username;

  if (userId === userToFollowId) {
    return res.status(400).send("ERROR: No puedes seguirte a tí mismo");
  }

  const userToFollow = await User.findById(userToFollowId);

  if (!userToFollow.followers.includes(userId)) {
    await User.findByIdAndUpdate(userToFollowId, { $addToSet: { followers: userId } });
    await User.findByIdAndUpdate(userId, { $addToSet: { following: userToFollowId } });
    console.log("no lo seguía");
  } else {
    await User.findByIdAndUpdate(userToFollowId, { $pull: { followers: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { following: userToFollowId } });
    console.log("Soy yo mismo o ya lo sigo");
  }

  res.redirect(`/profile/followers/${userToFollowId}`);
}

async function showFollowing(req, res) {
  const userId = req.params.id;
  const userById = await User.findById(userId).populate("following");
  // const suggestedUsers = await User.find().skip(Math.floor(Math.random() * 3));
  console.log(userById.following);
  res.json(userById.following);
}

async function userLogOut(req, res) {
  await req.logout();
  res.redirect("/");
}

async function toggleLike(req, res) {
  const userId = req.user.sub;
  const tweetId = req.params.id;
  const tweet = await Tweet.findById(tweetId);
  const likes = tweet.likes;

  if (likes.includes(userId)) {
    console.log("SACO LIKE");
    await Tweet.updateOne({ _id: tweetId }, { $pull: { likes: userId } });
    res.json({ message: "unlike" });
  } else {
    console.log("HAGO LIKE");
    await Tweet.updateOne({ _id: tweetId }, { $addToSet: { likes: userId } });
    res.json({ message: "like" });
  }
}

async function removeTweet(req, res) {
  //const user = req.user.id;
  const tweetToDestroy = req.params.id;
  const deletedTweet = await Tweet.findByIdAndDelete(tweetToDestroy, {
    $pull: { tweets: tweetToDestroy },
  });
  //await User.findByIdAndUpdate(user, { $pull: { tweets: tweetToDestroy } });
  console.log(deletedTweet);
  res.json({ message: "Tweet removed successfully" });
}

module.exports = {
  storeTweet,
  toggleFollowUser,
  showFollowers,
  toggleFollowBack,
  showFollowing,
  toggleLike,
  removeTweet,
  userLogOut,
};
