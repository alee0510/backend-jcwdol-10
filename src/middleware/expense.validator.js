import expenseSchema from "../helpers/expense.schema.js";

export default async function (req, res, next) {
    try {
        await expenseSchema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
        return
    }
}