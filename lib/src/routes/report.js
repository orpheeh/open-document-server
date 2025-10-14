const reportController = require("../controller/api/report.controller");
const homeController = require("../controller/home/home.controller");

const router = require("express").Router();

router.post("/generate-report/:templateId", reportController.generateDocument);

router.get("/convert-pdf", reportController.convertPDF);

module.exports = router;