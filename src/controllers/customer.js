// import db from "../../models";
const customer = require("../../models/customer")

// @get all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await customer?.findAll()

        res.status(200).json({ customers })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

// @get customer by id
// @get customer by name
// @define relation with other table

// @export
module.exports = { getCustomers }