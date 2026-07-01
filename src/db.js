import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");
db.exec(`create table users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username text not null unique,
        password text not null
    )`);

db.exec(`create table todos
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

export default db;
