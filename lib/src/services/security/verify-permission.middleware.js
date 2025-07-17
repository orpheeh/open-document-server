
module.exports = async (req, res, next) => {
    try {

        if (!req.authUser) {
            return res.status(401).send({ message: "Information de l'utilisateur connecté introuvable !" });
        }
        if (!req.authUser.account) {
            return res.status(400).send({ message: "Compte utilisateur de session invalide. Il manque le champ account" });
        }
        const permissions = req.authUser.account.authorities;
        req.authPermissions = permissions;
        return next();

    } catch (err) {
        res.status(500).send({ err: err.toString() });
    }
}