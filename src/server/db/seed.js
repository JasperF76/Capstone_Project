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
      {
        treeName: "National Christmas Tree",
        location: "The White House and President's Park",
      },
      {
        treeName: "Black Oak Tree at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
      },
      {
        treeName: "Historic Tamarind Trees",
        location: "Buck Island Reef National Monument",
      },
      {
        treeName: "Buttress Tree",
        location: "Sequoia & Kings Canyon National Parks",
      },
      {
        treeName: "Big Stump of the Mark Twain Tree",
        location: "Sequoia & Kings Canyon National Parks",
      },
      {
        treeName: "Interstadial Stumps - Whidbey Passage",
        location: "Glacier Bay National Park & Preserve",
      },
      {
        treeName: "Gingko Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
      },
      {
        treeName: "Dawn Redwood Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
      },
      {
        treeName: "Flowering Dogwood Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
      },
      {
        treeName: "Sweetgum Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
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
        text: "The Brigadier General Charles Young Tree was a powerful experience. It’s dedicated to a historic figure, making it stand out from the others. You feel a deep connection to both nature and history standing before it.",
        rating: 5,
        user_id: userIds[0],
        tree_id: treeIds[0]
      },
      {
        text: "Walking through the Cypress Tree Tunnel feels like entering another world. The trees create this incredible natural archway, and the light filtering through makes it feel magical. A peaceful and picturesque spot.",
        rating: 4,
        user_id: userIds[1],
        tree_id: treeIds[1]
      },
      {
        text: "The General Grant Tree is absolutely massive. It's awe-inspiring to see something so ancient and enduring. The nickname 'The Nation’s Christmas Tree' suits it—standing before it feels festive, grand, and deeply American.",
        rating: 3,
        user_id: userIds[2],
        tree_id: treeIds[2]
      },
      {
        text: "The Chimney Tree is fascinating. Its hollow trunk is like nature’s own chimney, and you can almost imagine the stories this ancient tree could tell. A unique sight among the giants of the park.",
        rating: 2,
        user_id: userIds[3],
        tree_id: treeIds[3]
      },
      {
        text: "Big Tree Wayside is the definition of grandeur. You can feel the history and power of these ancient redwoods just standing beneath them. It's a humbling experience to be surrounded by such giants.",
        rating: 3,
        user_id: userIds[4],
        tree_id: treeIds[4]
      },
      {
        text: "The National Christmas Tree is a sight to behold during the holiday season. It’s beautifully decorated and adds a festive spirit to the already iconic setting of the White House. A tradition that feels timeless.",
        rating: 4,
        user_id: userIds[4],
        tree_id: treeIds[5]
      },
      {
        text: "The Black Oak Tree at Grant’s historic site stands tall and strong, much like the man it honors. Its sprawling branches create a serene canopy, offering shade and a sense of peace as you explore this storied ground. A quiet giant.",
        rating: 5,
        user_id: userIds[3],
        tree_id: treeIds[6]
      },
      {
        text: "The Historic Tamarind Trees on Buck Island are truly special. They’ve stood tall for centuries, witnessing so much change. Their shady canopy offers a peaceful retreat, and they add charm to the monument’s landscape.",
        rating: 5,
        user_id: userIds[2],
        tree_id: treeIds[7]
      },
      {
        text: "The Historic Tamarind Trees on Buck Island are truly special. They’ve stood tall for centuries, witnessing so much change. Their shady canopy offers a peaceful retreat, and they add charm to the monument’s landscape.",
        rating: 4,
        user_id: userIds[1],
        tree_id: treeIds[8]
      },
      {
        text: "Standing on the Big Stump of the Mark Twain Tree was both awe-inspiring and a little sad. This giant was once cut down to display in a museum, but its story lives on here in the forest.",
        rating: 2,
        user_id: userIds[0],
        tree_id: treeIds[9]
      },
      {
        text: "The Interstadial Stumps at Whidbey Passage are a reminder of nature’s power and resilience. These ancient tree stumps, preserved from a different era, offer a rare glimpse into the geological history of the park.",
        rating: 3,
        user_id: userIds[0],
        tree_id: treeIds[10]
      },
      {
        text: "The Gingko Trees at Grant’s historic site are beautiful year-round, but they really shine in the fall when their leaves turn a brilliant yellow. They’re a peaceful tribute to the legacy of Ulysses S. Grant.",
        rating: 4,
        user_id: userIds[1],
        tree_id: treeIds[11]
      },
      {
        text: "The Dawn Redwoods at the Ulysses S. Grant site are a surprising discovery. These living fossils were thought to be extinct, but here they thrive, connecting visitors to an ancient past in the heart of history.",
        rating: 5,
        user_id: userIds[2],
        tree_id: treeIds[12]
      },
      {
        text: "The Flowering Dogwood Trees are stunning in the spring, with their blossoms adding a soft elegance to the grounds. They’re a peaceful reminder of the beauty that can be found in simple, enduring things.",
        rating: 4,
        user_id: userIds[3],
        tree_id: treeIds[13]
      },
      {
        text: "The Sweetgum Trees bring vibrant color to the historic site in the fall. Their spiky seed pods are a fun discovery, and the trees themselves add a comforting sense of history to the grounds.",
        rating: 4,
        user_id: userIds[4],
        tree_id: treeIds[14]
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
        text: "I agree, this tree is amazing!",
        review_id: reviewIds[0].id,
        user_id: userIds[4]
      },
      {
        text: "I went on a weekend, and the path was very crowded.",
        review_id: reviewIds[1].id,
        user_id: userIds[3]
      },
      {
        text: "It was pretty cool to look at, but it was just a tree, bro. My apartment is taller than this",
        review_id: reviewIds[2].id,
        user_id: userIds[2]
      },
      {
        text: "It was like a cool little tree/cave combo",
        review_id: reviewIds[3].id,
        user_id: userIds[1]
      },
      {
        text: "Kinda reminds me of Kashyyyk, where all the wookiees at??? :D",
        review_id: reviewIds[4].id,
        user_id: userIds[0]
      },
      {
        text: "It is definitely very pretty when it's all lit up.",
        review_id: reviewIds[5].id,
        user_id: userIds[0]
      },
      {
        text: "I wonder if there's like, ants and spiders all the way at the top of trees this tall?",
        review_id: reviewIds[6].id,
        user_id: userIds[1]
      },
      {
        text: "I wish I could climb these, I bet it would be super fun!",
        review_id: reviewIds[7].id,
        user_id: userIds[2]
      },
      {
        text: "Ha.. the expression 'natural engineering' suggests an intelligent engineer, does it not?",
        review_id: reviewIds[8].id,
        user_id: userIds[3]
      },
      {
        text: "Leave it to mankind to do something so stupid. Bring the people to the tree, not the tree to the people, idiots.",
        review_id: reviewIds[9].id,
        user_id: userIds[4]
      },
      {
        text: "Gotta wonder what this place looked like with all those trees still standing.. magnificent, I bet",
        review_id: reviewIds[10].id,
        user_id: userIds[4]
      },
      {
        text: "I wonder if eating this trees leaves will improve my memory :P get it? cause it's 'gingko'?",
        review_id: reviewIds[11].id,
        user_id: userIds[3]
      },
      {
        text: "Kinda small to be redwoods, though.. whenever I hear 'redwood' I think 'massive', y'know?",
        review_id: reviewIds[12].id,
        user_id: userIds[2]
      },
      {
        text: "They're pretty enough trees when their flowers bloom, I guess, my wife loved them.",
        review_id: reviewIds[13].id,
        user_id: userIds[1]
      },
      {
        text: "I had one of these in front of my house growing up. We used to throw those little balls at each other, lol",
        review_id: reviewIds[14].id,
        user_id: userIds[0]
      },

    ];

    for (const comment of comments) {
      const createdComment = await createComment({
        text: comment.text,
        review_id: comment.review_id,
        user_id: comment.user_id
      });

      //console.log('Comment created:', createdComment);


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
