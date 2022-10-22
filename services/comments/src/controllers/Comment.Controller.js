import Comment from '../models/Comment.Model.js';
import createError from 'http-errors';
import { body, validationResult } from "express-validator";


const CommentController = {
    async getAllComments(req, res, next) {
        try {
            const { post_id } = req.params;
            const result = await Comment.findAll({where: {post_id}});
            res.send({ comments: result });
        } catch (err) {
            next(err);
        }
    },

    async findCommentById(req, res, next) {
        try {
            const { post_id } = req.params;
            const result = await Comment.findByPk(post_id);
            if (!result) {
                throw createError(404, 'This comment doesn`t exist');
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async addComment(req, res, next) {
        try {
            const comment = new Comment(req.params)
            const result = await comment.save();
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteCommentById(req, res, next) {
        try {
            const { id } = req.params;
            const isDeleted = await Comment.destroy({where: {id}});
            if (!isDeleted) {
                throw createError(404, 'This comment doesn`t exist');
            }
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
    validate(method) {
        switch (method) {
            case 'Post': {
                return [
                    body('text', 'Comment body length must be more than 3 characters').isLength({min: 3}),
                ];
            }
        }
    }
}

export default CommentController;