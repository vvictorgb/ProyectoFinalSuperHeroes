import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home';
import SuperHeroes from './components/SuperHeroes';
import Header from './components/Header';
import MiMazo from './components/MiMazo';
import ArenaDeBatalla from './components/ArenaDeBatalla';

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

 
  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!isAuthenticated) {
    loginWithRedirect();
    return null; 
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/superheroes" element={<SuperHeroes />} />
        <Route path="/MiMazo" element={<MiMazo />} />
        <Route path="/Arena" element={<ArenaDeBatalla />} />
      </Routes>
    </Router>
  );
}

export default App;

