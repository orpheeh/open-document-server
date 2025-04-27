const passport = require("passport");
const LocalStrategy = require('passport-local');
const orm = require("../../bin/orm");
const RepositoryORM = require("../frameworks/orm-repository");
const argon2 = require("argon2");

module.exports = async () => {
    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        const seq = await orm();
        const userRepository = new RepositoryORM(seq.models.User);
        const users = await userRepository.findAll({
            username
        });
        if (users.length == 0) {
            return cb(null, false, { message: "Nom d'utilisateur incorrect !" });
        }
        const user = users[0];
        console.log(JSON.stringify(user));
        if (await argon2.verify(user.password, password)) {
            // password match
            console.log("success");
            return cb(null, user);
        } else {
            // password did not match
            return cb(null, false, { message: "Mot de passe incorrect incorrect !" });
        }
    }));

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, {
                id: user.id, username: user.username, nom: user.nom_complet,
                role: user.role, organisation: user.organisation, fonction: user.fonction
            });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}

