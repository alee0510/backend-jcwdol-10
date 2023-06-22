import connection from "../config/index.js"

// @create database
const db = connection.promise()

// @get all users
export const getUsers = async (req, res) => {
    try {
        const QUERY = "SELECT * FROM users;"
        const [rows, fields] = await db.execute(QUERY)

        res.status(200).json({ users: rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}