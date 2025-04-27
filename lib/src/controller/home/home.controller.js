const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

const jwt = require("jsonwebtoken");

module.exports = {

    async home__Page(req, res) {
        const seq = await orm();
        const repository = new RepositoryORM(seq.models.Document);

        const doc = await repository.findById(req.query.id);
        const secret = process.env.OL_SECRET || "conseil-interministeriel-jwt-secret";
        if (doc) {
            const token = jwt.sign({
                document: {
                    fileType: "docx",
                    key: "{{doc.id}}",
                    title: "{{doc.title}}",
                    url: "{{doc.url}}",
                },
                documentType: "word",
            }, secret, { algorithm: "HS256" });
            console.log(token);
            res.render("pages/home/home.hbs", { title: doc.title, doc, token });
        } else {
            res.render("pages/404.hbs", { title: "Open Document Server" });
        }

    }
}