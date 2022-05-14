const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");
const userRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use(publicRoutes);
  app.use(privateRoutes);
  app.use(userRoutes);
};
