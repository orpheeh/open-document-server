const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

const jwt = require("jsonwebtoken");

module.exports = {

    async home__Page(req, res) {
        if (!req.query.access_token) {
            return res.status(401).send({ message: "Invalid access token !" });
        }

        const seq = await orm();
        const repository = new RepositoryORM(seq.models.Document);

        const ol_url = process.env.ONLYOFFICE_URL;
        const doc = await repository.findById(req.query.id);
        const secret = process.env.OL_SECRET || "conseil-interministeriel-jwt-secret";
        if (doc) {
            const token = jwt.sign({
                document: {
                    fileType: "docx",
                    key: doc.id,
                    title: doc.title,
                    url: doc.url + "?token=" + req.query.access_token,
                },
                documentType: "word",
            }, secret, { algorithm: "HS256" });
            res.render("pages/home/home.hbs", {
                title: doc.title, doc, token,
                docUrl: doc.url + "?token=" + req.query.access_token,
                onlyOfficeURL: ol_url + "/web-apps/apps/api/documents/api.js"
            });
        } else {
            res.render("pages/404.hbs", { title: "Open Document Server" });
        }

    }
}