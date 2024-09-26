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
    createComment,
    getAllComments,
    createTree,
    deleteTree
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

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.isadmin) {
        next(); 
    } else {
        res.status(403).send({
            name: 'AuthorizationError',
            message: 'You do not have permission to perform this action',
        });
    }
};

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

// This route returns all the reviews for a single tree.
treesRouter.get('/:id/reviews', async (req, res, next) => {
    const { id } = req.params;

    try {
        const reviews = await getAllReviews(id);

        if (! reviews || reviews.length === 0) {
            return res.status(204).send({
                message: 'No reviews found'
            });
        }

        res.status(200).send({
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);

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

    try {
        if (!req.user.id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }

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

// This route returns all the comments for a single review.
treesRouter.get('/:tree_id/reviews/:review_id/comments', async (req, res, next) => {
    const { review_id } = req.params;

    try {
        const comments = await getAllComments(review_id);

        if (!comments || comments.length === 0) {
            return res.status(204).send({
                message: 'No comments found'
            });
        }

        res.status(200).send({
            comments
        });
    } catch (error) {
        console.error('Error fetching comments:', error);

        next({
            name: error.name,
            message: error.message,
            status: 500
        });
    }
});

// This route allows a user to post a comment on a review.
treesRouter.post('/:tree_id/reviews/:review_id/comments', async (req, res, next) => {
    const { review_id } = req.params;

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send({
                message: "You must be logged in to post a comment."
            });
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

// This route allows an admin user to create a new tree entry.
treesRouter.post('/new_tree', requireAdmin, async (req, res, next) => {
    try {
        const {treeName, location, description, image_url} = req.body;

        if (!treeName || !location || !description || !image_url) {
            return res.status(400).send({ message: 'All fields are required.'});
        }

        const createdTree = await createTree({
        treeName,
        location,
        description,
        image_url
    });
    res.status(201).send({ message: 'Tree created successfully.', treeId: createdTree});
    } catch (error) {
        console.error('Error creating tree:', error);
        res.status(500).send({message: 'Error creating tree', error: error.message});
    }
});

treesRouter.delete("/delete/:id", requireAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTree = await deleteTree({ id });
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});

module.exports = treesRouter;