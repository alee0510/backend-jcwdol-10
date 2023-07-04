import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import requestLogger from "./src/middleware/logger.js"

// @config dotenv
dotenv.config();

// @create express app
const app = express();

// @use body-parser
app.use(bodyParser.json())
app.use(requestLogger)

// @root route
app.get("/", (req, res) => {
    res.status(200).send("<h1>Wellcome to my REST-API</h1>")
})

// @use router


// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));