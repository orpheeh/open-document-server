const dossierController = require("../controller/api/space.controller");

const router = require("express").Router();

router.post("/", dossierController.createDossier);
router.put("/:id", dossierController.updateDossier);
router.get("/", dossierController.getAllDossier);
router.get("/by-entite/:id", dossierController.getAllDossierByEntite);
router.get("/:id", dossierController.getDossier);
router.delete("/:id", dossierController.deleteDossier);

module.exports = router;

