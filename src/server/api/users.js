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

const jwt = require('jsonwebtoken');
const { editReview, editComment, deleteReview, deleteComment } = require('../db/trees_db');

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

        const userReviews = await getReviewsByUserId(user.id);

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

// This route allows a user to edit their review.

usersRouter.put("/:user_id/reviews/:review_id", async (req, res, next) => {
    const { review_id, user_id } = req.params;

    try {
        if (!req.user || req.user.id !== user_id) {
            const error = Error('You cannot edit this review.');
            error.status = 401;
            throw error;
        }

        const editedReview = await editReview({
            review_id: review_id,
            new_text: req.body.text,
            new_rating: req.body.rating,
        });

        if (!editedReview) {
            return res.status(404).send({
                message: 'Review not found or could not be updated.',
            });
        }
        res.status(201).send(editedReview);

    } catch (error) {
        next(error);
    }
});

// This route allows a user to edit their comment.
usersRouter.put("/:user_id/comments/:comment_id", async (req, res, next) => {
    const { comment_id, user_id } = req.params;

    try {
        if (!req.user || req.user.id !== user_id) {
            const error = Error('You cannot edit this comment.');
            error.status = 401;
            throw error;
        }

        const editedComment = await editComment({
            comment_id: comment_id,
            new_text: req.body.text,
        });

        if (!editedComment) {
            return res.status(404).send({
                message: 'Comment not found or could not be updated.',
            });
        }
        res.status(201).send(editedComment);

    } catch (error) {
        next(error);
    }
});

// This route allows a user to delete their review.
usersRouter.delete("/:user_id/reviews/:id", async (req, res, next) => {
    try {
        const { id, user_id } = req.params;
        
        
        if (!req.user || req.user.id !== user_id) {
            const error = Error("Not authorized");
            error.status = 401;
            throw error;
        }
        await deleteReview({
            user_id: user_id,
            id: id,
        });
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});

// This route allows a user to delete their comment.
usersRouter.delete("/:user_id/comments/:id", async (req, res, next) => {
    try {
        const { user_id, id } = req.params;
        
        
        if (!req.user || req.user.id !== user_id) {
            const error = Error("Not authorized");
            error.status = 401;
            throw error;
        }
        await deleteComment({
            user_id: user_id,
            id: id,
        });
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;