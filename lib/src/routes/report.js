const reportController = require("../controller/api/report.controller");
const homeController = require("../controller/home/home.controller");

const router = require("express").Router();

router.get("/generate-report/:templateId", reportController.generateDocument);

module.exports = router;