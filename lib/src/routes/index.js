const express = require("express");

const home = require("./home");
const apiDocument = require("./api-document");
const apiDossier = require("./api-dossier");
const verifyTokenMiddleware = require("../services/security/verify-token.middleware");
const verifyPermissionMiddleware = require("../services/security/verify-permission.middleware");

/**
 * @param {express.Express} app 
 */
module.exports = (app) => {

    app.get("/", (req, res) => res.redirect("/home"));

    app.use("/api", verifyTokenMiddleware);
    app.use("/api", verifyPermissionMiddleware);

    app.use("/home", home);
    app.use("/api/doc", apiDocument);
    app.use("/api/dossier", apiDossier);

    app.use((req, res) => {
        res.render('pages/404.hbs', { title: "Open document server" });
    });
}
