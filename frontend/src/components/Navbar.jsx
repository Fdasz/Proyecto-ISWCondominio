import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/navbar.css';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isVisitasActive = location.pathname.startsWith('/visits') || 
                            location.pathname.startsWith('/visitas') || 
                            location.pathname.startsWith('/visitante');

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                    <li>
                        <NavLink 
                            to="/users" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Usuarios
                        </NavLink>
                    </li>
                    )}
                    {(userRole === 'administrador' || userRole === 'portero') && (
                        <li className="dropdown">
                            <a href="#!" className={`dropbtn ${isVisitasActive ? 'active' : ''}`}>Visitas</a>
                            <div className="dropdown-content">
                                <NavLink to="/visits" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Registrar Visita</NavLink>
                                <NavLink to="/visitante/new" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Registrar Visitante</NavLink>
                                <NavLink to="/visitas" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Buscar Visitas</NavLink>
                            </div>
                        </li>
                    )}
                    <li>
                        <a href="#!" onClick={logoutSubmit}>Cerrar Sesión</a>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;