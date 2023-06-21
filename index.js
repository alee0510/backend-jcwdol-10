import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import { uuid } from "uuidv4"
import requestLogger from "./src/middleware/logger.js"

// @config dotenv
dotenv.config();

// @create express app
const app = express();

// @use body-parser
app.use(bodyParser.json())
app.use(requestLogger)

// @create data model
class Expense {
    id = uuid()
    date = new Date().toISOString().slice(0, 10)
    constructor(
        _category, 
        _description,
        _amount, 
        _currency = "USD",
        _payment_method = "Cash",
    ) {
        this.category = _category;
        this.description = _description;
        this.amount = _amount;
        this.currency = _currency;
        this.payment_method = _payment_method;
    }
}

// @create expense data
app.post("/api/expense", (req, res) => {
    try {
        const expense = new Expense(
            req.body?.category,
            req.body?.description,
            req.body?.amount,
            req.body?.currency,
            req.body?.payment_method
        )

        // @read expense data from JSON
        const prevExpenseData = JSON.parse(fs.readFileSync("./json/expense.json", "utf-8"));
    
        // @push new expense data into JSON
        prevExpenseData.push(expense)

        // @create expense data into JSON
        const newExpenseData = JSON.stringify(prevExpenseData, null, 4);
        fs.writeFileSync("./json/expense.json", newExpenseData)

        res.status(201).json({ message: "Expense created successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
})

// @TODO: get all expense data
// @TODO : get expense data by id


// @listen to port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));