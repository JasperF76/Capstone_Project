import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Trees from './components/Trees';
import SingleTree from './components/SingleTree';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);
  const [tree, setTree] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();

  return (
    <div className='App'>
      {location.pathname === '/' && (
        <>
          <h1>Iconic Trees of the World</h1>
          <img
            id='trees-img'
            src='https://res.cloudinary.com/dgnvposhn/images/w_2560,h_1707,c_scale/f_auto,q_auto/v1711048682/wordpress_assets/DJI_0264_y1ccpm/DJI_0264_y1ccpm.jpg?_i=AA'
            style={{ width: '100%', height: '400px' }}
            alt="a forest"
          />
        </>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Trees setTree={setTree} />} />
          <Route path="/trees/:id" element={<SingleTree tree={tree} />} />
          {/* <Route path="/login" element = {<Login user={user} setUser={setUser} /> }/> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
