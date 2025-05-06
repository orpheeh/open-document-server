const DocumentModel = require("../models/document.model");
const dossierModel = require("../models/dossier.model");
module.exports = async () => {
    const Document = await DocumentModel();
    const Dossier = await dossierModel();

    Dossier.hasMany(Document);
    Document.belongsTo(Dossier);

    Dossier.hasMany(Dossier);
    Dossier.belongsTo(Dossier);
}