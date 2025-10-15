const fetch = require("node-fetch");

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
            const docUrl = doc.url + "?token=" + req.query.access_token;
            const callbackUrl = process.env.URL + "/ol/save";
            const token = jwt.sign({
                document: {
                    fileType: "docx",
                    key: doc.id,
                    title: doc.title,
                    url: docUrl,
                },
                documentType: "word",
                editorConfig: {
                    callbackUrl
                }
            }, secret, { algorithm: "HS256" });
            res.render("pages/home/home.hbs", {
                title: doc.title, doc, token,
                docUrl,
                callbackUrl,
                onlyOfficeURL: ol_url + "/web-apps/apps/api/documents/api.js"
            });
        } else {
            res.render("pages/404.hbs", { title: "Open Document Server" });
        }

    },

    async viewer__Page(req, res) {
        if (!req.query.access_token) {
            return res.status(401).send({ message: "Invalid access token !" });
        }

        const ol_url = process.env.ONLYOFFICE_URL;
        const doc = {
            id: req.query.id,
            title: req.query.title,
            url: req.query.url
        };
        const secret = process.env.OL_SECRET || "conseil-interministeriel-jwt-secret";
        const docUrl = doc.url + "?token=" + req.query.access_token;
        const callbackUrl = process.env.URL + "/ol/save";
        const token = jwt.sign({
            document: {
                fileType: "docx",
                key: doc.id,
                title: doc.title,
                url: docUrl,
                permissions: {
                    edit: false,
                },
            },
            documentType: "pdf",
            editorConfig: {
                mode: "view"
            }
        }, secret, { algorithm: "HS256" });
        res.render("pages/home/viewer.hbs", {
            title: doc.title, doc, token,
            docUrl,
            callbackUrl,
            onlyOfficeURL: ol_url + "/web-apps/apps/api/documents/api.js"
        });

    },

    async generateToken(req, res) {
        if (!req.query.access_token) {
            return res.status(401).send({ message: "Invalid access token !" });
        }

        const ol_url = process.env.ONLYOFFICE_URL;
        const doc = {
            id: req.query.id,
            title: req.query.title,
            url: req.query.url
        };
        const secret = process.env.OL_SECRET || "conseil-interministeriel-jwt-secret";
        const docUrl = doc.url + "?token=" + req.query.access_token;
        const callbackUrl = process.env.URL + "/ol/save";
        const token = jwt.sign({
            document: {
                fileType: "docx",
                key: doc.id,
                title: doc.title,
                url: docUrl,
                permissions: {
                    edit: false,
                },
            },
            documentType: "word",
            editorConfig: {
                mode: "view"
            }
        }, secret, { algorithm: "HS256" });

        const pdfUrl = ol_url + `/printfile/${doc.id}_3516/${doc.title}.pdf?token=${token}&shardkey=${doc.id}&filename=${doc.title}.pdf`;

        res.send({
            token,
            pdfUrl
        })

    },

    async convertPDF(req, res) {
        try {
            if (!req.query.access_token) {
                return res.status(401).send({ message: "Invalid access token !" });
            }

            const ol_url = process.env.ONLYOFFICE_URL;
            const doc = {
                filetype: "docx",
                key: req.query.id,
                outputtype: "pdf",
                title: req.query.title,
                url: req.query.url
            };
            const secret = process.env.OL_SECRET || "conseil-interministeriel-jwt-secret";
            const token = jwt.sign(doc, secret, { algorithm: "HS256" });

            const response = await fetch(ol_url + "/convert", {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify(doc)
            });
            if (response.status == 200) {
                const data = await response.json();
                res.send(data);
            } else {
                const data = await response.text();
                res.status(400).send({
                    data
                })
            }
            res.send(data);
        } catch (err) {
            res.status(500).send({ err: err.toString() })
        }
    }


}