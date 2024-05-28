const express = require("express");
const mongoose = require("mongoose");
const fileRoutes = require("./routes/file");

const PORT = 9000;

const app = express();

app.use(express.json());

// DataBase Connection
mongoose
    .connect("mongodb://localhost:27017/filesharingapp")
    .then(() => console.log("DB Connection Established Successfully."))
    .catch((err) => console.log("Error while connecting DB", err))

app.use(fileRoutes)

app.listen(PORT, () => {
    console.log("Server is running at Port", `${PORT}`);
})