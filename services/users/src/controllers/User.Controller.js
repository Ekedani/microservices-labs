import User from '../models/User.Model.js';
import createError from 'http-errors';
import {ValidationError} from "sequelize";

const NOT_FOUND_MSG = 'User not found';

const UserController = {
    async getAllUsers(req, res, next) {
        try {
            const result = await User.findAll();
            res.send({users: result});
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
            const user = User.build({
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                tag: req.body.tag
            });
            const result = await user.save();
            res.send(result);
        } catch (err) {
            if (err instanceof ValidationError) {
                err = err.errors.map(x => createError(400, x.message))
            }
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
            const {id} = req.params;
            const result = await User.update({
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
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
    }
}

export default UserController;
