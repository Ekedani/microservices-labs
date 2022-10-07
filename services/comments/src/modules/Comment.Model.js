import { promises as fs } from "fs";
import { fileURLToPath } from 'url';
import { dirname, resolve } from "path";
import { randomUUID } from 'crypto'
import createError from "http-errors";

const __filename = fileURLToPath(import.meta.url);
const dataPath = process.env.DATA_PATH ?? resolve(dirname(__filename), "../../data.json")

class Comment {
    constructor({ postID, authorID, text } = {
        postID: null,
        authorID: null,
        text: null,
        createdAt: null
    }) {
        this.id = randomUUID();
        this.postID = postID;
        this.authorID = authorID;
        this.text = text;
        this.createdAt = Date.now();
    }

    static async save(comment) {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const newData = JSON.parse(data);
            newData.comments.push(comment);
            await fs.writeFile(dataPath, JSON.stringify(newData), 'utf-8')
            return newData.comments[newData.comments.length - 1];
        } catch (err) {
            createError(500, err.message)
        }
    }

    static async getAll(postID) {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const comments = JSON.parse(data).comments.filter(elem => elem.postID === postID);
            return {comments};
        } catch (err) {
            createError(500, err.message)
        }
    }

    static async deleteById(postID, commentID) {
        try {
            let data = await fs.readFile(dataPath, 'utf-8');
            data = await JSON.parse(data);
            
            const index = data.comments.map(x => x.id).indexOf(commentID);
            if(index === -1) {
                return null;
            }

            const result = data.comments[index];
            data.comments.splice(index, 1);
            await fs.writeFile(dataPath, JSON.stringify(data), 'utf-8')
            return result;
        } catch (err) {
            createError(500, err.message)
        }
    }
}

export default Comment;