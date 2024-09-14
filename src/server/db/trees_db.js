const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT;

const createTree = async ({ treeName, location }) => {
    const SQL = /* sql */ `
    INSERT INTO trees(treeName, location)
    VALUES($1, $2)
    RETURNING *
    `;
    const response = await db.query(SQL, [treeName, location]);
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

const deleteReview = async ({ user_id, id }) => {
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

const deleteComment = async ({ review_id, id }) => {
    const SQL = /* sql */ `
    DELETE FROM comments
    WHERE review_id=$1 AND id=$2
    `;
    await db.query(SQL, [review_id, id])
}



const getAllTrees = async () => {
    const SQL = /* sql */ `
    SELECT *
    FROM trees
    `;
    const response = await db.query(SQL);
    return response.rows;
};

const fetchReviews = async (user_id) => {
    const SQL = /* sql */ `
    SELECT *
    FROM reviews
    WHERE user_id = $1
    `;
    const response = await db.query(SQL, [user_id]);
    return response.rows;
};

const fetchComments = async (review_id) => {
    const SQL = /* sql */ `
    SELECT *
    FROM comments
    WHERE user_id = $1
    `;
    const response = await db.query(SQL, [review_id]);
};

const getTreeById = async (id) => {
    try {
        const { rows: [tree] } = await db.query(`
        SELECT *
        FROM trees
        WHERE id=$1;`, [id]);

        if (!tree) {
            return null;
        }
        return tree;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createTree,
    createReview,
    editReview,
    deleteReview,
    createComment,
    editComment,
    deleteComment,
    getAllTrees,
    fetchReviews,
    fetchComments,
    getTreeById
}