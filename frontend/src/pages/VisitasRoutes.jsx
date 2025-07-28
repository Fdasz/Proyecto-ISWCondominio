import { Outlet, Navigate, useLocation } from 'react-router-dom';

const VisitasRoutes = () => {
  const location = useLocation();
  if (location.pathname === '/visitas') {
    return <Navigate to="/visitas/gestionar-visitas" replace />;
  }
  return <Outlet />;
};

export default VisitasRoutes;