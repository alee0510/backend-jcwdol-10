import { Router } from "express"
import { verifyUser } from "../../middlewares/index.js"
// @import the controller
import * as AuthControllers from "./index.js"

// @define routes
const router = Router()
router.post("/register", AuthControllers.register)
router.post("/login", AuthControllers.login)
router.get("/verify/:token", AuthControllers.verify)
router.delete("/account", verifyUser, AuthControllers.deleteAccount)

export default router
