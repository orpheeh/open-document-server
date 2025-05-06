const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

module.exports = {

    async createDossier(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Dossier);
            const result = await repository.create(req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async updateDossier(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Dossier);
            const result = await repository.update(req.params.id, req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getAllDossier(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Dossier);
            const result = await repository.findAll({}, [
                { model: seq.models.Dossier },
                { model: seq.models.Document },
            ]);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getAllDossierByEntite(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Dossier);
            const result = await repository.findAll({ createdBy: req.params.id }, [
                { model: seq.models.Dossier },
                { model: seq.models.Document },
            ]);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async getDossier(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Dossier);
            const result = await repository.findById(req.params.id);
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    },

    async saveDossier(req, res, next) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.Dossier);
            res.send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ err: err.toString() });
        }
    }
}