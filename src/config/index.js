import dotenv from "dotenv";
dotenv.config();

// @create db configuration
const db_config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
}

// @export all envirotnment variable
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  
export default db_config[process.env.NODE_ENV || 'development']