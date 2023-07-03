// import db from ".";

const db = require("../models")

// @define model
const customer = db.sequelize?.define("customer", {
    customerNumber : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    customerName : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    contactLastName : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    contactFirstName : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    phone : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    addressLine1 : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    addressLine2 : {
        type : db.Sequelize.STRING(50)
    },
    city : {
        type : db.Sequelize.STRING(50)
    },
    state : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    postalCode : {
        type : db.Sequelize.STRING(15),
    },
    country : {
        type : db.Sequelize.STRING(50),
        allowNull : false
    },
    salesRepEmployeeNumber : {
        type : db.Sequelize.INTEGER
    },
    creditLimit : {
        type : db.Sequelize.DECIMAL(10,2)
    }
}, {
    timestamps: false
})

// @export
module.exports = customer;