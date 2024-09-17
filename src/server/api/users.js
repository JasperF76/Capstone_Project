const express = require('express');
const usersRouter = express.Router();

const {
    createUser,
    getUser,
    getUserByEmail,
    getReviewsByUserId,
    getCommentsByUserId,
    getAllUsers
} = require('../db/users_db');

const jwt = require('jsonwebtoken')

// This route returns all users.
usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();

        if (users.length === 0) {
            return res.status(204).send({
                message: 'No users found'
            });
        }

        res.status(200).send({
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error);

        next({
            name: error.name || 'FetchUsersError',
            message: error.message || 'There was an error fetching users',
            status: 500
        });
    }
});

// This route allows a user to log in with their email and password.
usersRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({ email, password });
        if (user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (err) {
        next(err);
    }
});

// This route allows a user to register an account.
usersRouter.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({
            name: 'MissingFieldsError',
            message: 'Please provide a name, email, and password',
        });
    };

    try {
        const _user = await getUserByEmail(email);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            username,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch (error) {
        next({
            name: error.name,
            message: error.message
        })
    }
});

// This route returns a user's account details.
usersRouter.get("/me", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'You are not logged in.'
            });
        }

        const user = req.user;
        console.log(user);
        
        const userReviews = await getReviewsByUserId(user.id);
        console.log(userReviews);
        
        const userComments = await getCommentsByUserId(user.id);

        const responseData = {
            message: 'Data successfully retrieved.',
            user: {
                id: user.id,
                username: user.username,
                reviews: userReviews,
                comments: userComments
            }
        };

        res.status(200).send(responseData);

    } catch (error) {
        console.error('Error');
        next({
            name: error.name,
            message: error.message
        });
    }
});

module.exports = usersRouter;