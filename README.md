# Labs for the Microservices course (H2'22)
## Our professional team 🐶
- Vladlen Illushenko: [Users microservice](https://github.com/Ekedani/microservices-labs/tree/master/services/users) 
- Oleksii Honchar: [Comments microservice](https://github.com/Ekedani/microservices-labs/tree/master/services/comments) 
- Oleksii Bilko: [Posts microservice](https://github.com/Ekedani/microservices-labs/tree/master/services/posts) 
## How to run? 🚀

1. Open the root directory
2. Run ```sh start.sh``` (or just run commands in the file on by one)
3. Enjoy🍻

## Supported endpoints🧑‍💻
**Users** microservice:
- `GET /api/users` --- get list of all users
- `GET /api/users/:id` --- get user by id
- `POST /api/users` --- create new user
- `PATCH /api/users/:id` --- edit user
- `DELETE /api/users/:id` --- delete user
*Body consists of next fields: role, email, password, username, tag. Content type must be x-www-form-urlencoded*

**Posts** microservice:
- `GET /api/posts` --- get list of all posts
- `GET /api/posts/:id` --- get user by id
- `POST /api/posts` --- add new post
- `DELETE /api/posts/:id` --- delete post by id

**Comments** microservice ([DockerHub](https://hub.docker.com/r/hxnchar/comments)):
- `GET /api/posts/:id/comments` --- get list of comments to post
- `GET /api/posts/:id/comments/:id` --- get comment by id
- `POST /api/posts/:id/comments` --- add new comment
- `DELETE /api/posts/:id/comments/:id` --- delete comment

**Comments migration:** [DockerHub](https://hub.docker.com/r/hxnchar/comments-migration)

**Client** microservice ([DockerHub](https://hub.docker.com/r/hxnchar/client))

# Welcome to Best Blog You`ve Ever Seen🤡