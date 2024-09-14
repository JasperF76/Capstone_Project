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
    getTreeById
} = require('../db/trees_db')

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

treesRouter.get('/:item_id')

module.exports = treesRouter;