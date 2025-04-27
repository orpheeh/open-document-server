const { DataTypes } = require("sequelize");
const orm = require("../../bin/orm");

module.exports = async () => (await orm()).define('User',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nom_complet: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
        },
        fonction: {
            type: DataTypes.STRING,
        },
        organisation: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('rapporteur', 'decideur'),
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        must_change_password: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
    paranoid: true,
});