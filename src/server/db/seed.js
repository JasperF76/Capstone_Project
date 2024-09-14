const db = require('./client');
const { createUser } = require('./users_db');
const { createTree } = require('./trees_db');

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
  // Add more user objects as needed
];

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
]

// const dropTables = async () => {
//     try {
//         await db.query(`
//         DROP TABLE IF EXISTS users;
//         `)
//     }
//     catch(err) {
//         throw err;
//     }
// }

// const createTables = async () => {
//     try{
//         await db.query(`
//         CREATE TABLE users(
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) DEFAULT 'name',
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//         )`)
//     }
//     catch(err) {
//         throw err;
//     }
// }

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
      review_id UUID REFERENCES reviews(id) NOT NULL
  );
  `;
  await db.query(SQL);
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({ username: user.username, email: user.email, password: user.password });
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertTrees = async () => {
  try {
    for (const tree of trees) {
      await createTree({ treeName: tree.treeName, location: tree.location });
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    // await dropTables();
    await createTables();
    await insertUsers();
    await insertTrees();
  }
  catch (err) {
    throw err;
  }
  finally {
    db.end()
  }
}

seedDatabse()
