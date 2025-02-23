import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import '../styles/Header.css';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth0();

    return (
        <header>
            <div className="headerLeft">
                {isAuthenticated && <img src={user.picture} alt={user.name} className="userAvatar" />}
                <h1>SUPERHEROES</h1>
            </div>
            
            <nav>
                <Link to="/" className="navLink">Inicio</Link>
                <Link to="/superheroes" className="navLink">Superhéroes</Link>
                <Link to="/MiMazo" className="navLink">Mi Mazo</Link>
                <Link to="/Arena" className="navLink">Arena</Link>
            </nav>

           
                <button className="btnLogout" onClick={() => logout()}>LOGOUT</button>
         
            
        
        </header>
    );
};

export default Header;
