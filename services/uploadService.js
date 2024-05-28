const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const uploadDirectoryPath = path.join(__dirname, "..", "files");

// console.log(uploadDirectoryPath);

// Storage Path in DB
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, uploadDirectoryPath)
    },
    filename : (req, file, cb) => {
        // console.log(file.originalname);
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename)
    },
});


// Upload Service
const upload = multer({
    storage : storage,
});

module.exports = upload;
