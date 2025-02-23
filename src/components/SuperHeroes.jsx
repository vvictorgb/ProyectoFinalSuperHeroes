import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuperHeroes.css';
import axios from 'axios';

const API_KEY = 'cb68b1697de19709679ba397a6b78d3a';

const getRandomIds = (count, min, max) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(ids);
};

const SuperHeroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroes = async () => {
      const randomIds = getRandomIds(100, 1, 731); 
      try {
        const heroPromises = randomIds.map(id => 
          axios.get(`https://superheroapi.com/api.php/${API_KEY}/${id}`)
            .then(response => response.data)
            .catch(error => {
              console.error(`Error fetching hero ${id}:`, error);
              return null;
            })
        );

        const allHeroes = await Promise.all(heroPromises);
        setHeroes(allHeroes.filter(hero => hero && hero.image));
      } catch (error) {
        console.error('Error fetching superheroes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  const addToDeck = (hero) => {
    const mazo = JSON.parse(localStorage.getItem('miMazo')) || [];

    if (mazo.length >= 6) {
      alert('¡Tu mazo ya tiene 6 héroes! No puedes añadir más.');
    } else if (mazo.some(h => h.id === hero.id)) {
      alert('Este héroe ya está en tu mazo.');
    } else {
      mazo.push(hero);
      localStorage.setItem('miMazo', JSON.stringify(mazo));
    }

    navigate('/miMazo');
  };

  if (loading) {
    return <div>Cargando héroes...</div>;
  }

  return (
    <div className="heroes-container">
      <h1 className="title">Superhéroes Disponibles</h1>
      <div className="heroes-grid1">
        {heroes.map(hero => (
          <div key={hero.id} className="custom-hero-card">
            <img src={hero.image.url} alt={hero.name} className="hero-image1" />
            <h2 className="hero-name1">{hero.name}</h2>
            <p className="hero-info1">{hero.biography['full-name']}</p>
            <button className="add-button" onClick={() => addToDeck(hero)}>Añadir al Mazo</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperHeroes;
