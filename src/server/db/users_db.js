require('dotenv').config();
const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

// const createUser = async({ name='first last', email, password }) => {
//     const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
//     try {
//         const { rows: [user ] } = await db.query(`
//         INSERT INTO users(name, email, password)
//         VALUES($1, $2, $3)
//         ON CONFLICT (email) DO NOTHING
//         RETURNING *`, [name, email, hashedPassword]);

//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

const createUser = async ({ username, email, password }) => {
    try {
        const SQL = /* sql */ `
    INSERT INTO users(id, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
        const response = await db.query(SQL, [
            uuid.v4(),
            username,
            email,
            await bcrypt.hash(password, 5),
        ]);
        return response.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const createUserAndGenerateToken = async ({ username, password }) => {
    try {
        const user = await createUser({ username, password });
        const token = await jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (err) {
        console.error('Error creating user and generating token:', err);
        throw err;
    }
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
    const token = await jwt.sign({ id: response.rows[0].id }, JWT_SECRET);
    return { token };
};

const findUserWithToken = async (token) => {

    let id;
    try {
        const payload = await jwt.verify(token, JWT_SECRET);
        id = payload.id;
    } catch (ex) {
        console.error('Token verification failed:', ex.message);
        const error = Error('Not authorized');
        error.status = 401;
        throw error;
    }
    const SQL = /* sql */ `
      SELECT id, username 
      FROM users 
      WHERE id=$1;
    `;
    const response = await db.query(SQL, [id]);
    if (!response.rows.length) {
        const error = Error("not authorized");
        error.status = 401;
        throw error;
    }
    return response.rows[0];
};

const getUser = async ({ email, password }) => {
    if (!email || !password) {
        console.error('Missing email or password');
        return null;
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            console.log('User not found');
            return null;
        };
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordsMatch) {
            console.log('Incorrect password');
            return null;
        };
        delete user.password;
        return user;
    } catch (err) {
        console.error('Error during user authentication', err);
        throw err;
    }
};

const getUserByEmail = async (email) => {
    try {
        const { rows: [user] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [email]);

        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        throw err;
    }
};

const getReviewsByUserId = async (userId) => {
    try {
        console.log("Querying reviews for user_id:", userId);
        const reviews = await db.query(`
        SELECT reviews.*, trees.treeName, trees.location, trees.description
        FROM reviews
        JOIN trees ON reviews.tree_id = trees.id
        WHERE reviews.user_id=$1;`, [userId]);

        if (!reviews) {
            return null;
        }
        return reviews.rows;
    } catch (err) {
        throw err;
    }
};

const getCommentsByUserId = async (userId) => {
    try {
        console.log("Querying comments for user_id:", userId);
        const comments = await db.query(`
        SELECT * 
        FROM comments
        WHERE user_id=$1;`, [userId]);

        if (!comments) {
            return null;
        }
        return comments.rows;
    } catch (err) {
        throw err;
    }
};

const getAllUsers = async () => {
    const SQL = /* sql */ `
    SELECT id, username
    FROM users
    `;
    const response = await db.query(SQL);
    return response.rows;
};



module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    getReviewsByUserId,
    getCommentsByUserId,
    createUserAndGenerateToken,
    findUserWithToken,
    authenticate
};