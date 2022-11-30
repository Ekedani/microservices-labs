/* TODO: You probably should use composite primary key IMHO;
   TODO: You must specify that author_id is UUID for integration with users services
   TODO: Maybe you should use a more suitable type for body?*/
CREATE TABLE IF NOT EXISTS posts
(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    header VARCHAR(256) NOT NULL,
    body VARCHAR(1024) NOT NULL,
    author_id VARCHAR(256) NOT NULL
);

/* TODO: You must use composite primary key IMHO */
CREATE TABLE IF NOT EXISTS comments
(
    id VARCHAR (512) PRIMARY KEY,
    body VARCHAR (512) NOT NULL,
    post_id INT NOT NULL,
    author_id UUID NOT NULL,
    CONSTRAINT fk_posts
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);