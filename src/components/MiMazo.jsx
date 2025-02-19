import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MiMazo.css";

const MiMazo = () => {
  const [mazo, setMazo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMazo = JSON.parse(localStorage.getItem("miMazo")) || [];
    setMazo(storedMazo);
  }, []);

  const removeHero = (id) => {
    const updatedMazo = mazo.filter((hero) => hero.id !== id);
    setMazo(updatedMazo);
    localStorage.setItem("miMazo", JSON.stringify(updatedMazo));
  };

  return (
    <div className="miMazo-container">
      <h1 className="title">⚔️ ¡Tu Mazo de Héroes! ⚔️</h1>
      {mazo.length === 0 ? (
        <div className="empty-mazo">
          <h2>No has seleccionado héroes aún. 😢</h2>
          <p>¡Regresa y elige a tus campeones para luchar contra los villanos! 🦸‍♂️</p>
          <button onClick={() => navigate("/superheroes")} className="explore-button">
            Elegir Héroes
          </button>
        </div>
      ) : (
        <div className="heroes-grid">
          {mazo.map((hero) => (
            <div key={hero.id} className="hero-card">
              <img src={hero.image.url} alt={hero.name} className="hero-image" />
              <h2 className="hero-name">{hero.name}</h2>
              <p className="hero-info">{hero.biography["full-name"] || "Nombre desconocido"}</p>
              <button className="remove-button" onClick={() => removeHero(hero.id)}>
                ❌ Eliminar del Mazo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiMazo;
