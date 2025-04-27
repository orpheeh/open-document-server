const hbs = require("hbs");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    hbs.registerPartial(
        "layout",
        fs.readFileSync(
            path.join(__dirname, "../../presentation/views/core/layout.hbs"),
            "utf8"
        )
    );

    hbs.registerPartial(
        "config-layout",
        fs.readFileSync(
            path.join(__dirname, "../../presentation/views/core/config-layout.hbs"),
            "utf8"
        )
    );

    hbs.registerPartial(
        "header",
        fs.readFileSync(
            path.join(__dirname, "../../presentation/views/core/header.hbs"),
            "utf8"
        )
    );

    hbs.registerPartial(
        "footer",
        fs.readFileSync(
            path.join(__dirname, "../../presentation/views/core/footer.hbs"),
            "utf8"
        )
    );

    hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    hbs.registerHelper("formatDate", function (options) {
        const d = new Date(options.fn(this));
        return (d.getDate() < 10 ? '0' : '') + d.getDate() + "/" + (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + (d.getHours() < 9 ? '0' : '') + d.getHours() + ":" + (d.getMinutes() < 9 ? '0' : '') + d.getMinutes() + ":" + (d.getSeconds() < 9 ? '0' : '') + d.getSeconds();
    });
}