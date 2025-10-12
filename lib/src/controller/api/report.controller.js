const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

const easyTemplate = require("easy-template-x");
const fs = require("fs");

module.exports = {

    async generateDocument(req, res, next) {
        try {
            if (!req.body.code || !req.body.data) {
                return res.status(400).send({ message: "Il manque des informations importante: Code & Data" });
            }
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const template = await repository.findById(req.params.templateId);
            const templateFile = fs.readFileSync(template.path);
            const handler = new easyTemplate.TemplateHandler();
            const doc = await handler.process(templateFile, req.body.data);
            filename = 'template__' + template.id + '__' + req.body.code + '__output.docx';
            fs.writeFileSync("files/" + filename, doc);
            res.send({
                url: process.env.URL + "/files/output/" + filename,
                path: "/files/output/" + filename,
                filename
            });
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

}