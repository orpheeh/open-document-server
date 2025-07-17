const whitelist = ['172.31.17.167', '172.25.0.1'];

module.exports = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const clientIpV2 = clientIp.split("::ffff:")[1];

    if (whitelist.includes(clientIp) || whitelist.includes(clientIpV2)) {
        next(); // Allow the request
    } else {
        res.status(403).send('Access denied: Your IP is not whitelisted.');
    }
}