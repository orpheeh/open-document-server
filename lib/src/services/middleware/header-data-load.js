const orm = require("../../bin/orm");
const RepositoryORM = require("../frameworks/orm-repository");

module.exports = async (req, res, next) => {
    const seq = await orm();
    const repository = new RepositoryORM(seq.models.Programme);
    const programmes = await repository.findAll();
    req.programmes = programmes;
    return next();
}