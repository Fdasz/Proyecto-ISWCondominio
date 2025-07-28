import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
  const userRole = user?.rol;

  const logoutSubmit = () => {
    logout();
    navigate('/auth');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Condominio</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
          </li>
          {userRole === 'administrador' && (
            <li>
              <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>Usuarios</NavLink>
            </li>
          )}
          {userRole === 'administrador' && (
            <li>
              <NavLink to="/espaciosComunes" className={({ isActive }) => isActive ? 'active' : ''}>Espacios Comunes</NavLink>
            </li>
          )}
          {(userRole === 'administrador' || userRole === 'portero' || userRole === 'residente') && (
            <li>
              <NavLink to="/reservasEspaciosComunes" className={({ isActive }) => isActive ? 'active' : ''}>Reservas Espacios</NavLink>
            </li>
          )}
          {(userRole === 'administrador' || userRole === 'portero') && (
            <li>
              <NavLink to="/visitas" className={({ isActive }) => isActive ? 'active' : ''}>Visitas</NavLink>
            </li>
          )}
          <li>
            <button className="logout-btn" onClick={logoutSubmit}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;