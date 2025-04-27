const session = require("express-session");
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    const sess = {
        secret: process.env.SESSION_SECRET ||'gdr-session-secret',
        resave: false,
        saveUninitialized: false,
        genid: function (req) {
            return uuidv4();
        },
        cookie: {}
    }
    if (app.get('env') === 'production') {
        app.set('trust proxy', 1);
        sess.cookie.secure = true;
    }
    app.use(session(sess));
}

