import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

// @create connection
const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
})

// @export connection
export default connection