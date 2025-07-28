import { Outlet } from 'react-router-dom';
import Sidebar from '@components/Sidebar';
import { AuthProvider } from '@context/AuthContext';

function Root()  {
return (
    <AuthProvider>
        <PageRoot/>
    </AuthProvider>
);
}

function PageRoot() {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default Root;