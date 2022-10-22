import {DataTypes, Sequelize} from 'sequelize';
import config from "../../database/config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect
});

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    post_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    tableName: 'comments',
});

export default Comment;
