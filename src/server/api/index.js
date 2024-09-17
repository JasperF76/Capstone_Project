const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball')
apiRouter.use(volleyball)

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  // console.log(auth, "auth");

  if (!auth) {
    next();
  }
  else if (auth.startsWith('Bearer')) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.split(' ')[1];

    try {
      // const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await findUserWithToken(token);
      console.log(user, "user");

      if (user) {
        req.user = user;
        console.log("Authenticated user:", req.user);
        
      }

      next();
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'

    } catch (error) {
      next(error);
    }
  }
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

// apiRouter.post("/api/auth/register", async (req, res, next) => {
//   try {
//     res.send(await createUserAndGenerateToken(req.body));
//   } catch (ex) {
//     next(ex);
//   }
// });

// apiRouter.post("/api/auth/login", async (req, res, next) => {
//   try {
//     res.send(await authenticate(req.body));
//   } catch (ex) {
//     next(ex);
//   }
// });

const usersRouter = require('./users');
const { findUserWithToken,
  createUserAndGenerateToken
} = require('../db/users_db');
apiRouter.use('/users', usersRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err)
})

module.exports = apiRouter;