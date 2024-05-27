const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const uploadDirectoryPath = path.join(__dirname, "..", "files")

// console.log(uploadDirectoryPath);

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

const upload = multer({
    storage : storage,
}).single("file");

// To Upload File
const uploadFile = async (req, res) => {

    upload(req, res, (error) => {
        // console.log(req.body);
        if(error){
            console.log("Error While Uploading File !", error);
            return;
        }
        console.log("File Uploaded Successfully.");
        res.json({
            success : true,
            message : "File Uploaded Successfully."
        })
    })
}

// To Generate Unique Link
const generateDynamicLink = async (req, res) => {
    res.json({
        success : true,
        message : "Generated Link Successfully."
    })
}

// To Download File
const downloadFile = async (req, res) => {
    res.json({
        success : true,
        message : "File Downloaded Successfully."
    })
}

// To Send File
const sendFile = async (req, res) => {
    res.json({
        success : true,
        message : "File Send Successfully."
    })
}

// Contain all files
const fileController = {
    uploadFile,
    generateDynamicLink,
    downloadFile,
    sendFile,
}

module.exports = fileController;

