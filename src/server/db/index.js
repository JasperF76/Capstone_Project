const {
    createTables,
    createUser,
    createUserAndGenerateToken,
    authenticate,
    findUserWithToken,
    createTree,
    createReview,
    editReview,
    deleteReview,
    createComment,
    editComment,
    deleteComment,
    fetchUsers,
    fetchTrees,
    fetchReviews,
    fetchComments,
} = require('./users_db')
const { db } = require('./client')

const express = require("express");
const app = express();
app.use(express.json());

const isLoggedIn = async (req, res, next) => {
    try {
        req.user = await findUserWithToken(req.headers.authorization);
        next();
    } catch (ex) {
        next(ex);
    }
};

// app.post("/api/auth/login", async (req, res, next) => {
//     try {
//         res.send(await authenticate(req.body));
//     } catch (ex) {
//         next(ex);
//     }
// });

// app.post("/api/auth/register", async (req, res, next) => {
//     try {
//         res.send(await createUserAndGenerateToken(req.body));
//     } catch (ex) {
//         next(ex);
//     }
// });

app.get("/api/auth/me", isLoggedIn, (req, res, next) => {
    try {
        res.send(req.user);
    } catch (ex) {
        next(ex);
    }
});

app.get("/api/users", async (req, res, next) => {
    try {
        res.send(await fetchUsers());
    } catch (ex) {
        next(ex);
    }
});

app.get("/api/users/:id/reviews", isLoggedIn, async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }
        res.send(await fetchReviews(req.params.id));
    } catch (ex) {
        next(ex);
    }
});

app.get("/api/users/:id/comments", isLoggedIn, async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }
        res.send(await fetchComments(req.params.id));
    } catch (ex) {
        next(ex);
    }
});

app.post("/api/users/:id/reviews", isLoggedIn, async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }
        res.status(201).send(
            await createReview({
                user_id: req.params.id,
                review_id: req.body.review_id,
            })
        );
    } catch (ex) {
        next(ex);
    }
});

app.post("/api/users/:id/comments", isLoggedIn, async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }
        res.status(201).send(
            await createComment({
                user_id: req.params.id,
                comment_id: req.body.comment_id,
            })
        );
    } catch (ex) {
        next(ex);
    }
});

app.delete("/api/users/:user_id/reviews/:id", isLoggedIn, async (req, res, next) => {
    try {
        if (req.user.id !== req.params.user_id) {
            const error = Error("not authorized");
            error.status = 401;
            throw error;
        }
        await deleteReview({ user_id: req.params.user_id, id: req.params.id });
        res.sendStatus(204);
    } catch (ex) {
        next(ex);
    }
}
);

app.delete(
    "/api/users/:user_id/comments/:id",
    isLoggedIn,
    async (req, res, next) => {
        try {
            if (req.user.id !== req.params.user_id) {
                const error = Error("not authorized");
                error.status = 401;
                throw error;
            }
            await deleteComment({ user_id: req.params.user_id, id: req.params.id });
            res.sendStatus(204);
        } catch (ex) {
            next(ex);
        }
    }
);

app.get("/api/trees", async (req, res, next) => {
    try {
        res.send(await fetchTrees());
    } catch (ex) {
        next(ex);
    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res
        .status(err.status || 500)
        .send({ error: err.message ? err.message : err });
});

// const init = async () => {
// const port = process.env.PORT || 3000;
// await db.connect();
// console.log("connected to database");

// await createTables();
// console.log("tables created");

// const [] = await Promise.all(
//     [

//     ]
// );

// console.log(await fetchUsers());
// console.log(await fetchTrees());

// console.log(await fetchReviews());

//     app.listen(port, () => console.log(`listening on port ${port}`));
// };

// init();