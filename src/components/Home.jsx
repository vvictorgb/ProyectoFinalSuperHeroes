import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      
   
      <section className="hero-section">
        <div className="overlay">
          <h1 className="home-title">Bienvenido al Universo de Superhéroes</h1>
          <p className="home-description">
            Sumérgete en el mundo de los superhéroes y descubre sus historias, poderes y aventuras épicas.
          </p>
          <Link to="/superheroes">
            <button className="home-button">Explorar Superhéroes</button>
          </Link>
        </div>
      </section>

    
      <section className="featured-heroes">
        <h2 className="section-title">Superhéroes Destacados</h2>
        <div className="hero-cards">
          <div className="hero-card">
           
           
          </div>
          <div className="hero-card">
          

          </div>
          <div className="hero-card">

          </div>
        </div>
      </section>

    
      <section className="about-heroes">
        <h2 className="section-title">¿Quiénes son los Superhéroes?</h2>
        <p>
          Los superhéroes son personajes ficticios con habilidades extraordinarias, muchos de ellos poseen poderes sobrehumanos,
          tecnología avanzada o habilidades especiales. Son conocidos por sus hazañas heroicas y por su lucha contra el mal.
        </p>
      </section>

  
      <section className="fun-facts">
        <h2 className="section-title">Datos Curiosos</h2>
        <ul>
          <li><strong>Spider-Man</strong> fue creado en 1962 por Stan Lee y Steve Ditko.</li>
          <li><strong>Wonder Woman</strong> es una de las superheroínas más emblemáticas y se introdujo en 1941.</li>
          <li><strong>Iron Man</strong> fue uno de los primeros superhéroes en tener una película en el MCU en 2008.</li>
        </ul>
      </section>


      <section className="cta-section">
        <h2 className="cta-title">¡Únete a la Lucha!</h2>
        <p>Si eres fanático de los superhéroes, no puedes perderte la oportunidad de unirte a nuestras aventuras épicas.</p>
        <Link to="/superheroes">
          <button className="cta-button">Explorar Más</button>
        </Link>
      </section>

    </div>
  );
};

export default Home;
