import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import { uuid } from "uuidv4";

// @config dotenv
dotenv.config();

// @create express app
const app = express();

// @use body-parser
app.use(bodyParser.json())

// @get users
app.get("/api/users", (req, res) => {
    try {
        // @read users from json file
        const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

        // @send users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// @create user
app.post("/api/users", (req, res) => {
    try {
        // @request body
        const body = req.body

        // @read users from json file
        const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

        // @add new user to users
        const newUser = {
            id : users.length + 1,
            uuid : uuid(),
            role : "user",
            ...body
        }
        users.push(newUser);

        // @write users to json file
        fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

        // @send response to client
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// TODO : GET api/users/:uuid 
// TODO : PUT api/users/:uuid
// TODO : DELETE api/users/:uuid

// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));