const XLSX = require("node-xlsx");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

module.exports = (fieldName) => {

    return [
        upload.single(fieldName),
        (req, res, next) => {
            if (req.file) {
                req.workbook = XLSX.parse(req.file.buffer);
                next();
            } else {
                res.status(400).send({ err: "Missing file to process" });
            }
        }
    ];
}