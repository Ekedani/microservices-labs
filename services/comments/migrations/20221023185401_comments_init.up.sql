CREATE TABLE IF NOT EXISTS comments
(
    id VARCHAR (512) PRIMARY KEY,
    body VARCHAR (512) UNIQUE NOT NULL,
    post_id INT NOT NULL,
    author_id UUID NOT NULL
    CONSTRAINT fk_posts
        FOREIGN KEY(posts_id) 
            REFERENCES posts(id)
);