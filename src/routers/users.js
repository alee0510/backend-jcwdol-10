import { Router } from "express";

// @create router
const router = Router();

// @import controller
import * as UserController from "../controllers/users.js";

// @routes
router.get("/users", UserController.getUsers);

// @export router
export default router;