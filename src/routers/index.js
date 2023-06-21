import { Router } from "express";
import expenseValidator from "../middleware/expense.validator.js";

// @create router
const router = Router();

// @controllers
import * as ExpenseControllers from "../controllers/index.js";

// @define routes
router.post("/expense", expenseValidator, ExpenseControllers.createExpense);
router.get("/expense", ExpenseControllers.getAllExpense);
router.get("/expense/total", ExpenseControllers.getTotalExpense);
router.get("/expense/:id", ExpenseControllers.getExpenseById);
router.patch("/expense/:id", ExpenseControllers.updateExpenseById);
router.delete("/expense/:id", ExpenseControllers.deleteExpenseById);

// @export router
export default router;