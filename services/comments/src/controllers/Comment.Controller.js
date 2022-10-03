import Comment from '../models/Comment.Model.js';
import createError from 'http-errors';

const NOT_FOUND_MSG = 'User not found';

const UserController = {
    async getAllUsers(req, res, next) {
        try {
            const { postID } = req.params;
            const result = await Comment.getAll(postID);
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
                throw createError(404, NOT_FOUND_MSG);
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

}

export default UserController;