const express = require('express')
const usersRouter = express.Router();

const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers
} = require('../db/users');

const jwt = require('jsonwebtoken')

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

usersRouter.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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
            name,
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
        next({ name: error.name,
            message: error.message })
    }
});

usersRouter.get("/me", (req, res, next) => {

    
    try {
        if (!req.user) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'You are not logged in.'
            });
        }
        res.status(200).send({
            message: 'Data successfully retrieved.',
            user: req.user
        });
            
    } catch (error) {
        console.error('Error');
        next({
            name: error.name,
            message: error.message
        });
    }
});

module.exports = usersRouter;