import { useState } from 'react';
import RegistrarVisitasForm from '@components/RegistrarVisitasForm';
import BuscarVisitasForm from '@components/BuscarVisitasForm';
import RegistrarVisitanteForm from '@components/RegistrarVisitanteForm';
import EditarVisitanteForm from '@components/EditarVisitanteForm';
import '@styles/visitas_main.css';

const VisitasMain = () => {
  const [activeTab, setActiveTab] = useState('registrar-visita');

  return (
    <div className="visitas-main-container">
      <div className="visitas-tabs">
        <button
          className={activeTab === 'registrar-visita' ? 'active' : ''}
          onClick={() => setActiveTab('registrar-visita')}
        >
          Registrar Visita
        </button>
        <button
          className={activeTab === 'buscar-visitas' ? 'active' : ''}
          onClick={() => setActiveTab('buscar-visitas')}
        >
          Buscar Visitas
        </button>
        <button
          className={activeTab === 'registrar-visitante' ? 'active' : ''}
          onClick={() => setActiveTab('registrar-visitante')}
        >
          Registrar Visitante
        </button>
        <button
          className={activeTab === 'editar-visitante' ? 'active' : ''}
          onClick={() => setActiveTab('editar-visitante')}
        >
          Editar Visitante
        </button>
      </div>
      <div className="visitas-content">
        {activeTab === 'registrar-visita' && <RegistrarVisitasForm />}
        {activeTab === 'buscar-visitas' && <BuscarVisitasForm />}
        {activeTab === 'registrar-visitante' && <RegistrarVisitanteForm />}
        {activeTab === 'editar-visitante' && <EditarVisitanteForm />}
      </div>
    </div>
  );
};

export default VisitasMain;