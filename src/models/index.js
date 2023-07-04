import Sequelize from "sequelize";
import dotenv from "dotenv";
import process from "process";

dotenv.config();
import Config from "../config/index.js"

// @create suequlize connection
const db = {};
const env = process.env.NODE_ENV || 'development'
const configuration = Config[env];
const sequelize = new Sequelize(configuration.database, configuration.username, configuration.password, configuration);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
