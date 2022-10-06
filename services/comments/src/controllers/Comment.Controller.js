import Comment from '../modules/Comment.Model.js';
import createError from 'http-errors';
import {body, validationResult} from "express-validator";


const CommentController = {
    async getAllComments(req, res, next) {
        try {
            const { postID } = req.params;
            const result = await Comment.getAll(postID);
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async findCommentById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await User.findById(id);
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
            const result = await Comment.save(comment);
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteCommentById(req, res, next) {
        try {
            const { commentID, postID } = req.params;
            const result = await Comment.deleteById(commentID, postID);
            if (!result) {
                throw createError(404, 'This comment doesn`t exist');
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
                    body('body', 'Comment body length must be more than 3 characters').isLength({min: 3}),
                ];
            }
        }
    }
}

export default CommentController;