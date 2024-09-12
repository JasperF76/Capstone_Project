const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL

const db = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const createTables = async () => {
    const SQL = /* sql */ `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS trees;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS comments;

    CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );

    CREATE TABLE trees (
        id UUID PRIMARY KEY,
        treeName VARCHAR(50) UNIQUE NOT NULL,
        location VARCHAR(255) NOT NULL
    );

    CREATE TABLE reviews (
        id UUID PRIMARY KEY,
        text VARCHAR(500),
        rating INTEGER DEFAULT 3 NOT NULL CHECK (rating BETWEEN 1 AND 5),
        user_id UUID REFERENCES users(id) NOT NULL,
        tree_id UUID REFERENCES trees(id) NOT NULL
    );

    CREATE TABLE comments (
        id UUID PRIMARY KEY,
        text VARCHAR(500),
        review_id UUID REFERENCES trees(id) NOT NULL
    );
    `;
    await Client.query(SQL);
};

const createUser = async ({ username, password }) => {
    const SQL = /* sql */ `
    INSERT INTO users(id, username, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const response = await db.query(SQL, [
        uuid.v4(),
        username,
        await bcrypt.hash(password, 5),
    ]);
    return response.rows[0];
};

const createUserAndGenerateToken = async ({ username, password }) => {
    const user = await createUser({ username, password });
    const token = await jwt.sign({ id: user.id }, JWT);
    return { token };
};

const authenticate = async ({ username, password }) => {
    const SQL = /* sql */ `
      SELECT id, username, password 
      FROM users 
      WHERE username=$1;
    `;
    const response = await db.query(SQL, [username]);
    if (
        !response.rows.length ||
        (await bcrypt.compare(password, response.rows[0].password)) === false
    ) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
    }
    const token = await jwt.sign({ id: response.rows[0].id }, JWT);
    return { token };
};

const createTree = async ({ treeName, location }) => {
    const SQL = /* sql */ `
    INSERT INTO trees(id, treeName, location)
    VALUES($1, $2, $3)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), treeName, location]);
    return response.rows[0];
};

const createReview = async ({ text, rating, user_id, tree_id }) => {
    const SQL = /* sql */ `
    INSERT INTO reviews(id, text, rating, user_id, tree_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *    
    `;
    const response = await db.query(SQL, [uuid.v4(), text, rating, user_id, tree_id]);
    return response.rows[0];
};

const editReview = async ({ review_id, new_text, new_rating }) => {
    const SQL = /* sql */ `
    UPDATE reviews
    SET text = new_text
    SET rating = new_rating
    WHERE id = review_id
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), review_id, new_text, new_rating]);
};

const destroyReview = async ({ user_id, id }) => {
    const SQL = /* sql */ `
    DELETE FROM reviews
    WHERE user_id=$1 AND id=$2
    `;
    await db.query(SQL, [user_id, id]);
};

const createComment = async ({ text, review_id }) => {
    const SQL = /* sql */ `
    INSERT INTO comments(id, text, review_id)
    VALUES($1, $2, $3)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), text, review_id]);
    return response.rows[0];
};

const editComment = async ({ comment_id, new_text }) => {
    const SQL = /* sql */ `
    UPDATE comments
    SET text = new_text
    WHERE id = comment_id
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), comment_id, new_text]);
};

const destroyComment = async ({ review_id, id }) => {
    const SQL = /* sql */ `
    DELETE FROM comments
    WHERE review_id=$1 AND id=$2
    `;
    await db.query(SQL, [review_id, id])
}

module.exports = db;
