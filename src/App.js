import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SuperHeroes from './components/SuperHeroes';

import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/superheroes" element={<SuperHeroes />} />
      </Routes>
    </Router>
  );
}

export default App;
