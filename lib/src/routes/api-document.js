const dossierController = require("../controller/api/dossier.controller");
const uploadData = require("../services/middleware/upload-data");

const router = require("express").Router();

router.post("/", uploadData(), dossierController.createDocument);
router.post("/save",  dossierController.saveDocument);
router.put("/:id", dossierController.updateDocument);
router.get("/", dossierController.getAllDocument);
router.get("/by-entite/:id", dossierController.getAllDocumentByEntite);
router.get("/:id", dossierController.getDocument);
router.delete("/:id", dossierController.deleteDocument);

module.exports = router;

