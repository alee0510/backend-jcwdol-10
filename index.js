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

// @connect to database
import connection from "./src/config/index.js";
connection.connect((err) => {
    if (err) return console.error(err);
    console.log("Database connected");
})

// @root route
app.get("/", (req, res) => {
    res.status(200).send("<h1>Wellcome to my REST-API</h1>")
})

// @use router
import ExpenseRoutes from "./src/routers/index.js";
import UserRoutes from "./src/routers/users.js";

app.use("/api", ExpenseRoutes);
app.use("/api", UserRoutes);

// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));