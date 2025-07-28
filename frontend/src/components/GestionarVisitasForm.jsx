import { useState } from 'react';
import { useSearchPerson } from '@hooks/visits/useSearchPerson';
import { useVisitas } from '@hooks/visits/useVisitas';
import PersonSearchModal from '@components/SearchPerson';
import VisitasForm from '@components/VisitasForm';
import VisitaCard from '@components/VisitaCard';
import { createVisita, deleteVisita } from '@services/visita.service';
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/visitas_main.css';

const GestionarVisitasForm = () => {
  const [activeTab, setActiveTab] = useState('registrar');

  const [formData, setFormData] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    rut_visitante: '',
    nombre_visitante: '',
    patente_visitante: '',
  });

  const {
    isModalOpen,
    openSearchModal,
    handleSelectPerson,
    handleSearch: handlePersonSearch,
    searchResults,
    searchType,
    setIsModalOpen
  } = useSearchPerson(formData, setFormData);

  const { visitas, loading, error, performSearch, setVisitas } = useVisitas();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegistrarSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    if (!finalData.rut_usuario || !finalData.rut_visitante) {
      showErrorAlert('Campos incompletos', 'Debe seleccionar un residente y un visitante.');
      return;
    }
    try {
      const response = await createVisita(finalData);
      if (response.status === 'Success') {
        showSuccessAlert('Éxito', 'Visita registrada correctamente.');
        setFormData({
          rut_usuario: '',
          nombre_usuario: '',
          rut_visitante: '',
          nombre_visitante: '',
          patente_visitante: '',
        });
      } else {
        showErrorAlert('Error', response.message || 'No se pudo registrar la visita.');
      }
    } catch (error) {
      console.error("Error creating visit:", error);
      showErrorAlert('Error', 'Ocurrió un error en el servidor.');
    }
  };

  const handleBuscarSubmit = (searchData) => {
    performSearch(searchData);
  };

  const handleDelete = async (id) => {
    const result = await deleteDataAlert();

    if (result.isConfirmed) {
      const [, error] = await deleteVisita(id);
      if (error) {
        showErrorAlert('Error', error);
      } else {
        showSuccessAlert('Eliminada', 'La visita ha sido eliminada.');
        setVisitas(prevVisitas => prevVisitas.filter(v => v.id_visita !== id));
      }
    }
  };

  const registrarFields = [
    {
      name: 'residente',
      label: 'Residente',
      placeholder: 'Click para buscar residente...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      readOnly: true,
      value: formData.nombre_usuario,
      onClick: () => openSearchModal('usuario')
    },
    {
      name: 'visitante',
      label: 'Visitante',
      placeholder: 'Click para buscar visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      readOnly: true,
      value: formData.nombre_visitante,
      onClick: () => openSearchModal('visitante')
    },
    {
      name: 'rut_residente',
      label: 'RUT Residente',
      placeholder: 'RUT del residente...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      readOnly: true,
      value: formData.rut_usuario
    },
    {
      name: 'rut_visitante',
      label: 'RUT Visitante',
      placeholder: 'RUT del visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      readOnly: true,
      value: formData.rut_visitante
    },
    {
      name: 'patente_visitante',
      label: 'Patente',
      placeholder: 'Ingrese la patente del vehículo del visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field patente-field',
      value: formData.patente_visitante,
      onChange: handleChange
    },
  ];

  const buscarFields = [
    { name: 'nombre_visitante', label: 'Nombre Visitante', placeholder: 'Ingrese el nombre del visitante...', fieldType: 'input', type: 'text', className: 'form-field' },
    { name: 'nombre_usuario', label: 'Nombre Residente', placeholder: 'Ingrese el nombre del residente...', fieldType: 'input', type: 'text', className: 'form-field' },
    { name: 'rut_visitante', label: 'RUT Visitante', placeholder: 'Ej: 12345678-9', fieldType: 'input', type: 'text', className: 'form-field' },
    { name: 'rut_usuario', label: 'RUT Residente', placeholder: 'Ej: 12345678-9', fieldType: 'input', type: 'text', className: 'form-field' },
    { name: 'patente_visitante', label: 'Patente', placeholder: 'Ej: ABCD12', fieldType: 'input', type: 'text', className: 'form-field patente-field' },
    { name: 'startDate', label: 'Desde:', placeholder: 'Fecha de inicio', fieldType: 'input', type: 'date', className: 'form-field date-field' },
    { name: 'endDate', label: 'Hasta:', placeholder: 'Fecha de fin', fieldType: 'input', type: 'date', className: 'form-field date-field' },
  ];

  return (
    <div className="visitas-shared-container">
      {/* Tab Navigation */}
      <div className="gestionar-tabs">
        <button 
          className={`gestionar-tab ${activeTab === 'registrar' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrar')}
        >
          Registrar Visita
        </button>
        <button 
          className={`gestionar-tab ${activeTab === 'buscar' ? 'active' : ''}`}
          onClick={() => setActiveTab('buscar')}
        >
          Buscar Visitas
        </button>
      </div>

      {/* Tab Content */}
      <div className="gestionar-content">
        {activeTab === 'registrar' && (
          <div className="gestionar-panel">
            <h3>Registrar Nueva Visita</h3>
            <VisitasForm
              fields={registrarFields}
              buttonText="Registrar"
              onSubmit={handleRegistrarSubmit}
              useGrid={true}
            />
            
            <PersonSearchModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              searchType={searchType}
              results={searchResults}
              onSelect={handleSelectPerson}
              onSearch={handlePersonSearch}
            />
          </div>
        )}

        {activeTab === 'buscar' && (
          <div className="gestionar-panel">
            <h3>Buscar Visitas</h3>
            <VisitasForm
              fields={buscarFields}
              buttonText="Buscar"
              onSubmit={handleBuscarSubmit}
              useGrid={true}
            />
            
            <div className="results-container">
              {loading && <p>Cargando...</p>}
              {error && <p className="error-message">Error: {error}</p>}
              {!loading && !error && visitas.length > 0 ? (
                visitas.map(visita => (
                  <VisitaCard 
                    key={visita.id_visita} 
                    visita={visita} 
                    onDelete={handleDelete} 
                  />
                ))
              ) : (
                !loading && activeTab === 'buscar' && <p>No se encontraron visitas con los criterios de búsqueda.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionarVisitasForm;
