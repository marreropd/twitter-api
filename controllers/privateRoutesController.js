const Tweet = require("../models/Tweet");
const User = require("../models/User");
const formatDate = require("date-fns/format");
const { es } = require("date-fns/locale");

async function index(req, res) {
  const tweets = await Tweet.find().sort({ createdAt: "desc" }).populate("user");
  //const suggestedUsers = await User.find().skip(Math.floor(Math.random() * 3));
  res.json(tweets);
}

module.exports = {
  index,
};
