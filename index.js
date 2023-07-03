// import express from "express";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import requestLogger from "./src/middleware/logger.js"

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const requestLogger = require("./src/middleware/logger.js")

// @config dotenv
dotenv.config();

// @create express app
const app = express();

// @use body-parser
app.use(bodyParser.json())
// app.use(requestLogger)

// @connect to database
// const connection = require("./src/models/index.js");
// connection.connect((err) => {
//     if (err) return console.error(err);
//     console.log("Database connected");
// })

// @root route
app.get("/", (req, res) => {
    res.status(200).send("<h1>Wellcome to my REST-API</h1>")
})

// @use router
// import ExpenseRoutes from "./src/routers/index.js";
// import UserRoutes from "./src/routers/users.js";
// import CustomerRoutes from "./src/routers/customer.js"

// const ExpenseRoutes = require("./src/routers/index.js");
// const UserRoutes = require("./src/routers/users.js");
const CustomerRoutes = require("./src/routers/customer.js")

// app.use("/api", ExpenseRoutes);
// app.use("/api", UserRoutes);
app.use("/api", CustomerRoutes);

// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));