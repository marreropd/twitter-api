const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      minlength: 1,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      minlength: 0,
      maxlength: 200,
    },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

userSchema.methods.verifyPassword = async function (passwordToVerify) {
  return await bcrypt.compare(passwordToVerify, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
