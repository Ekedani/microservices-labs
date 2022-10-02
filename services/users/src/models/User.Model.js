// I'll use Sequelize in the next lab here

// Just temporary, to prove that it works
import { randomUUID } from 'crypto'
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

    async save(user) {
        try {

        } catch (err) {

        }
    }

    async getAll() {
        try {

        } catch (err) {

        }
    }

    async findById(id) {
        try {

        } catch (err) {

        }
    }

    async updateById(id, user) {
        try {

        } catch (err) {

        }
    }

    async deleteById(id) {
        try {

        } catch (err) {

        }
    }
}

export default User;
