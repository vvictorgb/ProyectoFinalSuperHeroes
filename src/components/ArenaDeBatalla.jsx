import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArenaDeBatalla.css';

const API_KEY = 'cb68b1697de19709679ba397a6b78d3a';

const villanosIds = [423, 399, 303, 307, 423, 298];

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
      const promises = villanosIds.map(id =>
        fetch(`https://superheroapi.com/api.php/${API_KEY}/${id}`)
          .then(response => response.json())
          .catch(error => console.error('Error al obtener villanos:', error))
      );
      const data = await Promise.all(promises);
      setVillanos(data);
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
    setPeleando(false);  // Restablece el estado de pelea
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
