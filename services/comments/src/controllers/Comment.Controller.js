import Comment from '../models/Comment.Model.js';
import createError from 'http-errors';
import fetch from 'node-fetch';

const CommentController = {
    async getAllComments(req, res, next) {
        try {
            const { post_id } = req.params;
            const comments = await Comment.findAll({where: { post_id }});
            const authorIds = new Set(comments.map(x => x.author_id));
            const authors = await Promise.all([...authorIds].map(async id => (await fetch(`http://${process.env.USERS_HOST}/api/users/${id}`)).json()));
            const result = comments.map(comment => {
                const author = authors.find(x => x.id === comment.author_id);
                const newComment = {
                    id: comment.id,
                    body: comment.body,
                    post_id: comment.post_id,
                    author: {
                        id: comment.author_id
                    }
                }
                if(author){
                    newComment.author.username = author.username;
                    newComment.author.tag = author.tag;
                }
                return newComment;
            });
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
            const author = await (await fetch(`http://${process.env.USERS_HOST}/api/users/${result.author_id}`)).json();
            res.send(JSON.stringify({
                id: comment_id,
                body: result.body,
                post_id: result.post_id,
                author: {
                    id: result.author_id,
                    username: author.username,
                    tag: author.tag
                }
            }));
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