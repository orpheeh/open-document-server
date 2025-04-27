const homeController = require("../controller/home/home.controller");

const router = require("express").Router();

router.get("/", homeController.home__Page);

module.exports = router;