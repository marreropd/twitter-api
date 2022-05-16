require("dotenv").config();

const express = require("express");

const routes = require("./routes");
const mongoose = require("mongoose");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();
app.use(cors());
var cors = require("cors");

//const MongoStore = require("connect-mongo"); //(session.Store);

/* app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_STRING,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);
 */
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(express.static("public"));
app.use(express.json());
routes(app);
//dbInitialSetup();

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
