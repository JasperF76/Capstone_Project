// routes to add: 
// GET /api/trees
// GET /api/trees/:item_id
// GET /api/trees/:item_id/reviews
// GET /api/trees/:item_id/reviews/:review_id
// POST /api/trees/:item_id/reviews 🔒 
// POST /api/trees/:item_id/reviews/:review_id/comments

const express = require('express');
const treesRouter = express.Router();

const {
    getAllTrees,
    getAllReviews,
    getTreeById,
    createReview,
    createComment
} = require('../db/trees_db');
const { findUserWithToken } = require('../db/users_db');

// const isLoggedIn = async (req, res, next) => {
//     try {
//       req.user = await findUserWithToken(req.headers.authorization);
//       next();
//     } catch (ex) {
//       next(ex);
//     }
//   };

// This route returns all trees.
treesRouter.get('/', async (req, res, next) => {
    try {
        const trees = await getAllTrees();

        if (trees.length === 0) {
            return res.status(204).send({
                message: 'No trees found'
            });
        }

        res.status(200).send({
            trees
        });
    } catch (error) {
        console.error('Error fetching trees:', error);

        next({
            name: error.name,
            message: error.message,
            status: 500
        });
    }
});

// This route returns all the reviews for a single tree.
treesRouter.get('/:id/reviews', async (req, res, next) => {
    const { id } = req.params;

    try {
        const reviews = await getAllReviews(id);

        if (reviews.length === 0) {
            return res.status(204).send({
                message: 'No reviews found'
            });
        }

        res.status(200).send({
            reviews
        });
    } catch (error) {
        console.error('Error fetching trees:', error);

        next({
            name: error.name,
            message: error.message,
            status: 500
        });
    }
});

// This route returns all table data for a single tree.
treesRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const tree = await getTreeById(id);

        if (!tree) {
            return res.status(404).send({
                message: 'Tree not found'
            });
        }

        res.status(200).send({
            tree
        });
    } catch (error) {
        console.error('Error fetching tree:', error);

        next({
            name: error.name,
            message: error.message,
            status: 500
        });
    }
});

// This route allows a user to post a review.
treesRouter.post('/:id/reviews', async (req, res, next) => {
    const { id } = req.params;
    console.log(req.body, "req.body");
    console.log(id, "id");
    console.log(req.user, "req.user");


    try {
        if (!req.user.id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }
        // console.log(req.body.text, "req.body.text");

        const createdReview = await createReview({
            text: req.body.text,
            rating: req.body.rating,
            user_id: req.user.id,
            tree_id: id,
        });
        res.status(201).send(createdReview);
    } catch (ex) {
        next(ex);
    }
});

// This route allows a user to post a comment on a review.
treesRouter.post('/:tree_id/reviews/:review_id/comments', async (req, res, next) => {
    const { review_id } = req.params;

    try {
        if (!req.user.id) {
            const error = Error('Register to create an account.');
            error.status = 401;
            throw error;
        }

        const createdComment = await createComment({
            text: req.body.text,
            review_id: review_id,
            user_id: req.user.id,
        });

        res.status(201).send(createdComment);
    } catch (error) {
        next(error);
    }
});

module.exports = treesRouter;