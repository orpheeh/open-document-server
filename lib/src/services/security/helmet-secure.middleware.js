const helmet = require("helmet");

module.exports = helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "unpkg.com", "'unsafe-inline'", "analytics.aninf.ga", "threejs.org", "cdn.jsdelivr.net", "localhost", "open.onlyoffice.norlib.xyz", "54.37.40.17:5300", "54.37.40.17", "onlyoffice1.norlib.xyz"],
            "connect-src": ["'self'", "analytics.aninf.ga", "localhost:3000", "onlyoffice1.norlib.xyz"],
            "frame-src": ["'self'", "*.youtube.com", "open.onlyoffice.norlib.xyz", "54.37.40.17:5300", "54.37.40.17", "onlyoffice1.norlib.xyz"],
            "img-src": ["'self'", "localhost:3000", "images.unsplash.com", "onlyoffice1.norlib.xyz"],
            "default-src": ["'self'", "localhost:3000", "onlyoffice1.norlib.xyz"]
        }
    }
})