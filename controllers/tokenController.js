const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function getToken(req, res) {
  // console.log(req.data);
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user && (await user.verifyPassword(req.body.password))) {
    const token = jwt.sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: token, id: user._id, username: user.username });
  } else {
    res.status(400).json({ Error: "Credenciales inválidas." });
  }
}

module.exports = {
  getToken,
};
