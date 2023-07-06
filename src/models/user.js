import db from "./index.js";

// @create user model
export const User = db.sequelize.define("users", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid: {
        type: db.Sequelize.UUID,
        defaultValue: db.Sequelize.UUIDV4,
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

// @status
export const Status = db.sequelize.define("status", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status : {
        type : db.Sequelize.STRING,
    }
}, {
    timestamps : false
})

// @gender
export const Gender = db.sequelize.define("gender", {
    id : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    gender : {
        type : db.Sequelize.STRING,
    }
}, {
    timestamps : false
})

// @role
export const Role = db.sequelize.define("roles", {
    id : {
        type : db.Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    role : {
        type : db.Sequelize.STRING,
    }
}, {
    timestamps : false
})

// @define relation
User.hasOne(Profile, { foreignKey : "userId" })
Profile.belongsTo(User, { foreignKey : "userId" })
