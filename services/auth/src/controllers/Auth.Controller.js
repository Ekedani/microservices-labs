import bcrypt from "bcrypt";
import ValidationError from 'sequelize'
import createError from "http-errors";
import User from "../models/User.Model.js";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;
const AuthController = {
    async register(req, res, next) {
        try {
            const user = User.build({
                role: req.body.role,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                tag: req.body.tag
            });
            const result = await user.save();
            const userTokenData = {
                id: result.id,
                role: result.role,
                email: result.email,
                username: result.username,
                tag: result.tag
            };
            const token = jwt.sign({user: userTokenData}, JWT_SECRET, {
                expiresIn: '1h'
            });
            res.send({token});
        } catch (err) {
            if (err instanceof ValidationError) {
                err = err.errors.map(x => createError(400, x.message))
            }
            next(err);
        }
    },
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}});
            if (!user) {
                throw createError(400, 'This account does not exist');
            }
            const comparisonResult = await bcrypt.compare(password, user.password);
            if (!comparisonResult) {
                throw createError(400, 'Account or password is incorrect');
            }

            const userTokenData = {
                id: user.id,
                role: user.role,
                email: user.email,
                username: user.username,
                tag: user.tag
            };
            const token = jwt.sign({user: userTokenData}, JWT_SECRET, {
                expiresIn: '1h'
            });
            res.send({token});
        } catch (err) {
            next(err);
        }
    }
};

export default AuthController;