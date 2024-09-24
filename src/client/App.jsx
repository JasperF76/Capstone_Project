import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Trees from './components/Trees';
import SingleTree from './components/SingleTree';
import Nav from './components/Nav';
import Account from './components/Account';
import MainPageImage from './assets/AnimatedForest.gif';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [tree, setTree] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [user, setUser] = useState({ reviews: [], comments: [] });
  const location = useLocation();

  return (
    <div className='App'>
      <Nav token={token} setToken={setToken} />
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
          <Route path="/" element={<Trees setTree={setTree} />} />
          <Route path="/trees/:id" element={<SingleTree tree={tree} token={token} user={user} />} />
          <Route path="/users/login" element={<Login user={user} setUser={setUser} token={token} setToken={setToken} />} />
          <Route path="/users/register" element={<Register setToken={setToken} />} />
          <Route path="/users/me" element={<Account token={token} setToken={setToken} user={user} setUser={setUser} />} />
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
          <div className="ticker__item">An average tree can drink up to 2000 liters of water annually. A massive tree can quickly drink up to 100 gallons of water out of the ground...</div>
          <div className="ticker__item">The most poisonous tree in the world is the manchineel tree, which is native to Florida. If consumed, its fruit can kill a person. Also, standing under the tree during a rainstorm can cause blisters, and the smoke from a burning tree can blind a person...</div>
          <div className="ticker__item">Some trees are used to produce drugs, for instance, the bark of a willow tree is used for producing aspirin, and the Yew tree is used for making drugs such as Taxol...</div>
          <div className="ticker__item">In the year 2012, a Florida meth-addict named Sarah Barnes accidentally burned down the world’s fifth oldest tree when she tried to smoke in the hollow of the tree. Named Senator, the ancient tree was nearly 3,500 years old...</div>
          <div className="ticker__item">In 2010 massive floods in areas of Pakistan caused millions of spiders to climb up into the trees to escape the rising water. When the floodwaters receded, the trees were all enveloped in spider webs. Fortunately, the trees still had a useful function in reduce the mosquito population in the wake of the floods...</div>
          <div className="ticker__item">Kids living in places with more trees have a lower chance of asthma...</div>
          <div className="ticker__item">Pine trees grow on six of seven continents, with Antarctica being the only one left out...</div>
          <div className="ticker__item">The sandbox tree is covered in spikes, contains toxic sap, and has exploding fruits. Nicknamed the ‘Dynamite Tree’, its fruit explodes when ripe, sending hardened seeds over a 60-foot radius at 150 miles per hour...</div>
          <div className="ticker__item">Trees absorb nearly 90% of nutrition from the atmosphere. Only 10% of the tree’s nutrition is absorbed from the soil...</div>
        </div>
      </div>
    </div>
  );

}



export default App;
