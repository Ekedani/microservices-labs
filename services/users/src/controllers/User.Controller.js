import User from '../models/User.Model.js';
import createError from 'http-errors';
import {ValidationError} from "sequelize";
import {KafkaClient, HighLevelProducer} from 'kafka-node';

const kafkaClient = new KafkaClient({kafkaHost: `${process.env.KAFKA_HOST}:9092`});
const kafkaProducer = new HighLevelProducer(kafkaClient);
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
            kafkaProducer.send([{
                topic: 'users',
                messages: JSON.stringify({event: 'delete', user_id: id})
            }], (err, data) => console.log(data));
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },

    async updateUserById(req, res, next) {
        try {
            const {id} = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                throw createError(404, NOT_FOUND_MSG);
            }
            await user.update({
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                tag: req.body.tag
            })
            res.send(user);
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
