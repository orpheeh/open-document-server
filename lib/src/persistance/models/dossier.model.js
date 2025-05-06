const { DataTypes } = require("sequelize");
const orm = require("../../bin/orm");

module.exports = async () => (await orm()).define('Dossier',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
        },
        // ID de l'entité
        createdBy: {
            type: DataTypes.STRING,
        },
        // Non de l'auteur
        author: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        detail: {
            type: DataTypes.STRING,
        },
    }, {
    paranoid: true,
});