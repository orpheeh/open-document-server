const Sequelize = require("sequelize");

let sequelize = null;

async function sequelizeInit() {
    const pgHost = process.env.PG_HOST || 'localhost';
    const pgPort = process.env.PG_PORT || '5432';
    const pgUser = process.env.PG_USER || 'postgres';
    const pgPassword = process.env.PG_PASS || 'password';
    const pgDatabase = process.env.PG_DB || 'miropro';

    const sequelize = new Sequelize(`postgres://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabase}`, {
        logging: false
    });

    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return null;
    }

    return sequelize;
}

module.exports = async () => {
    if (sequelize == null) {
        sequelize = await sequelizeInit();
    }
    return sequelize;
};