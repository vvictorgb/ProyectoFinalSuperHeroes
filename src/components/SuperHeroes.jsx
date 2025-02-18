import { useEffect, useState } from 'react';
import '../styles/SuperHeroes.css';

const API_KEY = 'cb68b1697de19709679ba397a6b78d3a'; // Tu clave de API

// Definir los 100 héroes con sus IDs o nombres.
const heroesIds = [
  644, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
  105, 52, 53, 54, 55, 56, 57, 58, 210, 60, 
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100
];

const SuperHeroes = ({ addToDeck }) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener héroes fijos con sus ID's
  const getFixedHeroes = async () => {
    try {
      // Crear un array de promesas para todas las solicitudes de los héroes
      const heroPromises = heroesIds.map(id => 
        fetch(`https://superheroapi.com/api.php/${API_KEY}/${id}`)
          .then(response => response.json())
          .then(data => data)
          .catch(error => {
            console.error('Error fetching superhero:', error);
            return null; // Si ocurre un error, devolver null
          })
      );

      // Esperar que todas las promesas se resuelvan
      const allHeroes = await Promise.all(heroPromises);

      // Filtrar los héroes que tengan imagen
      return allHeroes.filter(hero => hero && hero.image);
    } catch (error) {
      console.error('Error fetching superheroes:', error);
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);

    // Obtener los héroes fijos cuando el componente se monta
    getFixedHeroes()
      .then(fixedHeroes => {
        setHeroes(fixedHeroes); // Guardamos los héroes en el estado
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching superheroes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando héroes...</div>;
  }

  return (
    <div className="heroes-container">
      <h1 className="title">Superhéroes Disponibles</h1>
      <div className="heroes-grid">
        {heroes.map(hero => (
          <div key={hero.id} className="hero-card">
            <img src={hero.image.url} alt={hero.name} className="hero-image" />
            <h2 className="hero-name">{hero.name}</h2>
            <p className="hero-info">{hero.biography['full-name']}</p>
            <button className="add-button" onClick={() => addToDeck(hero)}>Añadir al Mazo</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperHeroes;
