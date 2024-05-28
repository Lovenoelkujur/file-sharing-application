const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const FileModel =  require("../models/file")
const uploadDirectoryPath = path.join(__dirname, "..", "files")

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

// number of Files to store
const upload = multer({
    storage : storage,
}).single("file");

// To Upload File
const uploadFile = async (req, res) => {

    upload(req, res, async (error) => {
        // console.log(req.body);
        if(error){
            console.log("Error While Uploading File !", error);
            return res.status(500).json({
                success : false,
                message : "Something Went Wrong, Please try again after sometime!"
            });
        }
        // Save the File in DB
        // console.log(req.file);
        const newFile = new FileModel({
            originalFilename : req.file.originalname,
            newFilename : req.file.filename,
            path : req.file.path,
        });

        const newlyInsertedFile = await newFile.save();

        console.log("File Uploaded Successfully.");
        res.json({
            success : true,
            message : "File Uploaded Successfully.",
            fileId : newlyInsertedFile._id,
        })
    })
}

// To Generate Unique Link
const generateDynamicLink = async (req, res) => {
    try {
        const fileId = req.params.uuid;
        const file = await FileModel.findById(fileId);
        if(!file){
            return res.status(404).json({
                success : false,
                message : "File with given ID not found!"
            })
        }
        // console.log(fileId);
    
        res.json({
            success : true,
            message : "Generated Link Successfully.",
            resilt : "http://localhost:9000/files/download/" + fileId,
        }) 
    } 
    catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went wrong please try again after sometime."
        })
    }
}

// To Download File
const downloadFile = async (req, res) => {
    try {
        const fileId = req.params.uuid;
        const file = await FileModel.findById(fileId);
        // Check DB have file with Given ID
        if(!file){
            return res.end("File with given ID not found.");
        }
        // To Download
        res.download(file.path, file.originalFilename) 
    } 
    catch (error) {
        res.end("Something went wrong please try again after sometime.");
    }
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

