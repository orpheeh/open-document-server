const homeController = require("../controller/home/home.controller");

const router = require("express").Router();

router.get("/", homeController.home__Page);
router.get("/viewer", homeController.viewer__Page);
router.get("/pdf-url", homeController.generateToken);


module.exports = router;