import db from "./index.js";

// @create user model
const User = db.sequelize.define("users", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull : false
    },
    email: {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    phone : {
        type : db.Sequelize.STRING,
        allowNull : false
    },
    role : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 2
    },
    status : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
    }
})

export default User;