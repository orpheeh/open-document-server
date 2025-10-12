const fetch = require("node-fetch");

module.exports = async (url, bearerToken) => {
    const response = await fetch(url, {
        headers: {
            "Authorization": "Bearer " + bearerToken
        }
    });
    if (response.status == 200) {
        return await response.blob();
    } else {
        return null;
    }
}