import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import '@styles/sidebar.css';
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
  const userRole = user?.rol;
  const [openSection, setOpenSection] = useState(null);

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
              <NavLink to="/espaciosComunes" className={({ isActive }) => isActive ? 'active' : ''}>Espacios Comunes</NavLink>
            </li>
          )}
          {(userRole === 'administrador' || userRole === 'portero' || userRole === 'residente') && (
            <li>
              <NavLink to="/reservasEspaciosComunes" className={({ isActive }) => isActive ? 'active' : ''}>Reservas Espacios</NavLink>
            </li>
          )}
          {(userRole === 'administrador' || userRole === 'portero') && (
            <li className={`sidebar-parent${openSection === 'visitas' ? ' open' : ''}`}>
              <span
                className="sidebar-parent-label"
                onClick={() => setOpenSection(openSection === 'visitas' ? null : 'visitas')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Visitas
              </span>
              <ul className="sidebar-submenu" style={{ display: openSection === 'visitas' ? 'block' : 'none' }}>
                <li>
                  <NavLink to="/visitas/gestionar-visitas" className={({ isActive }) => isActive ? 'active' : ''}>Gestionar Visitas</NavLink>
                </li>
                <li>
                  <NavLink to="/visitas/gestionar-visitantes" className={({ isActive }) => isActive ? 'active' : ''}>Gestionar Visitantes</NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
      <div className="sidebar-logout-container">
        <button className="logout-btn" onClick={logoutSubmit}>Cerrar Sesión</button>
      </div>
    </aside>
  );
};

export default Sidebar;