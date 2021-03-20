//including headers
const multer = require("multer");
const path = require("path")

//create storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/upload"))
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

// file filter for Upload Image
function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        return cb(null, true)
    }
    cb('Type file is not image', false)
}

//create upload for upload file
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


module.exports = upload