const db = require('./client');
const { createUser } = require('./users_db');
const { createTree, createReview, createComment } = require('./trees_db');


const createTables = async () => {
  const SQL = /* sql */ `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS trees CASCADE;
  DROP TABLE IF EXISTS reviews CASCADE;
  DROP TABLE IF EXISTS comments CASCADE;

  CREATE TABLE users (
      id UUID PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
  );

  CREATE TABLE trees (
      id SERIAL PRIMARY KEY,
      treeName VARCHAR(255) UNIQUE NOT NULL,
      location VARCHAR(255) NOT NULL,
      description VARCHAR(1000) NOT NULL
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
      review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
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
        description: "In 1903, Captain Charles Young, the first African American national park superintendent, led a group of Buffalo Soldiers in overseeing Sequoia National Park. At an end-of-season picnic, locals offered to name a tree after him, but Young declined, suggesting they could do so if they felt the same way in 20 years. Instead, he named a sequoia after educator Booker T. Washington. Nearly a century later, Young’s legacy was celebrated. A West Point graduate and accomplished military leader, Young served as a military attaché to multiple countries, wrote on race and military power, and achieved many firsts. In 2004, the Colonel Charles Young Tree was quietly dedicated, and in 2024, it was renamed to honor his posthumous promotion to Brigadier General. The tree now stands alongside the Booker T. Washington Tree and the Moro Rock / Crescent Meadow Road, commemorating his lasting contributions to history."
      },
      {
        treeName: 'The Cypress Tree Tunnel',
        location: 'Point Reyes National Seashore',
        description: "The Cypress Tree Tunnel at Point Reyes National Seashore is a breathtaking natural landmark where towering Monterey cypress trees form a dramatic archway over a quiet stretch of road. Planted in the 1930s, these trees were originally part of the landscaping for a nearby radio station, which played a key role in transoceanic communication during its time. Over the decades, the trees have grown into an impressive tunnel, attracting visitors for its ethereal beauty and peaceful atmosphere. The sunlight filtering through the branches creates a magical experience for photographers and nature lovers alike. The Cypress Tree Tunnel has since become an iconic spot within Point Reyes, symbolizing the park’s blend of natural and historical significance while offering a serene moment of reflection for all who pass through."
      },
      {
        treeName: 'General Grant Tree',
        location: 'Sequoia & Kings Canyon National Parks',
        description: "The General Grant Tree, located in Sequoia & Kings Canyon National Parks, is one of the largest trees on Earth and stands as a symbol of endurance and history. Designated as the 'Nation’s Christmas Tree' by President Calvin Coolidge in 1926, this massive giant sequoia is also a living war memorial, dedicated to soldiers who fought in wars. Estimated to be over 1,600 years old, the tree towers at 267 feet, with a base circumference of nearly 100 feet, making it one of the most visited and revered natural wonders in the park. The General Grant Tree’s immense size and longevity inspire awe and reflect the grandeur of nature, offering visitors a humbling experience as they stand before this ancient, majestic monument."
      },
      {
        treeName: 'Chimney Tree',
        location: 'Sequoia & Kings Canyon National Parks',
        description: "The Chimney Tree in Sequoia & Kings Canyon National Parks is a unique sequoia that captures visitors’ imaginations with its hollow, fire-scarred trunk. Despite the extensive burn damage, the tree continues to stand tall, earning its nickname from its chimney-like appearance. Fires that swept through the park decades ago hollowed out its core, but the resilient sequoia adapted, making it a fascinating symbol of nature’s ability to endure and regenerate. Visitors can walk inside the tree's hollow trunk, offering a rare and intimate experience with one of the park’s giants. The Chimney Tree serves as a powerful reminder of the sequoia’s remarkable strength and the ever-changing, yet resilient, natural world."
      },
      {
        treeName: 'Big Tree Wayside',
        location: 'Redwood National and State Parks',
        description: "The Big Tree Wayside, located in Redwood National and State Parks, is one of the park’s most iconic stops, offering visitors a close-up view of a towering coast redwood that has stood for centuries. Rising over 300 feet and with a circumference of more than 60 feet, this ancient giant is a testament to the resilience and longevity of the redwoods. Easily accessible via a short trail, Big Tree Wayside provides an awe-inspiring experience, allowing visitors to marvel at the grandeur of one of the world's tallest tree species. The area surrounding the tree is peaceful and shaded, offering a perfect spot for reflection and photography. It stands as a natural monument, showcasing the majestic beauty that defines the redwood forests."
      },
      {
        treeName: "National Christmas Tree",
        location: "The White House and President's Park",
        description: "The National Christmas Tree, located in The White House and President's Park, is a cherished symbol of the holiday season in the heart of Washington, D.C. Each year, this elegant tree is beautifully decorated and illuminated in a grand ceremony that has become a beloved tradition since 1923. Surrounded by smaller trees representing all U.S. states and territories, the National Christmas Tree stands as a symbol of unity, peace, and the joy of the holiday season. Its proximity to the White House makes it a popular destination for both locals and tourists during the festive months. The tree’s lighting ceremony, often attended by the President, is a magical event that brings together people from across the nation, reflecting the enduring spirit of the holiday season in the nation's capital."
      },
      {
        treeName: "Black Oak Tree at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
        description: "The Black Oak Tree at the Ulysses S. Grant National Historic Site stands as a proud reminder of nature's resilience and history. Located on the grounds of the estate where Ulysses S. Grant once lived, this towering oak is more than just a tree—it's a living connection to the past. Its sprawling branches and thick trunk offer a sense of strength and permanence, much like the legacy of the 18th president himself. The Black Oak provides a peaceful, shaded retreat for visitors exploring the historic site, adding to the serene atmosphere that surrounds the home of one of America's most significant leaders. Its presence on the property, amid other historic trees, enhances the natural beauty of the estate while serving as a quiet tribute to the enduring history of the land."
      },
      {
        treeName: "Historic Tamarind Trees",
        location: "Buck Island Reef National Monument",
        description: "The Historic Tamarind Trees at Buck Island Reef National Monument are a unique part of the island’s natural and cultural landscape. These graceful trees, with their broad canopies and distinctive pods, provide welcome shade and a peaceful atmosphere for visitors exploring the island. As some of the oldest living elements on Buck Island, the tamarinds have witnessed generations of history, from the island's early indigenous peoples to its modern status as a protected national monument. Nestled within the vibrant ecosystem of the reef and beaches, these trees offer a striking contrast to the surrounding tropical flora. Their historical significance and natural beauty make them a beloved part of the Buck Island experience, serving as a quiet reminder of the island’s rich heritage and enduring connection to nature."
      },
      {
        treeName: "Buttress Tree",
        location: "Sequoia & Kings Canyon National Parks",
        description: "The Buttress Tree in Sequoia & Kings Canyon National Parks is a remarkable example of nature’s architectural prowess. This towering giant sequoia is named for its large, flared roots, which resemble the buttresses of a cathedral, providing stability and strength to support its immense height. Located among other iconic sequoias, the Buttress Tree stands out for its distinctive base, which seems to anchor it firmly into the earth. Visitors are often struck by the tree's resilience, as its roots spread out wide, a testament to the endurance of these ancient giants. Walking around its base offers a unique perspective on the incredible adaptations that have allowed sequoias to thrive for thousands of years. The Buttress Tree serves as a living symbol of nature’s engineering, showcasing the strength and beauty of the sequoia forest."
      },
      {
        treeName: "Big Stump of the Mark Twain Tree",
        location: "Sequoia & Kings Canyon National Parks",
        description: "The Big Stump of the Mark Twain Tree, located in Sequoia & Kings Canyon National Parks, is a poignant reminder of the era when even the largest of trees were not immune to logging. Once part of a massive giant sequoia, the Mark Twain Tree was felled in the late 1800s, with sections of its trunk shipped to museums as a display of the natural world's grandeur. All that remains today is the enormous stump, measuring over 16 feet in diameter. While it serves as a somber reflection of the consequences of early logging practices, the stump also offers visitors an opportunity to witness firsthand the sheer size of these ancient trees. The Big Stump of the Mark Twain Tree stands as both a historical marker and a reminder of the importance of conservation efforts in protecting these majestic sequoias for future generations."
      },
      {
        treeName: "Interstadial Stumps - Whidbey Passage",
        location: "Glacier Bay National Park & Preserve",
        description: "The Interstadial Stumps at Whidbey Passage in Glacier Bay National Park & Preserve are an extraordinary glimpse into the past. These ancient tree stumps, preserved in place by the forces of glaciers long ago, are remnants of a forest that once thrived in the area thousands of years ago. The stumps were exposed as the glaciers retreated, revealing an incredible record of the region’s changing climate and landscape. Visitors to Whidbey Passage can witness these stumps, which stand as silent witnesses to a time before glaciers advanced, transforming the land. The Interstadial Stumps offer a fascinating intersection of geology and ecology, allowing visitors to connect with a prehistoric world while exploring the stunning natural beauty of Glacier Bay. They serve as a powerful reminder of the dynamic forces that continue to shape the region today."
      },
      {
        treeName: "Gingko Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
        description: "The Gingko Trees at the Ulysses S. Grant National Historic Site add a touch of elegance and history to the grounds of the former president's estate. Known for their unique fan-shaped leaves that turn a stunning golden hue in the fall, these trees are a living connection to ancient botanical history, as ginkgos are considered “living fossils” dating back over 200 million years. Their presence at the historic site complements the estate’s serene environment, offering visitors a peaceful space to reflect on both natural and national history. Planted long after Ulysses S. Grant’s time, the gingkos now stand tall among the other historic trees on the property, creating a striking contrast of old and new. Their seasonal beauty makes them a favorite feature for visitors, especially in autumn when their leaves create a brilliant yellow canopy over the landscape."
      },
      {
        treeName: "Dawn Redwood Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
        description: "The Dawn Redwood Trees at the Ulysses S. Grant National Historic Site are a rare and captivating presence on the historic grounds. Thought to be extinct until their rediscovery in China in the 1940s, Dawn Redwoods are often called “living fossils,” much like the Gingko trees nearby. These majestic trees, with their soft, feathery leaves that turn a beautiful bronze in the fall, add a unique touch to the estate. Despite being relatives of the towering California redwoods, Dawn Redwoods are more modest in size but still stand out for their elegance and resilience. Planted after their rediscovery, the trees are a symbol of renewal and endurance, fitting for a site that honors the legacy of one of America’s great leaders. Their story adds another layer of intrigue to the historic grounds, connecting visitors to both natural history and the life of Ulysses S. Grant."
      },
      {
        treeName: "Flowering Dogwood Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
        description: "The Flowering Dogwood Trees at the Ulysses S. Grant National Historic Site bring a burst of seasonal beauty to the historic landscape. Each spring, these trees are adorned with delicate white and pink blossoms, adding a graceful touch to the grounds where President Grant once walked. The flowering dogwoods are native to the region and symbolize resilience and new beginnings—fitting for the estate of a man who led the nation through one of its most challenging periods. Their vibrant blooms attract visitors year after year, offering a striking contrast to the historic architecture of the estate. As one of the most eye-catching features on the property, the dogwood trees provide a serene and picturesque setting, enhancing the natural and historical significance of Ulysses S. Grant's former home."
      },
      {
        treeName: "Sweetgum Trees at Ulysses S. Grant NHS",
        location: "Ulysses S Grant National Historic Site",
        description: "The Sweetgum Trees at the Ulysses S. Grant National Historic Site add a distinctive charm to the grounds with their star-shaped leaves and vibrant seasonal colors. In the fall, these trees transform into a dazzling display of reds, oranges, and purples, making them a highlight for visitors exploring the estate. Native to the region, Sweetgum trees are known for their unique seed pods and their striking appearance throughout the year. Their presence at the site complements the historic surroundings, offering a beautiful natural contrast to the historic home of President Grant. The trees' enduring strength and adaptability reflect the legacy of Grant himself, making them a fitting addition to the landscape of this historic property. Their beauty and symbolism make them a beloved feature of the estate, especially during the autumn months when the grounds come alive with color."
      },
    ];
    const treeIds = [];

    for (const tree of trees) {
      const treeId = await createTree({
        treeName: tree.treeName,
        location: tree.location,
        description: tree.description
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
