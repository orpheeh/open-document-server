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

    async callbackOnlyoffice(req, res, next) {
        const { status, url, key, userdata } = req.body;

        console.log(req.body);

        // Handle different statuses
        if (status === 2 || status === 3) { // Status 2: Document saved, Status 3: Document saving error
            // Download the updated document from the provided 'url'
            // and save it to your storage.
            // The 'url' parameter contains the link to the updated document on the Document Server.

            // Example (simplified):
            // You would typically use a library like 'axios' or 'node-fetch' to download the file.
            // const updatedDocumentContent = await downloadFile(url);
            // fs.writeFileSync('path/to/your/saved/document.docx', updatedDocumentContent);

            console.log(`Document saved or error: Status ${status}, URL: ${url}`);
        } else if (status === 6) { // Status 6: Document closed without saving
            console.log(`Document closed without saving. Key: ${key}`);
        }
        // Handle other statuses as needed

        res.json({ error: 0 }); // Respond to the Document Server
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