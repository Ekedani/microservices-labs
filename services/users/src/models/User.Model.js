// I'll use Sequelize in the next lab here
import { promises as fs } from "fs";
import { fileURLToPath } from 'url';
import { dirname, resolve } from "path";
import { randomUUID } from 'crypto'
import createError from "http-errors";

// Just temporary, to prove that it works (I know it looks awful)
const __filename = fileURLToPath(import.meta.url);
const dataPath = process.env.DATA_PATH ?? resolve(dirname(__filename), "../../data.json")

class User {
    constructor({ role, email, password, username, tag} = {
        role: null,
        email: null,
        password: null,
        username: null,
        tag: null
    }) {
        this.id = randomUUID();
        this.role = role;
        this.email = email;
        this.password = password;
        this.username = username;
        this.tag = tag;
    }

    static async save(user) {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const newData = JSON.parse(data);
            newData.users.push(user);
            await fs.writeFile(dataPath, JSON.stringify(newData), 'utf-8')
            return newData.users[newData.users.length - 1];
        } catch (err) {
            createError(500, err.message)
        }
    }

    static async getAll() {
        try {
            const result = await fs.readFile(dataPath, 'utf-8');
            return JSON.parse(result);
        } catch (err) {
            createError(500, err.message)
        }
    }

    static async findById(id) {
        try {
            const data = await fs.readFile(dataPath, 'utf-8')
            const jsonData = JSON.parse(data);
            const index = jsonData.users.map((x) => { return x.id; }).indexOf(id);
            if(index === -1) {
                return null;
            } else {
                return jsonData.users[index];
            }
        } catch (err) {
            createError(500, err.message)
        }
    }

    static async updateById(id, user) {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const newData = JSON.parse(data);
            const index = newData.users.map((x) => {return x.id;}).indexOf(id);
            if(index === -1) {
                return null;
            } else {
                newData.users[index] = {
                    id:  newData.users[index].id,
                    role: user.role ?? newData.users[index].role,
                    email: user.email ?? newData.users[index].email,
                    password: user.password ?? newData.users[index].password,
                    username: user.username ?? newData.users[index].username,
                    tag: user.tag ?? newData.users[index].tag
                };
                await fs.writeFile(dataPath, JSON.stringify(newData), 'utf-8');
                return newData.users[index];
            }
        } catch (err) {
            createError(500, err.message)
        }
    }

    static async deleteById(id) {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const newData = JSON.parse(data);
            const index = newData.users.map((x) => { return x.id; }).indexOf(id);
            if(index === -1) {
                return null;
            } else {
                const result = newData.users[index];
                newData.users.splice(index, 1);
                await fs.writeFile(dataPath, JSON.stringify(newData), 'utf-8')
                return result;
            }
        } catch (err) {
            createError(500, err.message)
        }
    }
}

export default User;
