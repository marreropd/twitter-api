require("dotenv").config();

const express = require("express");

const routes = require("./routes");
const mongoose = require("mongoose");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

var cors = require("cors");

mongoose.connect(process.env.DB_CONNECTION_STRING);
app.use(cors());

app.use(express.static("public"));

app.use(express.json());

routes(app);
//dbInitialSetup();

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`)
);
