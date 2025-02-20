import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArenaDeBatalla.css';
import axios from 'axios';

const API_KEY = 'cb68b1697de19709679ba397a6b78d3a';

const villanosIds = [263, 332, 346, 149, 423, 659];

const ArenaDeBatalla = () => {
  const [miMazo, setMiMazo] = useState([]);
  const [villanos, setVillanos] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [peleando, setPeleando] = useState(false);

  useEffect(() => {
    const mazoGuardado = JSON.parse(localStorage.getItem('miMazo')) || [];
    setMiMazo(mazoGuardado);
  }, []);

  useEffect(() => {
    const fetchVillanos = async () => {
      try {
        const promises = villanosIds.map(id => 
          axios.get(`https://superheroapi.com/api.php/${API_KEY}/${id}`)
            .then(response => response.data)
            .catch(error => {
              console.error('Error al obtener villanos:', error);
              return null;
            })
        );
        const data = await Promise.all(promises);
        setVillanos(data.filter(villain => villain && villain.image));
      } catch (error) {
        console.error('Error al obtener villanos:', error);
      }
    };

    fetchVillanos();
  }, []);

  const iniciarBatalla = () => {
    if (miMazo.length < 6) {
      setPeleando(true);
      setTimeout(() => setResultado('derrota'), 1000);
    } else {
      setPeleando(true);
      setTimeout(() => {
        const resultadoAleatorio = Math.random() < 0.5 ? 'victoria' : 'derrota';
        setResultado(resultadoAleatorio);
      }, 1000);
    }
  };

  const volverIntentar = () => {
    setResultado(null);
    setPeleando(false);
  };

  return (
    <div className="arena-container">
      <h1 className="arena-title">⚔️ Arena de Batalla ⚔️</h1>

      <div className="battle-area">
        <div className="team">
          <h2>🦸‍♂️ Tu Equipo</h2>
          <div className="cards-grid2">
            {miMazo.map(hero => (
              <div key={hero.id} className="hero-card2">
                <img src={hero.image.url} alt={hero.name} className="hero-image2" />
                <h3 className="hero-name2">{hero.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="vs-section">
          <h1 className="vs-text">VS</h1>
        </div>

        <div className="team">
          <h2>🦹‍♂️ Villanos</h2>
          <div className="cards-grid2">
            {villanos.map(villain => (
              <div key={villain.id} className="hero-card2">
                <img src={villain.image?.url} alt={villain.name} className="hero-image2" />
                <h3 className="hero-name2">{villain.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="fight-button" onClick={iniciarBatalla} disabled={peleando}>
        ⚡ ¡Luchar! ⚡
      </button>

      {resultado && (
        <div className={`battle-result ${resultado}`}>
          {resultado === 'victoria' ? <h2>🏆 ¡Has Ganado!</h2> : <h2>💀 Has Perdido...</h2>}
          <button onClick={volverIntentar} className="retry-button">
            🔄 Volver a Intentar
          </button>
        </div>
      )}

      <Link to="/" className="back-button">🏠 Volver al Inicio</Link>
    </div>
  );
};

export default ArenaDeBatalla;