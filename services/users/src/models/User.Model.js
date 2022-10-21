import {DataTypes, Sequelize} from 'sequelize';
import config from "../../database/config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect
});

const User = sequelize.define('User', {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [['admin', 'user']]
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default User;
