import User from '../models/User.Model.js';
import createError from 'http-errors';
import { hash } from 'bcrypt';

const NOT_FOUND_MSG = 'User not found';
const SALT_ROUNDS = process.env.SALT_ROUNDS ?? 10;

const UserController = {
    async getAllUsers(req, res, next){
        try {

        } catch (err) {
            next(err);
        }
    },

    async findUserById(req, res, next){
        try {

        } catch (err) {
            next(err);
        }
    },

    async createUser(req, res, next){
        try {

        } catch (err) {
            next(err);
        }
    },

    async deleteUser(req, res, next){
        try {

        } catch (err) {
            next(err);
        }
    },

    async updateUser(req, res, next){
        try {

        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
