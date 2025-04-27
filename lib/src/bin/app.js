require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const route = require("../routes");
const app = express();
const hbsConfig = require("../services/config/hbs-config");
const helmetSecureMiddleware = require("../services/security/helmet-secure.middleware");
const sessisonConfig = require("../services/config/sessison-config");
const passportConfig = require("../services/config/passport-config");

app.use(cors());
//app.use(helmetSecureMiddleware);
sessisonConfig(app);
app.use(passport.authenticate('session'));
passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/static",
  express.static(path.join(__dirname, "../presentation/public"))
);
app.use(
  "/files",
  express.static(path.join(__dirname, "../../../files"))
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../presentation/views"));

hbsConfig();
route(app);

module.exports = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log("Open document server app listenning at " + port + "...")
  );
};
