const orm = require("../../bin/orm");
const RepositoryORM = require("../../services/frameworks/orm-repository");

module.exports = {

    async home__Page(req, res) {
        const seq = await orm();

        res.render("pages/home/home.hbs", { title: "Open Document Server" });
    }
}