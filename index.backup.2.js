import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// @config dotenv
dotenv.config();

// @create express app
const app = express();

// @use body-parser
app.use(bodyParser.json())

// @resource
const database = [
    {
        id: 1,
        name: "John Doe",
        birtdate : "1990-01-01",
        gender : "male"
    }
]

// @todo list
const TODO = [
    {
        id : 1,
        title : "Learn Express",
        isDone : false
    }
]
// create todo list
// mark todo list as done
// delete todo list
// edit todo list

// @create a route
app.get("/", (req, res) => {
    res.status(200).send("<h1>Express server is running</h1>")
})

// @handler basic CRUD for database, with base route /api/users
app.get("/api/users", (req, res) => {
    res.status(200).json(database)
})

app.post("/api/users", (req, res) => {
    const body = req.body

    // @create user
    database.push({...body, id: database.length + 1})

    // @send response to client
    res.status(201).json(database)
})

app.put("/api/users/:id", (req, res) => {
    const body = req.body
    const id = req.params.id

    // @update user
    database[id - 1] = {...body, id: id}

    // @send response to client
    res.status(200).json(database)
})

app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id

    // @delete user
    database.splice(id - 1, 1)

    // @send response to client
    res.status(200).json(database)
})

// @handler basic CRUD for todo list, with base route /api/todo
app.get("/api/todo", (req, res) => {
    res.status(200).json(TODO)
})

app.post("/api/todo", (req, res) => {
    const body = req.body

    // @create todo
    TODO.push({...body, id: TODO.length + 1})

    // @send response to client
    res.status(201).json(TODO)
})

app.put("/api/todo/:id", (req, res) => {
    const isDone = req.body?.isDone
    const id = req.params.id

    // @update todo
    TODO[id - 1] = {...body, isDone}

    // @send response to client
    res.status(200).json(TODO)
})

app.delete("/api/todo/:id", (req, res) => {
    const id = req.params.id

    // @delete todo
    TODO.splice(id - 1, 1)

    // @send response to client
    res.status(200).json(TODO)
})

// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));