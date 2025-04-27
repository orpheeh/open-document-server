const argon2 = require('argon2');
const orm = require("../../bin/orm");
const RepositoryORM = require("../frameworks/orm-repository");

module.exports = {

    async createUser(nom_complet, username, password, fonction, organisation, role) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.User);
            const hashedPassword = await argon2.hash(password);
            const newUser = await repository.create({
                nom_complet, username, password: hashedPassword, fonction, organisation, role
            });
            return newUser;
        } catch (err) {
            console.log(err);
        }
    },

    async resetPassword(id, newPassword) {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.User);
            const hashedPassword = await argon2.hash(newPassword);
            return await repository.update(id, {
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
        }
    },

    async listUser() {
        try {
            const seq = await orm();
            const repository = new RepositoryORM(seq.models.User);
            const list = await repository.findAll();
            return list;
        } catch (err) {
            console.log(err);
        }
    }
}