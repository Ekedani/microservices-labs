import Comment from '../modules/Comment.Model.js';
import createError from 'http-errors';
import { body, validationResult } from "express-validator";


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

    async addComment(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array().map((x) => {
                    return createError(400, x.msg);
                })
            }
            const { postID } = req.params;
            const comment = new Comment({
                postID,
                authorID: req.body.authorID, // Temp solution
                text: req.body.text
            })
            const result = await Comment.save(comment);
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteCommentById(req, res, next) {
        try {
            const { id, postID } = req.params;
            const result = await Comment.deleteById(postID, id);
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
                    body('text', 'Comment body length must be more than 3 characters').isLength({min: 3}),
                ];
            }
        }
    }
}

export default CommentController;