const multer = require("multer");
const uuid = require("uuid").v4;

const path = "data/products/images";

module.exports = {
    _upload: multer({
        storage: multer.diskStorage({
            destination: path,
            filename: (request, file, callback) => {
                callback(null, `${uuid()}-${file.originalname}`);
            }
        })
    }),
    get upload () { return this._upload.single("image"); }
}