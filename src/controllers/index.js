import fs from "fs";
import Expense from "../models/expense.js";
import moment from "moment/moment.js";

// @controllers
export const createExpense = async (req, res) => {
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
}

// TODO : do filter on expense data using query parametes with props start, end, and category
// TODO : do sort on expense data using query parametes with props sort [keys] and order [asc, desc]
// TODO : do pagination on expense data using query parametes with props page [1] and limit [10]
export const getAllExpense = async (req, res) => {
    try {
        const expenseData = JSON.parse(fs.readFileSync("./json/expense.json", "utf-8"));
        
        // @check if expense data is empty
        if (expenseData.length === 0) {
            res.status(404).json({ message: "Expense data not found" })
        }

        res.status(200).json(expenseData)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const getExpenseById = async (req, res) => {
    try {
        const expenseData = JSON.parse(fs.readFileSync("./json/expense.json", "utf-8"));
        const expense = expenseData.find(expense => expense.id === req.params.id)

        // @check if expense data is empty
        if (!expense) {
            res.status(404).json({ message: "Expense data not found" })
        }

        res.status(200).json(expense)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const updateExpenseById = async (req, res) => {
    const id = req.params.id;
    try {
        const expenseData = JSON.parse(fs.readFileSync("./json/expense.json", "utf-8"));
        const expenseIndex = expenseData.findIndex(expense => expense.id === id)

        // @check if expense data is empty
        if (expenseIndex === -1) {
            res.status(404).json({ message: "Expense data not found" })
        }

        // @update expense data
        const updatedExpense = Object.assign({}, expenseData[expenseIndex], req.body)
        expenseData[expenseIndex] = updatedExpense;

        // @update expense data into JSON
        const newExpenseData = JSON.stringify(expenseData, null, 4);
        fs.writeFileSync("./json/expense.json", newExpenseData)

        res.status(200).json({ message: "Expense data updated successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const deleteExpenseById = async (req, res) => {
    const id = req.params.id;
    try {
        // @read expense data from JSON
        const expenseData = JSON.parse(fs.readFileSync("./json/expense.json", "utf-8"));

        // @find expense data index
        const expenseIndex = expenseData.findIndex(expense => expense.id === id)

        // @chek if expense data is exist
        if (expenseIndex === -1) {
            res.status(404).json({ message: "Expense data not found" })
        }

        // @delete expense data
        expenseData.splice(expenseIndex, 1)

        // @update expense data into JSON
        const newExpenseData = JSON.stringify(expenseData, null, 4);
        fs.writeFileSync("./json/expense.json", newExpenseData)

        res.status(200).json({ message: "Expense data deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const getTotalExpense = async (req, res) => {
    const { category, start, end } = req.query;
    try {
        // @read expense data from JSON
        const expenseData = JSON.parse(fs.readFileSync("./json/expense.json", "utf-8"));

        // @create copy of expense data
        let filteredData = [...expenseData]

        // @filter by date
        if (start && end) {
            filteredData = filteredData.filter(expense => moment(expense.date).isBetween(start, end, "day", "[]"))
        }

        // @filter by category
        if (category) {
            // @expect category with multiple words, example: "Food,Drink"
            const categoryArray = category.split(",")
            filteredData = filteredData.filter(expense => categoryArray.includes(expense.category?.toLowerCase()))
        }

        // @calculate total expense
        const totalExpense = filteredData.reduce((acc, curr) => acc + curr.amount, 0)
        res.status(200).json({ totalExpense })

        // @check if category is exist
        // if (category) {
        //     // @expect category with multiple words, example: "Food,Drink"
        //     const categoryArray = category.split(",")
        //     const filteredData = expenseData.filter(expense => categoryArray.includes(expense.category?.toLowerCase()))

        //     // @calculate total expense
        //     const totalExpense = filteredData.reduce((acc, curr) => acc + curr.amount, 0)
        //     res.status(200).json({ totalExpense })
        // }

        // @check if start and end is exist
        // if (start && end) {
        //     const filteredData = expenseData.filter(expense => moment(expense.date).isBetween(start, end, "day", "[]"))

        //     // @calculate total expense
        //     const totalExpense = filteredData.reduce((acc, curr) => acc + curr.amount, 0)
        //     res.status(200).json({ totalExpense })
        // }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}