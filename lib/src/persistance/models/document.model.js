const { DataTypes } = require("sequelize");
const orm = require("../../bin/orm");

module.exports = async () => (await orm()).define('Document',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
        },
        createdBy: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        },
        filename: {
            type: DataTypes.STRING,
        },
        filetype: {
            type: DataTypes.STRING,
        },
        filesize: {
            type: DataTypes.INTEGER,
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