import User from '../models/User.Model.js';
import createError from 'http-errors';
import {hash} from 'bcrypt';
import {body, validationResult} from "express-validator";

const NOT_FOUND_MSG = 'User not found';
const SALT_ROUNDS = process.env.SALT_ROUNDS ?? 10;

const UserController = {
    async getAllUsers(req, res, next) {
        try {
            const result = await User.findAll();
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async findUserById(req, res, next) {
        try {
            const {id} = req.params;
            const result = await User.findByPk(id);
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
            const user = User.build({
                role: req.body.role,
                email: req.body.email,
                password,
                username: req.body.username,
                tag: req.body.tag
            });
            const result = await user.save();
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteUserById(req, res, next) {
        try {
            const {id} = req.params;
            const isDeleted = await User.destroy({where: {id: id}});
            if (!isDeleted) {
                throw createError(404, NOT_FOUND_MSG);
            }
            res.status(204).send();
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
            const result = await User.update({
                role: req.body.role,
                email: req.body.email,
                password,
                username: req.body.username,
                tag: req.body.tag
            }, {
                where: {id: id},
                returning: true,
            });
            if (!result[0]) {
                throw createError(404, NOT_FOUND_MSG);
            }
            res.send(result[1]);
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
