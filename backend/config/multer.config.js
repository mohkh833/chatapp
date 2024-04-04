import multer from "multer";
import path from 'path'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const imageFilter = function(req, file, cb) {
    if(
        file.mimetype == "image/png" || 
        file.mimetype == "image/jpg" || 
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("only png jpg and jpeg format allowed!"))
    }
}

export const upload = multer({storage: storage, fileFilter: imageFilter})

