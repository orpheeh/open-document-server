const { Op } = require("sequelize");
const seq = require("sequelize");

module.exports = class RepositoryORM {

    constructor(SequelizeModel) {
        this.SequelizeModel = SequelizeModel;
    }

    async create(data, callback = ()=>{}) {
        const result = await this.SequelizeModel.create(data);
        callback(result, data);
        return result;
    }

    async update(id, data) {
        await this.SequelizeModel.update(data, {
            where: { id }
        });
        return await this.SequelizeModel.findByPk(id);
    }

    async findById(id, include) {
        const result = await this.SequelizeModel.findByPk(id, {
            include,
            paranoid: false,
        });
        return result;
    }

    async findAll(where, include = [], order = []) {
        const result = await this.SequelizeModel.findAll({
            paranoid: false,
            order, include, include, where,
        });
        return result;
    }

    async findAllPaginate(limit, offset, include, order, filter, attribut, attributeDB) {
        const where = {};
        if (filter) {
            limit = null;
            offset = null;
            where[attribut] = seq.where(seq.fn('LOWER', seq.col(attributeDB)), { [Op.like]: '%' + filter + '%' })
        }
        let result = await this.SequelizeModel.findAndCountAll({
            where,
            order,
            include,
            limit,
            offset,
            paranoid: false,
        });
        return result;
    }

    /**
     * 
     * @param {*} startDate Date de début
     * @param {*} endDate Date de fin
     * @param {*} limit Nombre d'élément par page
     * @param {*} offset Numéro de la page
     * @param {*} filter Elément à rechercher
     * @param {*} filterAttribute  attribut sur lequel appliquer la recherche
     * @param {*} filterAttributeDb attribut et table sur laquele appliquer la recherche Ex: Table.attribut
     * @returns 
     */
    async findAllByDatesPaginate(startDate, endDate, limit, offset, include, order, filter, attribut, attributeDB) {
        const where = {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        };
        if (filter) {
            limit = null;
            offset = null;
            where[attribut] = seq.where(seq.fn('LOWER', seq.col(attributeDB)), { [Op.like]: '%' + filter + '%' })
        }
        let result = await this.SequelizeModel.findAndCountAll({
            where,
            order,
            include,
            limit,
            offset,
            paranoid: false,
        });
        return result;
    }


    async deleteWhere(where) {
        const result = await this.SequelizeModel.destroy({
            where
        });
        return result;
    }
}