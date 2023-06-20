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

app.get("/api/users/:uuid", (req, res) => {
    try {
        // @read users from json file
        const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

        // @get user
        const user = users.find(user => user.uuid === req.params.uuid);

        // @if user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // @send user
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}) 

app.put("/api/users/:uuid", (req, res) => {
    try {
        // @request body
        const body = req.body

        // @read users from json file
        const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

        // @get user
        const user = users.find(user => user.uuid === req.params.uuid);

        // @if user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // @update user
        user.name = body.name;
        user.email = body.email;

        // @write users to json file
        fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

        // @send response to client
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

app.delete("/api/users/:uuid", (req, res) => {
    try {
        // @read users from json file
        const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

        // @get user
        const user = users.find(user => user.uuid === req.params.uuid);

        // @if user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // @delete user
        users.splice(users.indexOf(user), 1);

        // @write users to json file
        fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

        // @send response to client
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));