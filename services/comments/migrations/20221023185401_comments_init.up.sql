CREATE TABLE IF NOT EXISTS posts
(
    id INT PRIMARY KEY,
    header VARCHAR (256) NOT NULL,
    body VARCHAR NOT NULL,
    post_id INT NOT NULL,
    author_id UUID NOT NULL
    CONSTRAINT fk_users
        FOREIGN KEY(users_id) 
            REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments
(
    id VARCHAR (512) PRIMARY KEY,
    body VARCHAR (512) NOT NULL,
    post_id INT NOT NULL,
    author_id UUID NOT NULL
    CONSTRAINT fk_posts
        FOREIGN KEY(posts_id) 
            REFERENCES posts(id)
);
