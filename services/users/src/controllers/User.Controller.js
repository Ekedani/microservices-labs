import User from '../models/User.Model.js';
import createError from 'http-errors';
import { hash } from 'bcrypt';

const NOT_FOUND_MSG = 'User not found';
const SALT_ROUNDS = process.env.SALT_ROUNDS ?? 10;

const UserController = {
    async getAllUsers(req, res, next) {
        try {
            const result = await User.getAll();
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async findUserById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await User.findById(id);
            if (!result) {
                throw createError(404, NOT_FOUND_MSG);
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async createUser(req, res, next) {
        try {
            const password = await hash(req.body.password, SALT_ROUNDS);
            const user = new User({
                role: req.body.role,
                email: req.body.email,
                password,
                username: req.body.username,
                tag: req.body.tag
            });
            const result = User.save(user);
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteUserById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await User.deleteById(id);
            if (!result) {
                throw createError(404, NOT_FOUND_MSG);
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async updateUserById(req, res, next) {
        try {
            const { id } = req.params;
            let password;
            if(req.body.password) {
                password = await hash(req.body.password, SALT_ROUNDS);
            }
            const user = new User({
                role: req.body.role,
                email: req.body.email,
                password,
                username: req.body.username,
                tag: req.body.tag
            });
            const result = await User.updateById(id, user);
            if (!result) {
                throw createError(404, NOT_FOUND_MSG);
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
