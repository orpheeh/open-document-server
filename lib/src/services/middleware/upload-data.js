const multer = require('multer');
const path = require('path');

module.exports = () => {
    const storage = multer.diskStorage({
        limits: 1024 * 50,
        destination: function (req, file, cb) {
            cb(null, 'files')
        },
        filename: function (req, file, cb) {
            cb(null, "ods-" + Math.random().toString(36).substring(2, 8) + '' + Math.random().toString(36).substring(2, 8) + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });
    return [
        upload.single('file'),
        async (req, res, next) => {
            if (req.file) {
                const mimetype = req.file.mimetype;
                req.body.url = process.env.STORAGE_URL + '/' + req.file.filename;
                req.body.filetype = mimetype;
                req.body.filename = req.file.filename;
                req.body.filesize = req.file.size;
                req.body.path = req.file.path;
                return next();
            } else {
                res.status(400).send({ err: "Missing file to store" });
            }
        }
    ];
}