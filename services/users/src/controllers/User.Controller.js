import User from '../models/User.Model.js';
import createError from 'http-errors';
import {hash} from 'bcrypt';
import {body, validationResult} from "express-validator";

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
            const {id} = req.params;
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array().map((x) => {
                    return createError(400, x.msg);
                })
            }
            const password = await hash(req.body.password, SALT_ROUNDS);
            const user = new User({
                role: req.body.role,
                email: req.body.email,
                password,
                username: req.body.username,
                tag: req.body.tag
            });
            const result = await User.save(user);
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteUserById(req, res, next) {
        try {
            const {id} = req.params;
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
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw errors.array().map((x) => {
                    return createError(400, x.msg);
                })
            }
            const {id} = req.params;
            let password;
            if (req.body.password) {
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
    },

    validate(method) {
        switch (method) {
            case 'Post': {
                return [
                    body('role', 'Role doesnt exists').isIn(['admin', 'user']),
                    body('email', 'Invalid email').isEmail(),
                    body('password', 'Password length must be from 8 to 30 characters').isLength({min: 8, max: 30}),
                    body('username', 'Username length must be from 3 to 15 characters').isLength({min: 3, max: 15}),
                    body('tag', 'Tag length must be from 3 to 15 characters').isLength({min: 3, max: 15})
                ];
            }
            case 'Patch': {
                return [
                    body('role', 'Role doesnt exists').optional().isIn(['admin', 'user']),
                    body('email', 'Invalid email').optional().isEmail(),
                    body('password', 'Password length must be from 8 to 30 characters').optional().isLength({
                        min: 8,
                        max: 30
                    }),
                    body('username', 'Username length must be from 3 to 15 characters').optional().isLength({
                        min: 3,
                        max: 15
                    }),
                    body('tag', 'Tag length must be from 3 to 15 characters').optional().isLength({min: 3, max: 15})
                ];
            }
        }
    }
}

export default UserController;
