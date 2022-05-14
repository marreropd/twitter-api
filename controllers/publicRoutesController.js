const User = require("../models/User");
const formidable = require("formidable");
const validator = require("validator");

// Muestra Welcome page
// async function welcome(req, res) {
//   res.render("welcome");
// }

// Muestra Register page
// async function showRegister(req, res) {
//   res.render("register");
// }

// Registrarse
async function storeUser(req, res) {
  console.log("hola");
  // const form = formidable({
  //   multiples: true,
  //   uploadDir: `${__dirname}/../public/img`,
  //   keepExtensions: true,
  // });
  // form.parse(req, async (err, fields, files) => {
  //   const image = files.image;
  if (validator.isEmail(req.body.email)) {
    try {
      await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        // avatar: `img/${image.newFilename}`,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
      });

      // res.redirect("/login");
      res.json("User successfully created");
    } catch (error) {
      console.log("ERROR:", error.message);
    }
  } else {
    res.status(400).json({ error: "user-data-error" });
    res.status(400);
    res.render("user-data-error");

    console.log("faltan datos");
  }
  // });
}

async function profile(req, res) {
  const username = req.params.username;
  // RECORDAR PROBAR GETUSER, VER DOC
  const userByUserName = await User.find({ username: username })
    .sort({ createdAt: "desc" })
    .populate("tweets");
  // const suggestedUsers = await User.find().skip(Math.floor(Math.random() * 3));
  res.json(userByUserName);
}

// Muestra LogIn page
// async function showLogin(req, res) {
//   res.render("login");
// }

// Muestra error de login
// async function showLoginError(req, res) {
//   res.status(400);
//   res.render("user-data-error");
// }

// Inicia sesión
// async function login(req, res) {
//   res.redirect("/home");
// }

module.exports = {
  // showRegister,
  storeUser,
  profile,
  // showLogin,
  // showLoginError,
  // login,
  // welcome,
};
