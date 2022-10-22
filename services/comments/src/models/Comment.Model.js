import {DataTypes, Sequelize} from 'sequelize';
import config from "../../database/config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect
});


const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.STRING(512),
        allowNull: false,
        primaryKey: true
    },
    body: {
        type: DataTypes.STRING(512),
        allowNull: false,
        validate: {
            len: {
                args: [5, 512],
                msg: 'Comment must be between 5 and 512 characters length'
            }
        }
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
    tableName: 'users',
    timestamps: false
});

export default Comment;
