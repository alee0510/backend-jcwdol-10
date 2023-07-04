import { Router } from "express"
import verifyJWTToken from "../../middleware/token.verify.js"

// @import the controller
import * as AuthControllers from "./index.js"

// @define routes
const router = Router()
router.post("/register", AuthControllers.register)
router.post("/login", AuthControllers.login)
router.get("/users", verifyJWTToken, AuthControllers.getUsers)

export default router
