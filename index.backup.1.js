// @import moduel
// const http = require("http")
import http from "http"

// @database
const database = [
    {
        id: 1,
        name: "John",
        birthday: "1990-01-01",
        email: "john@gmail.com"
    }
]

// @request url
// GET : http://localhost:2000/ -> "Welcome to my REST_API."
// GET : http://localhost:2000/api/users -> database
// POST : http://localhost:2000/api/users -> create user
// PUT : http://localhost:2000/api/users/1 -> update user
// DELETE : http://localhost:2000/api/users/1 -> delete user

// @HTTP Method
// GET : Read
// POST : Create
// PUT/PATCH : Update
// DELETE : Delete

// @createServer
const server = http.createServer((req, res) => {
    // console.log("Request received.", req.url, req.method, req.headers)
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end("Welcome to my REST_API.")
    }

    // @get users
    if (req.url === "/api/users" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(database))
    }

    // @create user
    if (req.url === "/api/users" && req.method === "POST") {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            const { name, birthday, email } = JSON.parse(body)
            database.push({
                id: database.length + 1,
                name,
                birthday,
                email
            })

            // @create client
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end(JSON.stringify(database))
        })
    }

    // @update user
    if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split("/")[3]
        let body = ""
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            const { name, birthday, email } = JSON.parse(body)
            database[id - 1] = {
                id: Number(id),
                name,
                birthday,
                email
            }

            // @update client
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(database))
        })
    }

    // @delete user
    if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split("/")[3]
        database.splice(id - 1, 1)

        // @send response to client
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(database))
    }
    
})

// @listen
const PORT = 2000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))