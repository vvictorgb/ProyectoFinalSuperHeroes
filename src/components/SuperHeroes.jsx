import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuperHeroes.css';
import axios from 'axios';

const API_KEY = 'cb68b1697de19709679ba397a6b78d3a';

const heroesIds = [
  644, 2, 890, 4, 5, 6, 122, 8, 9, 10, 
  11, 12, 13, 14, 15, 125, 110, 135, 201, 132, 
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
  105, 52, 53, 54, 55, 56, 57, 58, 210, 60, 
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100,659
];

const SuperHeroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getFixedHeroes = async () => {
      try {
        const heroPromises = heroesIds.map(id => 
          axios.get(`https://superheroapi.com/api.php/${API_KEY}/${id}`)
            .then(response => response.data)
            .catch(error => {
              console.error('Error fetching superhero:', error);
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

    getFixedHeroes();
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
