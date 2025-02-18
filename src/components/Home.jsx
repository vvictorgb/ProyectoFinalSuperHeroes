import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">Bienvenido al Universo de Superhéroes</h1>
        <p className="home-description">Sumérgete en el mundo de los superhéroes y descubre sus historias, poderes y aventuras épicas.</p>
        <Link to="/superheroes">
          <button className="home-button">Explorar Superhéroes</button>
        </Link>
      </div>
      
      <section className="info-section">
        <h2>Historia de los Superhéroes</h2>
        <p>Desde los cómics clásicos hasta las películas modernas, los superhéroes han cautivado a generaciones con sus hazañas heroicas.</p>
      </section>
      
      <section className="popular-heroes">
        <h2>Superhéroes Populares</h2>
        <ul>
          <li>Spider-Man</li>
          <li>Batman</li>
          <li>Superman</li>
          <li>Wonder Woman</li>
          <li>Iron Man</li>
        </ul>
      </section>
      
      <section className="hero-facts">
        <h2>Datos Curiosos</h2>
        <p>¿Sabías que Spider-Man fue creado en 1962 por Stan Lee y Steve Ditko y se convirtió en uno de los superhéroes más icónicos?</p>
      </section>
    </div>
  );
};

export default Home;
