const FileModel =  require("../models/file");
const mailService = require("../services/mailService");
const fileUploadService = require("../services/uploadService");


// To Upload File
const uploadFile = async (req, res) => {
    // number of Files to store
    const upload = fileUploadService.single("file");
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
            result : "http://localhost:9000/files/download/" + fileId,
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
    // console.log(req.body);
    const {fileId, shareTo} = req.body;
    const downloadableLink = "http://localhost:9000/files/download/" + fileId;

    // Send Mail
    const info = await mailService.sendMail({
        from: 'developer@provider.com', // Replace with your email address
        to: shareTo, // Replace with the recipient's email address
        subject: 'New File shared from File-Sharing-Application', // Replace with your desired subject
        // text: 'This is a plain text email body.', // Plain text content
        // or  // HTML content
        html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body{
                            text-align: center;
                        }

                        .download-link {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            text-decoration: none;
                            font-family: Arial, sans-serif;
                            border-radius: 5px;
                        }
                
                        .download-link:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>
                    <h2>Click Download button to download the File.</h2>
                    <a href="${downloadableLink}" class="download-link">Download Now</a>
                </body>
            </html>
        `
    });

    console.log("Email Send Successfully !", info.messageId);

    res.json({
        success : true,
        message : "File Send on Email Successfully."
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

