const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
    try {
        let bearerToken = req.query.token;
        if (!bearerToken) {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                return res.status(403).send({ message: "Header invalide. Il manque la directive Authorization Bearer Token" });
            }

            bearerToken = authorization.split("Bearer ")[1];
            if (!bearerToken) {
                return res.status(403).send({ message: "Header invalide. Le format de la directive Authorization Bearer Token est invalide" });
            }
        }

        const baseUrl = process.env.AUTH_BACKEND_URL || process.env.URL + "/allow-all";
        const accountUrl = baseUrl;
        const response = await fetch(accountUrl, {
            headers: {
                "Authorization": "Bearer " + bearerToken
            }
        });
        if (response.status == 200) {
            req.authUser = await response.json();
            return next();
        } else {
            return res.status(401).send({ message: response.statusText });
        }

    } catch (err) {
        res.status(500).send({ err: err.toString() });
    }
}