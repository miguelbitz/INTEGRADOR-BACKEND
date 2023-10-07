-- Active: 1694811217936@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        nickname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes_comment (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (comment_id) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        post_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE posts;

DROP TABLE users;

DROP TABLE likes_dislikes_comment;

DROP TABLE comments;

INSERT INTO
    users (
        id,
        nickname,
        email,
        password,
        role,
        created_at
    )
VALUES (
        'admin',
        'admin',
        'admin@gmail.com',
        'admin',
        'ADMIN',
        CURRENT_TIMESTAMP
    );

DELETE FROM users WHERE id = 'admin';


INSERT INTO
    comments (
        id,
        post_id,
        user_id,
        content,
        likes,
        dislikes,
        created_at
    )
VALUES (
        '1234',
        '738cdac0-dbd1-438f-8118-af9ff17b6c83',
        '6f3524e6-cb8c-4acd-82d8-2ddb84d57024',
        'funcionou?',
        0,
        0,
        CURRENT_TIMESTAMP
    );

SELECT * FROM comments WHERE (id = 1234);

SELECT * FROM posts;

SELECT * FROM users;

SELECT * FROM likes_dislikes;
