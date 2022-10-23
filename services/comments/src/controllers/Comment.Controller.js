import Comment from '../models/Comment.Model.js';
import createError from 'http-errors';

const CommentController = {
    async getAllComments(req, res, next) {
        try {
            const { post_id } = req.params;
            const result = await Comment.findAll({where: { post_id }});
            res.send({ comments: result });
        } catch (err) {
            next(err);
        }
    },

    async findCommentById(req, res, next) {
        try {
            const { comment_id } = req.params;
            const result = await Comment.findByPk(comment_id);
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
            const comment_id = `${Date.now()}_${req.params.post_id}_${req.params.author_id}`;
            const comment = Comment.build({
                id: comment_id,
                body: req.body.body,
                author_id: req.body.author_id,
                post_id: req.body.post_id
            });
            const result = await comment.save();
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async deleteCommentById(req, res, next) {
        try {
            const { comment_id } = req.params;
            const isDeleted = await Comment.destroy({where: { comment_id }});
            if (!isDeleted) {
                throw createError(404, 'This comment doesn`t exist');
            }
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
}

export default CommentController;