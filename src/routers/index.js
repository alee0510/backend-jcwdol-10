import { Router } from "express";

// @create router
const router = Router();

// @controllers
import * as ExpenseControllers from "../controllers/index.js";

// @define routes
router.post("/expense", ExpenseControllers.createExpense);
router.get("/expense", ExpenseControllers.getAllExpense);
router.get("/expense/:id", ExpenseControllers.getExpenseById);

// @export router
export default router;