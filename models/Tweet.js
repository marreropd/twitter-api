const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 140,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  },
  { timestamps: true }, // new Date (DD MMM YYYY) --> para que muestre en formato 23 feb 2022
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
