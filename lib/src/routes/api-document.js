const dossierController = require("../controller/api/dossier.controller");
const uploadData = require("../services/middleware/upload-data");

const router = require("express").Router();

router.post("/", uploadData(), dossierController.createDocument);
router.put("/:id", dossierController.updateDocument);
router.get("/", dossierController.getAllDocument);

module.exports = router;

