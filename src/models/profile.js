import db from "../database/index.js"

// @profile
export const Profile = db.sequelize.define("profiles", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId : {
        type : db.Sequelize.INTEGER,
        allowNull : false
    },
    genderId : {
        type : db.Sequelize.INTEGER,
    },
    image : {
        type : db.Sequelize.STRING,
    },
    birthdate : {
        type : db.Sequelize.DATE,
    },
    address : {
        type : db.Sequelize.STRING,
    },
    city : {
        type : db.Sequelize.STRING,
    },
    country : {
        type : db.Sequelize.STRING,
    }
}, {
    timestamps : false
})
