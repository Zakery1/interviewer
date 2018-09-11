DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS selected_questions;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
first_name VARCHAR(64) NOT NULL,
last_name VARCHAR(64) NOT NULL,
username VARCHAR(64) UNIQUE NOT NULL, 
password TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
status TEXT
);


CREATE TABLE questions (
id SERIAL NOT NULL PRIMARY KEY, 
user_id INTEGER REFERENCES users(id), 
question TEXT,
answer TEXT
);

CREATE TABLE selected_questions (
id SERIAL PRIMARY KEY,
saved_question_id INTEGER REFERENCES users(id),
question_id INTEGER REFERENCES questions(id)
);