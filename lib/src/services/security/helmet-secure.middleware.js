const helmet = require("helmet");

module.exports = helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "unpkg.com", "'unsafe-inline'", "analytics.aninf.ga", "threejs.org", "cdn.jsdelivr.net", "localhost", "open.onlyoffice.norlib.xyz"],
            "connect-src": ["'self'", "analytics.aninf.ga", "localhost:3000"],
            "frame-src": ["'self'", "*.youtube.com", "open.onlyoffice.norlib.xyz"],
            "img-src": ["'self'", "localhost:3000", "images.unsplash.com"],
            "default-src": ["'self'", "localhost:3000"]
        }
    }
})