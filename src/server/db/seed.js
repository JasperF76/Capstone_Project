const db = require('./client');
const { createUser } = require('./users_db');
const { createTree, createReview, createComment } = require('./trees_db');


const createTables = async () => {
  const SQL = /* sql */ `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS trees CASCADE;
  DROP TABLE IF EXISTS reviews CASCADE;
  DROP TABLE IF EXISTS comments;

  CREATE TABLE users (
      id UUID PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
  );

  CREATE TABLE trees (
      id SERIAL PRIMARY KEY,
      treeName VARCHAR(255) UNIQUE NOT NULL,
      location VARCHAR(255) NOT NULL
  );

  CREATE TABLE reviews (
      id UUID PRIMARY KEY,
      text VARCHAR(1000),
      rating INTEGER DEFAULT 3 NOT NULL CHECK (rating BETWEEN 1 AND 5),
      user_id UUID REFERENCES users(id) NOT NULL,
      tree_id SERIAL REFERENCES trees(id) NOT NULL
  );

  CREATE TABLE comments (
      id UUID PRIMARY KEY,
      text VARCHAR(500),
      review_id UUID REFERENCES reviews(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL
  );
  `;
  await db.query(SQL);
};

// Users seed data.
const insertUsers = async () => {
  try {
    const users = [
      {
        username: 'EmiJo',
        email: 'emily@example.com',
        password: 'securepass',
      },
      {
        username: 'LiuWei',
        email: 'liu@example.com',
        password: 'strongpass',
      },
      {
        username: 'IsaGarcía',
        email: 'bella@example.com',
        password: 'pass1234',
      },
      {
        username: 'Mohamm Ahm',
        email: 'mohammed@example.com',
        password: 'mysecretpassword',
      },
      {
        username: 'JoSmit',
        email: 'john@example.com',
        password: 'password123',
      },
    ];

    const userIds = [];

    for (const user of users) {
      const createdUser = await createUser({
        username: user.username,
        email: user.email,
        password: user.password
      });
      userIds.push(createdUser.id);
    }

    console.log('Seed data inserted successfully.');
    return userIds;

  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

// Trees seed data.
const insertTrees = async () => {
  try {
    const trees = [
      {
        treeName: 'Brigadier General Charles Young Tree',
        location: 'Sequoia & Kings Canyon National Parks',
      },
      {
        treeName: 'The Cypress Tree Tunnel',
        location: 'Point Reyes National Seashore',
      },
      {
        treeName: 'General Grant Tree',
        location: 'Sequoia & Kings Canyon National Parks',
      },
      {
        treeName: 'Chimney Tree',
        location: 'Sequoia & Kings Canyon National Parks',
      },
      {
        treeName: 'Big Tree Wayside',
        location: 'Redwood National and State Parks',
      },
    ];

    const treeIds = [];

    for (const tree of trees) {
      const treeId = await createTree({
        treeName: tree.treeName,
        location: tree.location
      });
      treeIds.push(treeId);
    }
    console.log('Seed data inserted successfully.');
    return treeIds;
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

// Reviews seed data.
const insertReviews = async (userIds, treeIds) => {
  try {
    const reviews = [
      {
        text: 'Beautiful tree, a must-see!',
        rating: 5,
        user_id: userIds[0],
        tree_id: treeIds[0]
      },
      {
        text: 'The tree is majestic, but the path was crowded.',
        rating: 4,
        user_id: userIds[1],
        tree_id: treeIds[1]
      },
      {
        text: 'Seeing this tree up close and in-person was a surreal experience.',
        rating: 3,
        user_id: userIds[2],
        tree_id: treeIds[2]
      },
      {
        text: 'The tree was not as big as I thought it would be.',
        rating: 2,
        user_id: userIds[3],
        tree_id: treeIds[3]
      },
      {
        text: 'The graphics outside are super photo-realistic :P',
        rating: 3,
        user_id: userIds[4],
        tree_id: treeIds[4]
      },
    ];

    const createdReviews = [];

    for (const review of reviews) {
      const createdReview = await createReview({
        text: review.text,
        rating: review.rating,
        user_id: review.user_id,
        tree_id: review.tree_id
      });

      createdReviews.push(createdReview);

    }
    console.log('Seed data inserted successfully.');
    return createdReviews;
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

// Comments seed data.
const insertComments = async (reviewIds, userIds) => {
  try {
    const comments = [
      {
        text: 'I agree, this tree is amazing!',
        review_id: reviewIds[0].id,
        user_id: userIds[4]
      },
      {
        text: 'I went on a Tuesday, and did not have any issues.',
        review_id: reviewIds[1].id,
        user_id: userIds[3]
      },
      {
        text: 'It was pretty cool to look at, but it was just a tree, bro',
        review_id: reviewIds[2].id,
        user_id: userIds[1]
      },
      {
        text: 'Were we looking at the same tree?',
        review_id: reviewIds[3].id,
        user_id: userIds[2]
      },
      {
        text: 'If I am blind, does that mean I need a new graphics card? :D',
        review_id: reviewIds[4].id,
        user_id: userIds[0]
      },
    ];

    for (const comment of comments) {
      const createdComment = await createComment({
        text: comment.text,
        review_id: comment.review_id,
        user_id: comment.user_id
      });

      console.log('Comment created:', createdComment);


    }
    console.log('Seed data inserted successfully.');

  } catch (error) {

  }
}

const seedDatabase = async () => {
  try {
    await db.connect();
    await createTables();
    const userIds = await insertUsers();
    const treeIds = await insertTrees();
    const reviewIds = await insertReviews(userIds, treeIds);
    await insertComments(reviewIds, userIds);
  }
  catch (err) {
    throw err;
  }
  finally {
    await db.end()
  }
}

seedDatabase()
