const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

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

    async updateDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.model.Document);
            const result = await repository.update(req.params.id, req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getAllDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.model.Document);
            const result = await repository.findAll();
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async saveDocument(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.model.Document);
            res.send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    }
}