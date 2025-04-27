const app = require("./lib/src/bin/app");
const ormInit = require("./lib/src/bin/orm");
const ormModel = require("./lib/src/persistance/config/orm-model");

async function launcher() {
    const orm = await ormInit();
    await ormModel();
    await orm.sync({ alter: true });
    app();
}

launcher();