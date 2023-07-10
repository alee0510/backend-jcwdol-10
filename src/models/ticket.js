import db from "../database/index.js"

// @ticket model
export const Ticket = db.sequelize.define("tickets", {
    id : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : db.Sequelize.STRING,
        allowNull : false,
    },
    description : {
        type : db.Sequelize.STRING,
    },
    date : {
        type : db.Sequelize.DATE,
        allowNull : false,
    },
    location : {
        type : db.Sequelize.STRING,
        allowNull : false,
    },
    price : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
    },
    poster : {
        type : db.Sequelize.STRING,
    },
    stock : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
    },
    status : {
        type : db.Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 1,
    },
})