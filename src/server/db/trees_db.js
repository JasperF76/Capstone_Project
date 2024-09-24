const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT;

const createTree = async ({ treeName, location, description, image_url }) => {
    const SQL = /* sql */ `
    INSERT INTO trees(treeName, location, description, image_url)
    VALUES($1, $2, $3, $4)
    RETURNING id;
    `;
    const response = await db.query(SQL, [treeName, location, description, image_url]);
    return response.rows[0].id;
};

const createReview = async ({ text, rating, user_id, tree_id }) => {
    // console.log('Review Data:', { text, rating, user_id, tree_id });

    console.log(rating);

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        throw new Error(`Invalid rating value. Rating must be a number between 1 and 5.${rating}`)
    };
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
    SET text = $2, rating = $3
    WHERE id = $1
    RETURNING *
    `;
    const response = await db.query(SQL, [review_id, new_text, new_rating]);
    return response.rows[0];
};

const deleteReview = async ({ user_id, id }) => {
    
    const SQL = /* sql */ `
    DELETE FROM reviews
    WHERE user_id=$1 AND id=$2
    `;
    await db.query(SQL, [user_id, id]);
};

const createComment = async ({ text, review_id, user_id }) => {
    const SQL = /* sql */ `
    INSERT INTO comments(id, text, review_id, user_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), text, review_id, user_id]);
    return response.rows[0];
};

const editComment = async ({ comment_id, new_text }) => {
    const SQL = /* sql */ `
    UPDATE comments
    SET text = $2
    WHERE id = $1
    RETURNING *
    `;
    const response = await db.query(SQL, [comment_id, new_text]);
    return response.rows[0];
};

const deleteComment = async ({ user_id, id }) => {
    const SQL = /* sql */ `
    DELETE FROM comments
    WHERE user_id=$1 AND id=$2
    `;
    await db.query(SQL, [user_id, id]);
};



const getAllTrees = async () => {
    const SQL = /* sql */ `
    SELECT *
    FROM trees
    `;
    const response = await db.query(SQL);
    return response.rows;
};

const getAllReviews = async (tree_id) => {
    const SQL = /* sql */ `
    SELECT *
    FROM reviews
    WHERE tree_id = $1
    `;
    const response = await db.query(SQL, [tree_id]);
    return response.rows;
};

const getAllComments = async (review_id) => {
    const SQL = /* sql */ `
    SELECT *
    FROM comments
    WHERE review_id = $1
    `;
    const response = await db.query(SQL, [review_id]);
    return response.rows;
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
    getAllReviews,
    getAllComments,
    getTreeById
}