import {DataTypes, Sequelize} from 'sequelize';
import {hashSync} from 'bcrypt';
import config from "../../database/config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect
});

const User = sequelize.define('User', {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['admin', 'user']],
                msg: 'Role doesn\'t exist'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Invalid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 30],
                msg: 'Password must be between 8 and 30 characters in length'
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Username must be between 3 and 30 characters in length'
            }
        }
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [3, 15],
                msg: 'Tag must be between 3 and 30 characters in length'
            },
            isAlphanumeric: {
                msg: 'Tag can contain only alphanumeric characters'
            }
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.afterValidate(user => {
    const SALT_ROUNDS = 10;
    user.password = hashSync(user.password, SALT_ROUNDS);
});

export default User;