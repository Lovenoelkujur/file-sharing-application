const express = require("express");
const fileRoutes = require("./routes/file") 

const PORT = 9000;

const app = express();

app.use(fileRoutes)

app.listen(PORT, () => {
    console.log("Server is running at Port", `${PORT}`);
})