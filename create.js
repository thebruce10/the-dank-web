import db from "siennasql";

db.connect("the-dank-web.db");

// Create users table
db.run(`
    CREATE TABLE USERS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        USERNAME VARCHAR(64) UNIQUE,
        EMAIL VARCHAR(320),
        PASSWORD VARCHAR(128),
        ADMIN BOOLEAN
    );
`);

// Create memes table
db.run(`
    CREATE TABLE MEMES (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        USER_ID INTEGER REFERENCES USERS(ID),
        POSTED TIMESTAMP,
        TITLE VARCHAR(64),
        MEME VARCHAR(1024),
        REPORTED BOOLEAN
    );
`);

// Create meme likes table
db.run(`
    CREATE TABLE MEME_LIKES (
        USER_ID INTEGER REFERENCES USERS(ID),
        MEME_ID INTEGER REFERENCES MEMES(ID),
        PRIMARY KEY (USER_ID, MEME_ID)
    );
`);