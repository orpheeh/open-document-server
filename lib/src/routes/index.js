const express =require("express");

const home = require("./home");

/**
 * @param {express.Express} app 
 */
module.exports = (app) => {

    app.get("/", (req, res) => res.redirect("/home"));
    app.use("/home", home);
    app.use((req, res) => {
        res.render('pages/404.hbs', { title: "Open document server"});
    });
}
