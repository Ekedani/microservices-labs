import Comment from '../models/Comment.Model.js';
import createError from 'http-errors';
import fetch from 'node-fetch';

const CommentController = {
    async getAllComments(req, res, next) {
        try {
            const { post_id } = req.params;
            const comments = await Comment.findAll({where: { post_id }});
            const authorIds = new Set(comments.map(x => x.author_id));
            const authors = await Promise.all([...authorIds].map(id => fetch(`http://users-service/api/users/${id}`)));
            comments.forEach(comment => {
                const author = authors.find(x => x.ok && x.body.author_id === comment.author_id);
                if(author){
                    comment.author_username = author.body.username;
                    comment.author_tag = author.body.author_tag;
                }
            });
            res.send({ comments });
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
            const author = await fetch(`http://users-service/api/users/${result.author_id}`);
            if (author.ok) {
                result.author_username = author.body.username;
                result.author_tag = author.body.tag;
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async addComment(req, res, next) {
        try {
            const comment_id = `${Date.now()}_${req.params.post_id}_${req.body.author_id}`;
            const { post_id } = req.params;
            const comment = Comment.build({
                id: comment_id,
                body: req.body.body,
                author_id: req.body.author_id,
                post_id
            });
            const result = await comment.save();
            res.send(result);
        } catch (err) {
            next(err);
        }
    },

    async updateCommentById(req, res, next) {
        try {
            const id = req.params.comment_id;
            const comment = await Comment.findByPk(id);
            if (!comment) {
                throw createError(404, 'This comment doesn`t exist');
            }
            await comment.update({
                body: req.body.body,
            })
            res.send(comment);
        } catch (err) {
            next(err);
        }
    },

    async deleteCommentById(req, res, next) {
        try {
            const { comment_id } = req.params;
            const isDeleted = await Comment.destroy({where: { id: comment_id }});
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