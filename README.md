# Labs for the Microservices course (H2'22)
## Our professional team 🐶
- Vladlen Illushenko: [Users microservice](https://github.com/Ekedani/microservices-labs/tree/master/services/users) 
- Oleksii Honchar: [Comments microservice](https://github.com/Ekedani/microservices-labs/tree/master/services/comments) 
- Oleksii Bilko: [Posts microservice](https://github.com/Ekedani/microservices-labs/tree/master/services/posts) 
## How to run? 🚀

1. Open the root directory
2. Run ```sh start.sh``` (or just run commands in the file on by one)
4. Примітки: через особоливості структури проекту було виокристано обидва підходи до автоматизованого запуску міграцій; оскільки збереження чутливих даних по типу JWT_SECRET в kubernetes secrets не є безпечним, в даній лабораторній роботі ми не додали вже реалізований сервсіс auth (лежить у однойменній гілці), а використали тимчасовий клієнт для демонстрації уже готових функцій

## Supported endpoints🧑‍💻
**Users** microservice [DockerHub](https://hub.docker.com/r/ekedani/users) & [Migrations](https://hub.docker.com/r/ekedani/users-migrations):
- `GET /api/users` --- get list of all users
- `GET /api/users/:id` --- get user by id
- `POST /api/users` --- create new user
- `PATCH /api/users/:id` --- edit user
- `DELETE /api/users/:id` --- delete user
*Body consists of next fields: role, email, password, username, tag. Content type must be x-www-form-urlencoded*

**Posts** microservice [DockerHub](https://hub.docker.com/repository/docker/alexeyformicrolab/posts) & [Migrations](https://hub.docker.com/r/ekedani/posts-migrations):
- `GET /api/posts` --- get list of all posts
- `GET /api/posts/:id` --- get user by id
- `POST /api/posts` --- add new post
- `DELETE /api/posts/:id` --- delete post by id

**Comments** microservice ([DockerHub](https://hub.docker.com/r/hxnchar/comments)):
- `GET /api/posts/:id/comments` --- get list of comments to post
- `GET /api/posts/:id/comments/:id` --- get comment by id
- `POST /api/posts/:id/comments` --- add new comment
- `DELETE /api/posts/:id/comments/:id` --- delete comment


**Client** microservice ([DockerHub](https://hub.docker.com/r/hxnchar/client))

# Welcome to Best Blog You`ve Ever Seen🤡