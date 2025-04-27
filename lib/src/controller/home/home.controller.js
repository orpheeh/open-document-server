const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

module.exports = {

    async home__Page(req, res) {
        const seq = await orm();
        const repository = new RepositoryORM(seq.models.Document);

        const doc = await repository.findById(req.query.id);
        if(doc) {
            res.render("pages/home/home.hbs", { title: doc.title, doc });
        } else {
            res.render("pages/404.hbs", { title: "Open Document Server" });
        }

    }
}