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
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE trees (
      id SERIAL PRIMARY KEY,
      treeName VARCHAR(255) UNIQUE NOT NULL,
      location VARCHAR(255) NOT NULL,
      description VARCHAR(2000) NOT NULL,
      image_url VARCHAR(500)
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
        isAdmin: 'false'
      },
      {
        username: 'LiuWei',
        email: 'liu@example.com',
        password: 'strongpass',
        isAdmin: 'false'
      },
      {
        username: 'IsaGarcía',
        email: 'bella@example.com',
        password: 'pass1234',
        isAdmin: 'false'
      },
      {
        username: 'Mohamm Ahm',
        email: 'mohammed@example.com',
        password: 'mysecretpassword',
        isAdmin: 'false'
      },
      {
        username: 'JoSmit',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: 'false'
      },
    ];

    const userIds = [];

    for (const user of users) {
      const createdUser = await createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
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
        location: 'Sequoia & Kings Canyon National Parks, California',
        description: "In 1903, Captain Charles Young, the first African American national park superintendent, led a group of Buffalo Soldiers in overseeing Sequoia National Park. At an end-of-season picnic, locals offered to name a tree after him, but Young declined, suggesting they could do so if they felt the same way in 20 years. Instead, he named a sequoia after educator Booker T. Washington. Nearly a century later, Young’s legacy was celebrated. A West Point graduate and accomplished military leader, Young served as a military attaché to multiple countries, wrote on race and military power, and achieved many firsts. In 2004, the Colonel Charles Young Tree was quietly dedicated, and in 2024, it was renamed to honor his posthumous promotion to Brigadier General. The tree now stands alongside the Booker T. Washington Tree and the Moro Rock / Crescent Meadow Road, commemorating his lasting contributions to history.",
        image_url: "https://www.nps.gov/common/uploads/cropped_image/primary/A01CAFFA-C313-D67C-5C89AEBC99F35217.jpg?width=1600&quality=90&mode=crop"
      },
      {
        treeName: 'The Cypress Tree Tunnel',
        location: 'Point Reyes National Seashore, California',
        description: "The Cypress Tree Tunnel at Point Reyes National Seashore is a breathtaking natural landmark where towering Monterey cypress trees form a dramatic archway over a quiet stretch of road. Planted in the 1930s, these trees were originally part of the landscaping for a nearby radio station, which played a key role in transoceanic communication during its time. Over the decades, the trees have grown into an impressive tunnel, attracting visitors for its ethereal beauty and peaceful atmosphere. The sunlight filtering through the branches creates a magical experience for photographers and nature lovers alike. The Cypress Tree Tunnel has since become an iconic spot within Point Reyes, symbolizing the park’s blend of natural and historical significance while offering a serene moment of reflection for all who pass through.",
        image_url: "https://i.etsystatic.com/13751308/r/il/a3d69e/3723673324/il_fullxfull.3723673324_cgcp.jpg"
      },
      {
        treeName: 'General Grant Tree',
        location: 'Sequoia & Kings Canyon National Parks, California',
        description: "The General Grant Tree, located in Sequoia & Kings Canyon National Parks, is one of the largest trees on Earth and stands as a symbol of endurance and history. Designated as the 'Nation’s Christmas Tree' by President Calvin Coolidge in 1926, this massive giant sequoia is also a living war memorial, dedicated to soldiers who fought in wars. Estimated to be over 1,600 years old, the tree towers at 267 feet, with a base circumference of nearly 100 feet, making it one of the most visited and revered natural wonders in the park. The General Grant Tree’s immense size and longevity inspire awe and reflect the grandeur of nature, offering visitors a humbling experience as they stand before this ancient, majestic monument.",
        image_url: "https://www.nps.gov/seki/learn/nature/images/General-Grant-Tree-18.JPG"
      },
      {
        treeName: 'Chimney Tree',
        location: 'Sequoia & Kings Canyon National Parks, California',
        description: "The Chimney Tree in Sequoia & Kings Canyon National Parks is a unique sequoia that captures visitors’ imaginations with its hollow, fire-scarred trunk. Despite the extensive burn damage, the tree continues to stand tall, earning its nickname from its chimney-like appearance. Fires that swept through the park decades ago hollowed out its core, but the resilient sequoia adapted, making it a fascinating symbol of nature’s ability to endure and regenerate. Visitors can walk inside the tree's hollow trunk, offering a rare and intimate experience with one of the park’s giants. The Chimney Tree serves as a powerful reminder of the sequoia’s remarkable strength and the ever-changing, yet resilient, natural world.",
        image_url: "https://www.nps.gov/common/uploads/cropped_image/primary/7D9E150E-F5A3-E4AF-1BFA93D1EF9A2F0C.jpg?width=1600&quality=90&mode=crop"
      },
      {
        treeName: 'Big Tree Wayside',
        location: 'Redwood National and State Parks, California',
        description: "The Big Tree Wayside, located in Redwood National and State Parks, is one of the park’s most iconic stops, offering visitors a close-up view of a towering coast redwood that has stood for centuries. Rising over 300 feet and with a circumference of more than 60 feet, this ancient giant is a testament to the resilience and longevity of the redwoods. Easily accessible via a short trail, Big Tree Wayside provides an awe-inspiring experience, allowing visitors to marvel at the grandeur of one of the world's tallest tree species. The area surrounding the tree is peaceful and shaded, offering a perfect spot for reflection and photography. It stands as a natural monument, showcasing the majestic beauty that defines the redwood forests.",
        image_url: "https://images.squarespace-cdn.com/content/v1/5a5986b2cf81e095e172ce87/1640985647677-B0BAP6QCAU52QQ4FNJ3K/flyingdawnmarie-redwoods-big-tree-wayside-01.jpg"
      },
      {
        treeName: "Methuselah",
        location: "Eastern California",
        description: "Methuselah, a bristlecone pine (Pinus longaeva), is the world’s oldest known living tree, estimated to be around 4,800 years old. Nestled in the White Mountains of eastern California, this ancient tree has withstood millennia of harsh weather and rugged landscapes. Its exact location is kept secret by the U.S. Forest Service to protect it from vandalism or damage. The tree has lived through the rise and fall of civilizations, making it a silent witness to human history. Methuselah's longevity is attributed to its slow growth rate and the resilience of bristlecone pines, which thrive in high-altitude environments where few other species can survive. Its gnarled and twisted appearance reflects its endurance through extreme conditions, and it serves as a reminder of nature's incredible capacity for survival and adaptation. Methuselah remains a symbol of time and resilience, quietly living in solitude.",
        image_url: "https://i.guim.co.uk/img/media/b2bf0b11df293e1354bd08c117a0a3432620858f/0_278_7360_4417/master/7360.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=3ae1bdb513b97a8ee43be52f008a25d3"
      },
      {
        treeName: "The Cotton Tree",
        location: "Sierra Leone",
        description: "The iconic Sierra Leone Cotton Tree, which stood for centuries in the heart of Freetown, was felled during a heavy rainstorm in May 2023. This beloved tree, estimated to be around 400 years old, had long been a symbol of freedom and resilience for the people of Sierra Leone. According to local legend, formerly enslaved African Americans who resettled in Freetown after gaining their freedom gathered under the tree to give thanks. Over the years, the Cotton Tree became a national symbol, featured on banknotes and stamps, and visited by dignitaries, including Queen Elizabeth II. Its collapse during the storm has left a deep sense of loss in the hearts of Sierra Leoneans, with many mourning the end of its towering presence, which had once dominated Freetown's skyline. The fallen tree is seen as a poignant reminder of the challenges posed by climate change, as Sierra Leone has faced increasingly extreme weather in recent years​.",
        image_url: "https://www.aljazeera.com/wp-content/uploads/2023/05/AP23145487661370-1685032796.jpg?resize=1920%2C1440"
      },
      {
        treeName: "Historic Tamarind Trees",
        location: "Buck Island Reef National Monument, US Virgin Islands",
        description: "The Historic Tamarind Trees at Buck Island Reef National Monument are a unique part of the island’s natural and cultural landscape. These graceful trees, with their broad canopies and distinctive pods, provide welcome shade and a peaceful atmosphere for visitors exploring the island. As some of the oldest living elements on Buck Island, the tamarinds have witnessed generations of history, from the island's early indigenous peoples to its modern status as a protected national monument. Nestled within the vibrant ecosystem of the reef and beaches, these trees offer a striking contrast to the surrounding tropical flora. Their historical significance and natural beauty make them a beloved part of the Buck Island experience, serving as a quiet reminder of the island’s rich heritage and enduring connection to nature.",
        image_url: "https://www.nps.gov/common/uploads/cropped_image/primary/3B85A816-9B19-CE14-D4F370F84F45F3AB.jpg?width=1600&quality=90&mode=crop"
      },
      {
        treeName: "Buttress Tree",
        location: "Sequoia & Kings Canyon National Parks, California",
        description: "The Buttress Tree in Sequoia & Kings Canyon National Parks is a remarkable example of nature’s architectural prowess. This towering giant sequoia is named for its large, flared roots, which resemble the buttresses of a cathedral, providing stability and strength to support its immense height. Located among other iconic sequoias, the Buttress Tree stands out for its distinctive base, which seems to anchor it firmly into the earth. Visitors are often struck by the tree's resilience, as its roots spread out wide, a testament to the endurance of these ancient giants. Walking around its base offers a unique perspective on the incredible adaptations that have allowed sequoias to thrive for thousands of years. The Buttress Tree serves as a living symbol of nature’s engineering, showcasing the strength and beauty of the sequoia forest.",
        image_url: "https://feelgoodandtravel.com/wp-content/uploads/2017/11/Photo-Aug-16-2-56-50-PM-e1511066996943.jpg"
      },
      {
        treeName: "Big Stump of the Mark Twain Tree",
        location: "Sequoia & Kings Canyon National Parks, California",
        description: "The Big Stump of the Mark Twain Tree, located in Sequoia & Kings Canyon National Parks, is a poignant reminder of the era when even the largest of trees were not immune to logging. Once part of a massive giant sequoia, the Mark Twain Tree was felled in the late 1800s, with sections of its trunk shipped to museums as a display of the natural world's grandeur. All that remains today is the enormous stump, measuring over 16 feet in diameter. While it serves as a somber reflection of the consequences of early logging practices, the stump also offers visitors an opportunity to witness firsthand the sheer size of these ancient trees. The Big Stump of the Mark Twain Tree stands as both a historical marker and a reminder of the importance of conservation efforts in protecting these majestic sequoias for future generations.",
        image_url: "https://live.staticflickr.com/3271/2807539203_0d823f9224_b.jpg"
      },
      {
        treeName: "Interstadial Stumps - Whidbey Passage",
        location: "Glacier Bay National Park & Preserve, Alaska",
        description: "The Interstadial Stumps at Whidbey Passage in Glacier Bay National Park & Preserve are an extraordinary glimpse into the past. These ancient tree stumps, preserved in place by the forces of glaciers long ago, are remnants of a forest that once thrived in the area thousands of years ago. The stumps were exposed as the glaciers retreated, revealing an incredible record of the region’s changing climate and landscape. Visitors to Whidbey Passage can witness these stumps, which stand as silent witnesses to a time before glaciers advanced, transforming the land. The Interstadial Stumps offer a fascinating intersection of geology and ecology, allowing visitors to connect with a prehistoric world while exploring the stunning natural beauty of Glacier Bay. They serve as a powerful reminder of the dynamic forces that continue to shape the region today.",
        image_url: "https://www.nps.gov/common/uploads/cropped_image/primary/D4CF6873-F214-2FD8-55A43A88F9134C18.jpg?width=1600&quality=90&mode=crop"
      },
      {
        treeName: "Angel Oak",
        location: "Charleston, South Carolina",
        description: "The Angel Oak, located on John’s Island near Charleston, South Carolina, is a stunning live oak tree that has captivated visitors for generations. Estimated to be over 400 years old, the Angel Oak stands at an impressive 65 feet tall, with a canopy that provides more than 17,000 square feet of shade. Its sprawling limbs, some of which stretch nearly 90 feet from the trunk, create a natural wonder that feels almost otherworldly. Visitors to the Angel Oak often describe the experience as awe-inspiring, with many noting the tree’s grand size and twisting, gnarled branches that seem to tell the story of centuries of growth. The tree has survived countless storms, including hurricanes, and continues to thrive despite its age. Standing beneath its vast canopy, one can’t help but feel connected to nature's resilience and history. For locals and tourists alike, the Angel Oak is more than just a tree—it’s a living monument to the enduring beauty and strength of the natural world.",
        image_url: "https://i.natgeofe.com/n/d2a0814d-5a5f-44cc-84f5-f77aaf71b8b0/iconic-trees-kf6059.jpg?w=1280&h=853"
      },
      {
        treeName: "The Olive Tree of Vouves",
        location: "Crete, Greece",
        description: "The Olive Tree of Vouves, located on the Greek island of Crete, is one of the oldest olive trees in the world, estimated to be between 2,000 and 3,000 years old. This ancient tree continues to produce olives, a testament to its remarkable longevity and vitality. Standing in the village of Ano Vouves, the tree has become a symbol of resilience and heritage, attracting visitors from around the world who marvel at its gnarled trunk and sprawling branches. The Olive Tree of Vouves is not only significant for its age but also for its connection to the rich history of olive cultivation in the Mediterranean region, where olive trees have been central to the culture and economy for millennia. Today, the tree is preserved and celebrated as a national monument, and its olives are used to make special ceremonial olive wreaths, including those awarded to athletes at the Olympic Games. For many, visiting this ancient tree is a profound reminder of the enduring connection between nature and human civilization.",
        image_url: "https://i.natgeofe.com/n/a18baae3-434f-4a4e-b0ec-6714081fb85b/iconic-trees-c3rrtm.jpg?w=1280&h=844"
      },
      {
        treeName: "Drago Milenario tree",
        location: "Tenerife, Spain’s Canary Islands",
        description: "The Drago Milenario, located in Icod de los Vinos on the island of Tenerife in Spain’s Canary Islands, is one of the most famous and ancient trees in the world. This majestic dragon tree (Dracaena draco) is estimated to be over 800 to 1,000 years old, though some locals claim it to be even older. Standing at around 18 meters tall, with a massive trunk and a dense canopy of sword-shaped leaves, the Drago Milenario is a symbol of resilience and longevity. The tree's distinctive shape, with its gnarled, twisting branches, creates an impressive natural sight that has long attracted visitors from around the world. According to local legends, dragon trees were born from the blood of dragons, and the tree's sap—referred to as 'dragon’s blood'—was believed to have healing properties. The Drago Milenario has survived harsh conditions and the passage of centuries, becoming a key cultural and natural landmark for the Canary Islands. Today, it is protected as part of the Parque del Drago, where it continues to inspire awe with its ancient presence and mythical history. For both locals and tourists, the Drago Milenario is a powerful reminder of nature’s enduring beauty and mystery.",
        image_url: "https://i.natgeofe.com/n/2bde2a73-3176-4793-9e9d-d1002c65ffaa/iconic-trees-h_00000201742060.jpg?w=1280&h=853"
      },
      {
        treeName: "The Jaya Sri Maha Bodhi fig tree",
        location: "Anuradhapura, Sri Lanka",
        description: "The Jaya Sri Maha Bodhi fig tree, located in the sacred city of Anuradhapura, Sri Lanka, is one of the most venerated and historically significant trees in the world. Planted in 288 BCE, it is believed to be a sapling from the original Bodhi tree in India under which Siddhartha Gautama attained enlightenment and became the Buddha. This makes the Jaya Sri Maha Bodhi not only a sacred Buddhist symbol but also one of the oldest human-planted trees with a known planting date. The tree stands as a symbol of peace, enlightenment, and resilience, drawing pilgrims and tourists alike to its roots. Protected by stone railings and supported by human care for centuries, the tree is a living monument of spiritual significance. The sight of its leaves swaying in the breeze is said to bring blessings, and it has survived numerous challenges, including storms and invasions, which further enhances its status as a symbol of endurance. For devotees, visiting the Jaya Sri Maha Bodhi is a deeply spiritual experience, one that connects them to the ancient history of Buddhism and the teachings of the Buddha himself.",
        image_url: "https://i.natgeofe.com/n/a455e1ab-9b1f-42fb-8ae0-5f6053322bfb/iconic-trees-k75155.jpg?w=1280&h=853"
      },
      {
        treeName: "Thimmamma Marrimanu",
        location: "Andhra Pradesh, India",
        description: "The Thimmamma Marrimanu, located in the Anantapur district of Andhra Pradesh, India, is widely recognized as the world’s largest banyan tree, covering an astonishing 4.7 acres. This awe-inspiring tree is not only a natural wonder but also holds significant cultural and spiritual importance. Named after a local woman, Thimmamma, who was believed to have committed sati at this very spot in 1434, the tree is seen as a symbol of devotion and is often visited by pilgrims seeking blessings for childbearing. The tree’s branches, which extend over acres of land, create a vast canopy that can shelter thousands of people underneath. Its intricate network of aerial roots makes it seem as if several trees are intertwined. In 1989, the Thimmamma Marrimanu was recognized by the Guinness World Records for its sprawling coverage, further solidifying its importance as a global natural marvel. Visitors to the site are often struck by the tree’s grandeur, feeling both connected to nature and a deep sense of peace. It remains one of India’s most significant ecological and cultural treasures.",
        image_url: "https://i.natgeofe.com/n/b161b77c-0e8a-4727-92e4-82926d6240ac/iconic-trees-b5wb2f.jpg?w=1280&h=852"
      },
      {
        treeName: "The Great Wisteria Tree",
        location: "Ashikaga Flower Park, Japan",
        description: "The Great Wisteria tree at Ashikaga Flower Park in Japan is a breathtaking natural wonder that draws visitors from around the world. This centuries-old tree spreads across nearly 2,000 square meters, creating a mesmerizing canopy of cascading lavender, white, and pink blooms during peak bloom from late April to early May. The delicate flowers hang like chandeliers, forming tunnels and archways that feel almost otherworldly. The tree has been carefully preserved over the years, making it one of the largest and most iconic wisteria displays globally. In the evening, the park illuminates the wisteria with soft lighting, transforming the landscape into a magical scene that is just as stunning as it is during the day. A visit to the Great Wisteria tree offers an enchanting and peaceful experience, leaving a lasting impression of its serene and natural beauty.",
        image_url: "https://i.natgeofe.com/n/a014e71c-a239-47b0-a870-346743634011/iconic-trees-t19y0k.jpg?w=1280&h=853"
      },
      {
        treeName: "Maior Cajueiro Do Mundo",
        location: "Pirangi do Norte, Brazil",
        description: "The Maior Cajueiro do Mundo, or the Largest Cashew Tree in the World, located in Natal, Brazil, is an awe-inspiring natural wonder. This massive tree spans nearly 8,500 square meters, making it the largest of its kind globally. Visitors are captivated by its sprawling branches, which twist and spread out over an entire city block, resembling a small forest. The tree's size is the result of a genetic mutation that causes its branches to grow horizontally and re-root, creating an intricate network of trunks. Walking beneath its expansive canopy, one can appreciate the sheer scale and marvel at how this single tree produces tons of cashews each year. The site is well-maintained, with pathways allowing visitors to explore different sections of the tree while learning about its unique history and environmental significance. A visit to the Maior Cajueiro do Mundo offers a truly unique experience, combining nature, history, and local culture in one impressive attraction.",
        image_url: "https://i.natgeofe.com/n/9466e6a2-9548-46f7-acaa-6fa03af5277a/iconic-trees-j3p116.jpg?w=1280&h=853"
      },
      {
        treeName: "Avenue of the Baobabs",
        location: "Menabe, Madagascar",
        description: "The Avenue of the Baobabs in Madagascar is a breathtaking and iconic natural wonder that draws visitors from around the world. Lined with towering baobab trees, some of which are over 800 years old and stand up to 30 meters tall, this dusty dirt road between Morondava and Belon’i Tsiribihina feels like a passage through time. The trees, with their enormous trunks and sparse branches, create a surreal and almost mythical landscape, especially during sunrise or sunset when the sky is painted in brilliant colors and the baobabs cast long, striking shadows. Once part of a dense forest, the baobabs are now the remnants of a much larger ecosystem, standing as majestic symbols of resilience and beauty. For many, walking along this avenue evokes a deep connection with nature and a sense of wonder at the longevity and endurance of these ancient trees. The Avenue of the Baobabs offers a unique, unforgettable experience and a glimpse into Madagascar’s rich ecological and cultural heritage.",
        image_url: "https://www.worldatlas.com/upload/72/6d/f8/shutterstock-1125367931.jpg"
      },
      {
        treeName: "Tree of Ténéré",
        location: "Sahara Desert",
        description: "The Tree of Ténéré, once located in the vast expanse of the Sahara Desert, stood as a powerful symbol of resilience and survival in one of the most hostile environments on Earth. For decades, this solitary acacia was considered the most isolated tree in the world, with no other vegetation for hundreds of miles. Its presence was a beacon for travelers and nomads, a living monument to the endurance of life in the harshest of conditions. The tree's roots, remarkably, reached deep into the desert to tap into an underground water source, allowing it to thrive where no other tree could. Unfortunately, the Tree of Ténéré met a tragic end in 1973 when a truck driver accidentally knocked it over. Despite its physical absence, the legacy of this extraordinary tree lives on, reminding us of nature's ability to adapt and persevere against all odds. Its memory is now preserved by a metal sculpture that marks the spot where it once stood.",
        image_url: "https://d3f9k0n15ckvhe.cloudfront.net/wp-content/uploads/2016/05/Tree-of-T%C3%A9n%C3%A9r%C3%A9-Michel-Mazeau-via-Wikimedia-Commons.jpg"
      },
      {
        treeName: "General Sherman",
        location: "Sequoia National Park, California",
        description: "The General Sherman Tree, located in California's Sequoia National Park, is a living testament to nature's grandeur and resilience. As the largest known tree by volume, this giant sequoia commands awe with its immense size, towering over 275 feet tall and boasting a trunk circumference of over 100 feet at its base. Estimated to be around 2,200 years old, General Sherman stands as a symbol of longevity and survival, having weathered millennia of environmental changes. Visitors to Sequoia National Park are often left speechless by its sheer scale, which challenges the human perspective of time and nature. Despite its massive size, the General Sherman Tree continues to grow each year, adding more wood than any other tree on Earth. Walking among the sequoias, with General Sherman as the centerpiece, offers a humbling experience, reminding us of our small place in the natural world and the incredible lifeforms that have endured long before us.",
        image_url: "https://ca-times.brightspotcdn.com/dims4/default/a8410b0/2147483647/strip/true/crop/960x1280+0+0/resize/1200x1600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F9f%2Ff2%2Fdcbe0515468eb94c87fe53b701ab%2Fla-me-sequoia-fire.JPEG"
      },
      {
        treeName: "Major Oak",
        location: "Sherwood Forest, Nottinghamshire, England",
        description: "The Major Oak, located in the heart of Sherwood Forest in Nottinghamshire, England, is a legendary tree that stands as an enduring symbol of both history and myth. Believed to be around 800 to 1,000 years old, this ancient English oak is famous for its connection to the folklore of Robin Hood, with tales claiming the outlaw used it as a hideout. The tree's immense size is awe-inspiring, with a trunk circumference of over 33 feet and branches supported by a series of wooden poles to preserve its structure. Despite its age, the Major Oak remains a robust and living testament to England’s natural heritage. Visitors to Sherwood Forest are often struck by the tree’s grandeur and the sense of timelessness it imparts. The Major Oak's sprawling canopy and gnarled trunk provide not only a connection to nature but also a deep sense of history, blending myth and reality in a way that captivates all who come to see it.",
        image_url: "https://d3f9k0n15ckvhe.cloudfront.net/wp-content/uploads/2016/05/Major-Oak-John-W.-Schulze-via-Flickr.jpg"
      },
      {
        treeName: "Arbol del Tule",
        location: "Santa Maria del Tule, Oaxaca, Mexico",
        description: "The Árbol del Tule, located in the town of Santa María del Tule, Oaxaca, Mexico, is one of the most remarkable trees in the world. This Montezuma cypress, known for its massive trunk, holds the distinction of being the tree with the widest girth in the world, measuring an astonishing 46 feet in diameter. Believed to be over 1,500 years old, the Árbol del Tule is not only an impressive natural wonder but also a living piece of Mexico’s cultural heritage. The tree’s sprawling canopy and knotted, intricate bark have fascinated visitors for centuries, and it’s often said that various shapes and faces can be seen in the textures of its bark. Its sheer size and ancient presence evoke a sense of awe and reverence, drawing thousands of visitors each year to marvel at its grandeur. For those visiting Oaxaca, the Árbol del Tule is a must-see destination, offering a rare glimpse at one of nature's true giants and a profound connection to the past.",
        image_url: "https://live.staticflickr.com/2744/4255210421_cc41ce11d2_b.jpg"
      },
      {
        treeName: "Boab Prison Tree",
        location: "near Derby, Western Australia",
        description: "The Boab Prison Tree, located near Derby in Western Australia, is an iconic and culturally significant landmark steeped in history and legend. This ancient boab, estimated to be over 1,500 years old, is unique for its hollow trunk, which has a circumference of around 46 feet. Historically, the tree is said to have been used as a holding cell for Indigenous prisoners during the late 19th century, as they were transported to Derby for sentencing. Although the full extent of its use as a 'prison' is debated, the tree stands as a haunting symbol of the colonial era’s impact on Aboriginal communities. The Boab Prison Tree’s sprawling branches and bulbous trunk make it an impressive natural monument, and it is now protected, with visitors able to view it from a respectful distance. Its cultural significance to both Indigenous Australians and local history makes it an essential stop for those exploring the Kimberley region, providing not only a connection to Australia's unique natural environment but also a somber reminder of the country’s complex past.",
        image_url: "https://res.cloudinary.com/simpleview/image/upload/v1686261309/clients/australiasnwtourism/Taryn_Yeates_Photography_432_d11a1792-36fb-40d4-829d-35b435588678.jpg"
      },
      {
        treeName: "Tree of Life",
        location: "Arabian Desert, Bahrain",
        description: "The Tree of Life, located in Bahrain, is an extraordinary natural wonder that stands isolated in the Arabian Desert, defying the harsh, arid conditions surrounding it. Estimated to be over 400 years old, this mesquite tree has baffled scientists and locals alike, as it thrives with no visible water source in one of the driest areas on Earth. Its deep roots are believed to tap into underground aquifers, though its survival remains a mystery. For centuries, the Tree of Life has been a symbol of resilience and endurance, attracting visitors from all over the world who are drawn to its unique ability to flourish in such an unforgiving environment. The tree has also gained cultural and mythological significance, with some local legends associating it with the Garden of Eden. Standing majestically against the barren desert backdrop, the Tree of Life is a testament to nature’s tenacity, offering a moment of awe and reflection to those who visit this remote yet remarkable site.",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Tree_of_Life%2C_Bahrain_-_%E0%B4%9C%E0%B5%80%E0%B4%B5%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B4%B0%E0%B4%82%2C_%E0%B4%AC%E0%B4%B9%E0%B5%8D%E0%B4%B1%E0%B5%88%E0%B5%BB_01.JPG"
      },
      {
        treeName: "Cedars of God",
        location: "Qadisha Valley, Lebanon",
        description: "The Cedars of God, nestled in Lebanon’s Qadisha Valley, are a breathtaking testament to the enduring majesty of nature and the rich historical legacy of the region. These ancient cedar trees, some of which are thousands of years old, have long been revered for their beauty, strength, and spiritual significance. Once covering vast stretches of Lebanon, the cedars were prized by ancient civilizations, including the Phoenicians, Egyptians, and Romans, for their high-quality wood, which was used in everything from shipbuilding to constructing temples and palaces. Today, the Cedars of God stand as a UNESCO World Heritage site, preserving one of the last remnants of these once-great forests. Walking among these towering giants, visitors are transported through time, feeling a deep connection to the region's cultural heritage and the ancient peoples who revered these trees. Despite centuries of exploitation, the remaining trees are a symbol of resilience and conservation, offering an unforgettable experience to nature lovers, history enthusiasts, and pilgrims alike.",
        image_url: "https://live.staticflickr.com/1581/26554503035_7b357207ab_k.jpg"
      },
    ];
    const treeIds = [];

    for (const tree of trees) {
      const treeId = await createTree({
        treeName: tree.treeName,
        location: tree.location,
        description: tree.description,
        image_url: tree.image_url
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
      {
        text: "What an amazing experience. The sheer size of this trees canopy is so surreal.. it almost feels like a movie prop.",
        rating: 5,
        user_id: userIds[4],
        tree_id: treeIds[15]
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
      {
        text: "Ya, I could definitely see this being some kind of end-level bosses' hideout",
        review_id: reviewIds[15].id,
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
