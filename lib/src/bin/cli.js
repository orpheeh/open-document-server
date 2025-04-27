require("dotenv").config();
const ormInit = require("./orm");
const ormModel = require("../persistance/config/orm-model");
const { createUser, listUser } = require("../services/app/user");

cli();

const handlers = {
    "user": {
        "create": async () => {
            const result = {
                nom_complet: process.argv[4],
                username: process.argv[5],
                password: process.argv[6],
                fonction: process.argv[7],
                organisation: process.argv[8],
                role: process.argv[9],
            }
            const user = await createUser(result.nom_complet, result.username,
                result.password, result.fonction,
                result.organisation, result.role);
            console.log();
            console.log(user.id + " " + user.username + " " + user.password);
            console.log("SUCCESS !");
        },
        "list": async () => {
            const users = await listUser();
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].id + "    " + users[i].username);
                console.log("----------------------------------------");
            }
        },
        "reset": () => {

        }
    },
}

async function cli() {
    const orm = await ormInit();
    await ormModel();
    const module = process.argv[2];
    const command = process.argv[3];
    await handlers[module][command]();
    process.exit(1);

}