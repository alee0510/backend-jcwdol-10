const { Router } = require("express");

// @create router
const router = Router();

// @import controller
// import * as CustomerController from "../controllers/customer.js"
const CustomerController = require("../controllers/customer.js")

// @routes
router.get("/customers", CustomerController.getCustomers);

// @export router
module.exports = router;