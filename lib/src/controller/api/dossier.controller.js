const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");
const downloadFile = require("../../services/utils/download-file");

const fs = require("fs");

module.exports = {

    async createDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const result = await repository.create(req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async callbackOnlyoffice(req, res, next) {
        try {
            const { status, url, key, userdata } = req.body;
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            console.log(req.body);
            if (status === 2 || status === 3) {
                const template = await repository.findById(req.body.key);
                const updatedDocumentContent = await downloadFile(req.body.url, req.body.token);
                const arrayBuffer = await updatedDocumentContent.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                //fs.unlinkSync(template.path);
                console.log(template.path);
                fs.writeFileSync(template.path, buffer);
                console.log(`Document saved or error: Status ${status}, URL: ${url}`);
            } else if (status === 6) {
                console.log(`Document closed without saving. Key: ${key}`);
            }
            res.json({ error: 0 });
        } catch (err) {
            console.log(err);
            res.json({ error: 1, err: err.toString() });

        }
    },

    async updateDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const result = await repository.update(req.params.id, req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getAllDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const result = await repository.findAll();
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getAllDocumentByEntite(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const result = await repository.findAll({ createdBy: req.params.id });
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const result = await repository.findById(req.params.id);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async saveDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            res.send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async deleteDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Document);
            const result = await repository.deleteWhere({ id: req.params.id });
            res.send({ message: "Document supprimé avec succès !" });
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },
}