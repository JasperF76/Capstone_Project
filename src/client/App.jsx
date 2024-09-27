import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Trees from './components/Trees';
import SingleTree from './components/SingleTree';
import Nav from './components/Nav';
import Account from './components/Account';
import CreateTree from './components/CreateTree';
import About from './components/About';
import MainPageImage from './assets/AnimatedForest.gif';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [tree, setTree] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [user, setUser] = useState({ reviews: [], comments: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      fetch("/api/users/me", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setIsAdmin(data.user.isadmin);
      });
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  return (
    <div className='App'>
      <Nav token={token} setToken={setToken} user={user} setIsAdmin={setIsAdmin} />
      {location.pathname === '/' && (
        <>
          <h1 className='main-header'>Trees of the World</h1>
          <img
            id='trees-img'
            className='mainpage-img'
            src={MainPageImage}
            style={{ width: '100%', height: '400px' }}
            alt="a forest"
          />

        </>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Trees setTree={setTree} token={token} isAdmin={isAdmin} />} />
          <Route path="/trees/:id" element={<SingleTree tree={tree} token={token} user={user} />} />
          <Route path="/users/login" element={<Login user={user} setUser={setUser} token={token} setToken={setToken} />} />
          <Route path="/users/register" element={<Register setToken={setToken} />} />
          <Route path="/users/me" element={<Account token={token} setToken={setToken} user={user} setUser={setUser} isAdmin={isAdmin} />} />
          <Route path="/trees/new_tree" element={isAdmin ? (<CreateTree token={token} />) : (<Navigate to="/" />)} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Ticker Facts */}

      </div><div className="ticker-tape">
        <div className="ticker">
          <div className="ticker__item">Suburbs and homes with barren landscapes have been shown to have an increased incidence of violence both inside and outside of the home... </div>
          <div className="ticker__item">Research indicates that the presence of urban trees in an area are correlated with lower crime rates including vandalism, graffiti, and littering...</div>
          <div className="ticker__item">The bark of trees that grow in the shade is mostly thin, while the bark of trees that grow in sunny places is thicker...</div>
          <div className="ticker__item">Trees can communicate and defend themselves against attacking insects. Scientists have found that trees can flood their leaves with chemicals called phenolics when the insects begin their raid. They can also signal danger to other trees so they can start their own defense...</div>
          <div className="ticker__item">Earth has more than 80,000 edible plant species...</div>
          <div className="ticker__item">Nutrients and water are absorbed by the root system and carried via the connective tissue to the leaves. Leaves, in turn, transfers sugar down through the connective tissue to the roots...</div>
          <div className="ticker__item">Even though we call the plants that produce bananas trees, they have no wood trunk. Instead, they have a fibrous, watery main stalk supported by interior water pressure...</div>
          <div className="ticker__item">Hospital patients who can see fresh green trees from their rooms are reported to heal faster and spend less time in the hospital than those without. Patients with a view of trees spend 8% fewer days in the hospital...</div>
          <div className="ticker__item">Consumers tend to spend more money in shopping districts with trees. They are willing to pay more for items purchased in a shopping district with trees. Those same shoppers are also willing to stay longer and rate the products and stores as higher quality in shopping districts with trees...</div>
          <div className="ticker__item">Trees can mask unsightly views, from concrete walls to parking areas. Not only do they offer us a pleasant green landscape, but also muffle massive amounts of sound from nearby streets and highways all while decreasing glare and dust...</div>
          <div className="ticker__item">A massive oak tree can drop nearly 10,000 acorns in one year...</div>
          <div className="ticker__item">Trees improve the water quality by slowing and filtering rainwater and protecting aquifers and watersheds...</div>
          <div className="ticker__item">Tree’s airborne signals can even transmit information outside the plant kingdom. Some have been shown to attract parasites and predators that kill insects, essentially letting a tormented tree call for backup. For instance, apple trees under attack by caterpillars release chemicals that attract caterpillar-eating birds...</div>
          <div className="ticker__item">Babies born in areas with greater numbers of trees are less likely to be born underweight...</div>
          <div className="ticker__item">According to the botanical definition, palms are not trees but massive, woody herbs...</div>
          <div className="ticker__item">Nearly 16 billion trees are lost every year due to forest management, deforestation, and variations in land use...</div>
          <div className="ticker__item">The parts of a tree grow at different times throughout the year: typically, most of the foliage growth occurs in the spring, followed by trunk growth in the summer, and root growth in the fall and winter...</div>
          <div className="ticker__item">The saying ‘knock on wood’ comes from the ancient pagan rituals where it was believed that good spirits resided inside trees...</div>
          <div className="ticker__item">Never take shelter under a tree during a storm. Electricity always takes the ‘path of least resistance’ meaning the tallest object will be struck first, so steer clear...</div>
          <div className="ticker__item">The ailanthus altissimo, or tree of heaven, is said to be the only tree that can grow in cement...</div>
          <div className="ticker__item">Trees have a symbiotic relationship with mycorrhizal fungi that live in their roots. These fungi help trees absorb more water and mineral from the soil, and in turn, trees give fungi sugar molecules, derived in photosynthesis...</div>
          <div className="ticker__item">The average tree living in the city has a life expectancy of merely 8 years...</div>
          <div className="ticker__item">A single tree can absorb as much carbon annually as a car makes while driving 26,000 miles...</div>
          <div className="ticker__item">An average tree can drink up to 2000 liters of water annually. A massive oak tree can drink up to 100 gallons of water out of the ground per day...</div>
          <div className="ticker__item">The most poisonous tree in the world is the manchineel tree, which is native to Florida. If consumed, its fruit can kill a person. Also, standing under the tree during a rainstorm can cause blisters, and the smoke from a burning tree can blind a person...</div>
          <div className="ticker__item">Some trees are used to produce drugs, for instance, the bark of a willow tree is used for producing aspirin, and the Yew tree is used for making drugs such as Taxol...</div>
          <div className="ticker__item">In the year 2012, a Florida meth-addict named Sarah Barnes accidentally burned down the world’s fifth oldest tree when she tried to smoke in the hollow of the tree. Named "Senator", the ancient tree was nearly 3,500 years old...</div>
          <div className="ticker__item">In 2010 massive floods in areas of Pakistan caused millions of spiders to climb up into the trees to escape the rising water. When the floodwaters receded, the trees were all enveloped in spider webs. Fortunately, the trees still served a useful purpose in reducing the mosquito population in the wake of the floods...</div>
          <div className="ticker__item">Kids living in places with more trees have a lower chance of asthma...</div>
          <div className="ticker__item">Pine trees grow on six of seven continents, with Antarctica being the only one left out...</div>
          <div className="ticker__item">The sandbox tree is covered in spikes, contains toxic sap, and has exploding fruits. Nicknamed the ‘Dynamite Tree’, its fruit explodes when ripe, sending hardened seeds over a 60-foot radius at 150 miles per hour...</div>
          <div className="ticker__item">Trees absorb nearly 90% of nutrition from the atmosphere. Only 10% of the tree’s nutrition is absorbed from the soil...</div>
          <div className="ticker__item">Bamboo is considered the largest member of the grass family. Theoretically, then, bamboo forests might actually be fields of giant grass...</div>
          <div className="ticker__item">A single mature oak, for instance, can transpire more than 40,000 gallons of water in a year – meaning that’s how much flows from its roots to its leaves, which release water as vapor back into the air. That's about 109 gallons per day. Massive trees move even more water: A huge sequoia, whose trunk maybe 300 tall, can transpire nearly 500 gallons a day. And since trees emit water vapor, large forests also help make it rain...</div>
          <div className="ticker__item">One sugar maple can remove 60 milligrams of cadmium, 140 mg of chromium, and 5,200 mg of lead from the soil per year, and research has shown that farm runoff contains up to 88% less nitrate and 76% less phosphorous after flowing through a forest...</div>
          <div className="ticker__item">The fruits of the cocoa tree offer the base ingredients of chocolate. Coffee beans are extracted from the berry of the coffee tree. Two of your favorite things come from trees...</div>
          <div className="ticker__item">People who reside in areas with higher tree numbers have fewer cardio-metabolic health difficulties and are less likely to die of cardiovascular or pulmonary disease...</div>
          <div className="ticker__item">Dendrochronology - the process of dating a tree by studing it's rings - can not only reveal a tree's age, but can also indicate the happening of natural disasters such as a drought event or volcanic eruption...</div>
          <div className="ticker__item">The Joshua Tree got it's name from a group of Mormon settlers crossing the Mojave in the mid-19th century. The shape of the tree’s branches reminded them of a biblical passage wherein Joshua raises his hands to the sky in prayer...</div>
          <div className="ticker__item">Trees increase the value of property. Houses surrounded by trees sell for 18-25% higher than houses with no trees...</div>
          <div className="ticker__item">Pinecones have genders. Female pinecones make seeds and male pinecones shed pollen. When the wind blows pollen into the female pinecones, the seeds become pollinated...</div>
          <div className="ticker__item">Most tree roots remain in the top 18 inches of soil, but they can also grow above ground or dive a few hundred feet under...</div>
          <div className="ticker__item">The root system of mature oak, for instance, can be HUNDREDS OF MILES in length... I had to fact-check that one...</div>
          <div className="ticker__item">Bald cypress grows along swamps and rivers, and some of its roots form exposed ‘knees’ that supply air to underwater roots like a snorkel. Similar breathing tubes, called pneumatophores, are also found in the stilt roots of some mangrove trees, along with other adaptations like the ability to filter up to 90% of salt out of seawater...</div>
          <div className="ticker__item">Although most tree roots remain in the top 18 inches of soil, trees have been known to go more than 20 ft (6 meters) below the surface under ideal conditions, and a wild fig at South Africa’s Echo Caves has reportedly reached a record root depth of 400 ft...</div>
          <div className="ticker__item">Trees can protect us against skin cancer by decreasing harmful UV exposure by up to 50%. It’s highly significant for trees to be planted in high-traffic areas like playgrounds and school campuses – where children spend hours outdoors...</div>
          <div className="ticker__item">In northern temperate climates, moss grows on the northern side of the tree trunk, where there is more shade, and if you’re in the Northern Hemisphere, you can see the rings of the tree grow slightly thicker on the southern side since it receives more sunlight. In the Southern Hemisphere, the opposite is true, with rings being thicker on the Northern side. Remember that if you ever get lost in the forest...</div>
          <div className="ticker__item">Trees do not heal when they are damaged by regenerating cells as other living organisms do. Instead, a wounded tree protects itself by building a wall around the damaged area, which slows or prevents the disease and decay spread...</div>
          <div className="ticker__item">Trees that grow in humid areas or near massive water bodies have broad, big leaves. Trees that grow in dry environments have small, hard leaves, which decrease water loss...</div>
          <div className="ticker__item">Why was the weeping willow sad? It watched a sappy movie...</div>
          <div className="ticker__item">A mature, living tree is about 99% dead. The parts of a tree that are alive are the root tips, leaves, and the vascular system – the conductive tissue called phloem and xylem (a thin layer under the bark that delivers nutrients and sugars). The tissue that we call “wood” is actually dead cells that simply support structures...</div>
          <div className="ticker__item">Three trees, if planted in the right places around a building, can cut air-conditioning costs up to 50%...</div>
          <div className="ticker__item">Trees in a landscape lower heart rates, relax us and decrease stress...</div>
          <div className="ticker__item">Cottonwood seeds can stay airborne for days, which is much longer than any other type of seed...</div>
          <div className="ticker__item">There are Eucalyptus trees in Hawaii with natural rainbow-colored barks...</div>
          <div className="ticker__item">There is a cultured underground network where all plants share nutrients. Fungi is responsible for moving water, carbon, and some other nutrients among the trees through this system, contingent upon their requirements...</div>
          <div className="ticker__item">Justin Timberlake has a business initiative to figure out his concert’s carbon footprints and pays to have trees planted in those cities to offset carbon impact during his tours...</div>
          <div className="ticker__item">The blackest wood in the world is Ebony...</div>
          <div className="ticker__item">Osage Orange is the wood species that creates the most heat when burned...</div>
          <div className="ticker__item">Olive trees are resistant to droughts, disease, and even fire. In fact, some olive groves are thousands of years old...</div>
          <div className="ticker__item">Trees can tell if deer are trying to eat them. Due to their ability to sense deer saliva, trees protect themselves by creating excess acids that cause their buds to taste bitter so that the deer will lose interest and leave them alone...</div>
          <div className="ticker__item">Some red maples can change their sex from one year to the next. One spring a tree might produce mostly male flowers, the next, mostly females...</div>
          <div className="ticker__item">The largest pine cones in the world belong to the Coulter pine of Southern California. Each one can weigh 10 pounds, and the locals call them “widowmakers...”</div>
          <div className="ticker__item">The word Adirondack comes from a Mohawk word that means “tree eater.” It’s an insulting term that was directed at the neighboring Algonquin tribes, who ate the inner bark of white pine and other trees as emergency rations. The same word also means “porcupine”—a true tree-eater that lives off bark and conifer needles in the winter months...</div>
          <div className="ticker__item">Giant sequoia trees can have a layer of bark two feet thick...</div>
          <div className="ticker__item">In a phenomenon called allelopathy, some trees’ roots release chemicals into the soil that suppress the growth of other plants. Walnuts are famous for this, but hackberry and tree-of-heaven do it, too...</div>
          <div className="ticker__item">Six ginkgo trees survived the nuclear bomb in Hiroshima in 1945 and live on to this day. The survivor closest to the blast was less than a mile from Ground Zero...</div>
          <div className="ticker__item">Some trees have been to the moon. “Moon trees'' were grown from seeds taken to the moon during the Apollo 14 mission in early 1971. NASA and the US Forest Service wanted to see if the moon’s orbit caused the seeds to grow differently back on earth. These trees were donated to state forestry services in 1975 and 1976...</div>
          <div className="ticker__item">Contrary to what many people believe, if a birdhouse is hung on a tree branch, it won’t move up the tree as the tree grows. This is because trees grow from their tips, in specialized cells called meristems. Because trees grow from their most distal ends, a branch will always be the same height as it was the day it emerged from the trunk as a little bud...</div>
          <div className="ticker__item">Although it is commonly referred to by many as an "apple", the type of fruit eaten by Adam and Eve in the Garden of Eden is not identified specifically, only being called "fruit"...</div>
          <div className="ticker__item">It takes around 450 mature trees to offset the annual emissions of one person...</div>
          <div className="ticker__item">There are estimated to be around 3.04 trillion trees in the world (that's 3,040,000,000,000 written out)...</div>
          <div className="ticker__item">A study by Nature Portfolio estimates that we cut down 15 billion trees every year, while the UN Environmental Programme reports that we only plant around 1.9 billion new trees a year. I'm no mathemetician, but this seems like a big problem...</div>
          <div className="ticker__item">Younger trees are significantly less beneficial than mature ones in terms of carbon capture and biodiversity, so tree planting is not a quick fix. Rather than just planting new trees, for example, some argue we should put an end to deforestation...</div>
          <div className="ticker__item">Trees are homes for all manner of wildlife. In the UK more than 500 invertebrates feed on birches, oak trees support 31 different mammals, and common hawthorn can support up to 300 different insects. That’s not to mention the countless number of birds that feed on a tree’s fruit, nuts and berries...</div>
          <div className="ticker__item">The world’s oldest tree, Methuselah, was around when the ancient of pyramids of Egypt were built...</div>
          <div className="ticker__item">The world’s smallest tree is the dwarf willow, which lives in cold and high parts of the world. The jury’s out on whether this plant can really be called a tree, but it is a single-stemmed woody plant which produces tiny lateral branches...</div>
          <div className="ticker__item">The rarest tree in the world is Pennantia baylisiana, or the Three Kings kaikōmako, which is endemic to the Manawatāwhi islands near New Zealand. Discovered in 1945, this tree has been propagated, but only one exists in the wild...</div>
          <div className="ticker__item">One large tree can provide a day’s supply of oxygen for up to four people...</div>
          <div className="ticker__item">More than 20% of the world’s oxygen is produced in the Amazon Rainforest...</div>
          <div className="ticker__item">In 1997, New York City spent $1.5 billion to preserve the forested watershed that supplies New York City’s drinking water by purchasing thousands of upstate acres of forested watershed. A filtration plant large enough to clean New York City’s water supply would have cost more than $6 billion dollars...</div>
          <div className="ticker__item">Trees lower surface and air temperatures by providing shade. Shaded surfaces may be 20–45°F cooler than the peak temperatures of unshaded materials...</div>
          <div className="ticker__item">Every dollar spent on planting and caring for a community tree yields benefits that are two to five times that investment—benefits that include cleaner air, lower energy costs, improved water quality and storm water control and increased property values...</div>
          <div className="ticker__item">In Indianapolis, each dollar invested in the city’s community trees yielded $5.55 in benefits...</div>
          <div className="ticker__item">Adding one tree to an open pasture can increase its bird biodiversity from almost zero species to as high as 80...</div>
          <div className="ticker__item">Tropical rainforests cover less than 3% of Earth's area, yet they are home to more than 1/2 of our planet's terrestrial animal species...</div>
          <div className="ticker__item">Humans removed a football field-sized plot of primary rainforest every 6 seconds in the year 2019...</div>
          <div className="ticker__item">Areas managed by indigenous peoples, which make up approximately 28% of the world's land surface, include some of the most ecologically intact forests in the world, and are hotspots of biodiversity...</div>
          <div className="ticker__item">Forests currently absorb 30% of all CO2 emissions worldwide...</div>
          <div className="ticker__item">Trees are the longest living organisms on earth...</div>
          <div className="ticker__item">A mature birch tree can produce up to 1 million seeds per year...</div>
          <div className="ticker__item">The Tahina spectablilis is a palm tree that commits suicide. The tree spends decades growing to around 20 meters tall, and once happy with its height and maturity, explodes with nectar-rich, fruiting blossoms. This bursting of flowers depletes the tree’s nutrients, leaving few resources to hold itself upright, until it eventually collapses. The Tahina spectablilis literally flowers itself to death...</div>
          <div className="ticker__item">Hiking off-trail to see Hyperion, the world's tallest tree, can get you 6 months in jail and a $5,000 fine. Since it was "discovered" by amateur naturalists, the social trails to it have increased, leading to trampled vegetation, garbage being left on the site, and damage to the tree, leading officals to declare the area off limits. This is why we can't have nice things...</div>
          <div className="ticker__item">58% of tree species are unique to a single country. If you wanted to visit every known species of tree on the planet, you’d rack up a lot of frequent flyer miles...</div>
          <div className="ticker__item">Leaves appear green because chlorophyll absorbs red and blue light energy, causing the green energy to bounce off the leaf’s surface...</div>
          <div className="ticker__item">Fallen tree leaves create compost that enriches the soil...</div>
          <div className="ticker__item">The rare Wollemi tree was once thought to be extinct, but then it was found in a temperate rainforest in 1994 in Australia‘s Wollemi National Park. The species dates all the way back to the Jurassic era when dinosaurs walked the earth...</div>
          <div className="ticker__item">The Wright brothers used the wood from a spruce tree to build the Flyer, their first aircraft...</div>
          <div className="ticker__item">A tree now known as the “Survivor Tree” was remarkably found alive at Ground Zero after the September 11 attacks on the World Trade Center. This Callery pear tree was nursed back to health in a Bronx nursery and is now part of the National September 11 Memorial and Museum...</div>
          <div className="ticker__item">Forests make up one-third of the Earth’s land surface which is more than 15 million square miles...</div>
          <div className="ticker__item">Cherry tree blossom petals are edible and are used to make many traditional Japanese sweets and tea...</div>
          <div className="ticker__item">It takes about 40 gallons of maple tree sap to produce one gallon of maple syrup. Thank a maple tree next time you take a bite of pancake...</div>
          <div className="ticker__item">The Dragon Blood Tree is shaped like an umbrella and releases bright red resin if its bark is injured, making it look like it’s bleeding, just like people...</div>
          <div className="ticker__item">Dead trees play an essential role in the ecosystem. Dead wood creates a steady source of nitrogen and microhabitats for as much as 40 percent of woodland wildlife from fungi and mosses to insects and birds...</div>
          <div className="ticker__item">In Greek mythology, the oak is the sacred tree of Zeus, the king of the gods. Oak trees are sacred in many cultures...</div>
          <div className="ticker__item">Acorns are a major food source for more than 100 vertebrate species, including squirrels, deer, rabbits and opossums...</div>
          <div className="ticker__item">Palm trees produce other foods besides coconuts. Dates, acai fruit and betel nuts also come from palm trees...</div>
          <div className="ticker__item">The cherry trees of Washington D.C. were originally gifted to the United States by the Mayor of Tokyo, Japan in 1912. The annual Cherry Blossom Festival in the spring celebrates the friendship between the two countries...</div>
          <div className="ticker__item">Apple trees need four to five years to produce their first fruit...</div>
          <div className="ticker__item">Pine tree leaves are needle-shaped, which helps snow slide off them during the winters. Heavy amounts of snow would otherwise break their branches...</div>
          <div className="ticker__item">What’s a tree’s least favorite month? Sep-timber...</div>
        </div>
      </div>
    </div>
  );

}



export default App;
