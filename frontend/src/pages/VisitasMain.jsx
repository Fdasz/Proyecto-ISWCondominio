import { Outlet } from 'react-router-dom';
import '@styles/visitas_main.css';

const VisitasMain = () => {
  return (
    <div className="visitas-main-container">
      <div className="visitas-content">
        <Outlet />
      </div>
    </div>
  );
};

export default VisitasMain;