import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import { uuid } from "uuidv4"
import requestLogger from "./src/middleware/logger.js"
import apiKeyValidator from "./src/middleware/api.key.validator.js"

// @config dotenv
dotenv.config();

// @create express app
const app = express();

// @use body-parser
app.use(bodyParser.json())
app.use(requestLogger)

// @get users
app.get("/api/users", apiKeyValidator, (req, res) => {
    try {
        // @read users from json file
        const users = JSON.parse(fs.readFileSync("./json/users.json", "utf-8"));

        // @send users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// @request api key
app.post("/api/request-api-key", (req, res) => {
    try {
        // @generate api key with uuid
        const apiKey = uuid();

        // @read api keys from json file
        const apiKeys = JSON.parse(fs.readFileSync("./json/api.keys.json", "utf-8"));

        // @save apiKey data
        apiKeys.push({ key : apiKey, name : req.body.name, email : req.body.email });
        fs.writeFileSync("./json/api.keys.json", JSON.stringify(apiKeys, null, 4));

        // @send apiKey
        res.status(200).json({ key : apiKey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})


// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));