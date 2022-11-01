CREATE TABLE IF NOT EXISTS Posts
(
    id int PRIMARY KEY,
    header VARCHAR(256) NOT NULL,
    body VARCHAR(1024) NOT NULL,
    author_id VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS comments
(
    id VARCHAR (512) PRIMARY KEY,
    body VARCHAR (512) UNIQUE NOT NULL,
    post_id INT NOT NULL,
    author_id UUID NOT NULL,
    CONSTRAINT fk_posts
    FOREIGN KEY(post_id) REFERENCES Posts(id)
);