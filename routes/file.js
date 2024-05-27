const express = require("express");
const fileController = require("../controllers/file")

const router = express.Router();

// Post
router.post("/api/files/", fileController.uploadFile)

// Get (userID)
router.get("/files/:uuid", fileController.generateDynamicLink)

// Get (Download)
router.get("/files/download/:uuid", fileController.downloadFile)

// Post (Send File)
router.post("/api/files/send", fileController.sendFile)

module.exports = router;