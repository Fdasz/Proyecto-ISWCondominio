import { useState } from 'react';
import VisitasForm from '@components/VisitasForm';
import PersonSearchModal from '@components/SearchPerson';
import { createVisitante, updateVisitante } from '@services/visitante.service';
import { useSearchPerson } from '@hooks/visits/useSearchPerson';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/visitas_main.css';

const GestionarVisitantesForm = () => {
  const [activeTab, setActiveTab] = useState('registrar');
  
  const [registrarData, setRegistrarData] = useState({
    nombre_visitante: '',
    rut_visitante: ''
  });

  const [editarData, setEditarData] = useState({
    nombre_visitante: '',
    rut_visitante: ''
  });
  const [selectedVisitante, setSelectedVisitante] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // Search modal for editar visitante
  const {
    isModalOpen,
    openSearchModal,
    handleSearch,
    searchResults,
    searchType,
    setIsModalOpen
  } = useSearchPerson({}, () => {});

  // Handle registrar visitante
  const handleRegistrarSubmit = async (data) => {
    const finalData = { ...registrarData, ...data };
    if (!finalData.nombre_visitante || !finalData.rut_visitante) {
      showErrorAlert('Campos incompletos', 'Debe ingresar el nombre y el RUT del visitante.');
      return;
    }
    const [, error] = await createVisitante(finalData);
    if (error) {
      showErrorAlert('Error', error || 'No se pudo registrar al visitante.');
    } else {
      showSuccessAlert('Éxito', 'Visitante registrado correctamente.');
      setRegistrarData({ nombre_visitante: '', rut_visitante: '' });
    }
  };

  // Handle editar visitante
  const handleSelectVisitante = (selected) => {
    setSelectedVisitante(selected);
    setEditarData({
      nombre_visitante: selected.nombre_visitante || '',
      rut_visitante: selected.rut_visitante || ''
    });
    setIsModalOpen(false);
  };

  const handleEditarChange = (e) => {
    const { name, value } = e.target;
    setEditarData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditarSubmit = async (formSubmissionData) => {
    if (!selectedVisitante) {
      showErrorAlert('Error', 'Debe seleccionar un visitante primero');
      return;
    }
    
    const currentData = { ...editarData, ...formSubmissionData };
    
    const updatedFields = {};
    if (currentData.nombre_visitante !== selectedVisitante.nombre_visitante && currentData.nombre_visitante.trim() !== '') {
      updatedFields.nombre_visitante = currentData.nombre_visitante;
    }
    if (currentData.rut_visitante !== selectedVisitante.rut_visitante && currentData.rut_visitante.trim() !== '') {
      updatedFields.rut_visitante = currentData.rut_visitante;
    }
    
    if (Object.keys(updatedFields).length === 0) {
      showErrorAlert('Sin cambios', 'No se han detectado cambios para actualizar');
      return;
    }
    
    setEditLoading(true);
    try {
      const [updated, err] = await updateVisitante(selectedVisitante.id_visitante, updatedFields);
      if (err) {
        showErrorAlert('Error', err);
      } else {
        showSuccessAlert('Éxito', 'Visitante actualizado correctamente');
        setSelectedVisitante(updated);
        setEditarData({
          nombre_visitante: updated.nombre_visitante || '',
          rut_visitante: updated.rut_visitante || ''
        });
      }
    } catch {
      showErrorAlert('Error', 'Error al actualizar visitante');
    }
    setEditLoading(false);
  };

  // Field definitions
  const registrarFields = [
    {
      name: 'nombre_visitante',
      label: 'Nombre del Visitante',
      placeholder: 'Ej: Juan Pérez',
      fieldType: 'input',
      type: 'text',
      className: 'form-field'
    },
    {
      name: 'rut_visitante',
      label: 'RUT del Visitante',
      placeholder: 'Ej: 12345678-9',
      fieldType: 'input',
      type: 'text',
      className: 'form-field'
    }
  ];

  const editarFields = [
    {
      name: 'nombre_visitante',
      label: 'Nombre del Visitante',
      placeholder: 'Ingrese el nombre del visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      value: editarData.nombre_visitante,
      onChange: handleEditarChange
    },
    {
      name: 'rut_visitante',
      label: 'RUT del Visitante',
      placeholder: 'Ingrese el RUT del visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      value: editarData.rut_visitante,
      onChange: handleEditarChange
    }
  ];

  return (
    <div className="visitas-shared-container">
      {/* Tab Navigation */}
      <div className="gestionar-tabs">
        <button 
          className={`gestionar-tab ${activeTab === 'registrar' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrar')}
        >
          Registrar Visitante
        </button>
        <button 
          className={`gestionar-tab ${activeTab === 'editar' ? 'active' : ''}`}
          onClick={() => setActiveTab('editar')}
        >
          Editar Visitante
        </button>
      </div>

      {/* Tab Content */}
      <div className="gestionar-content">
        {activeTab === 'registrar' && (
          <div className="gestionar-panel">
            <h3>Registrar Nuevo Visitante</h3>
            <VisitasForm
              fields={registrarFields}
              buttonText="Registrar"
              onSubmit={handleRegistrarSubmit}
              useGrid={true}
            />
          </div>
        )}

        {activeTab === 'editar' && (
          <div className="gestionar-panel">
            <h3>Editar Visitante</h3>
            <div className="search-section">
              <button 
                type="button" 
                className="gestionar-search-btn" 
                onClick={() => openSearchModal('visitante')}
              >
                Buscar Visitante
              </button>
            </div>
            {selectedVisitante && (
              <div className="visitante-info">
                <h4>Visitante Seleccionado:</h4>
                <p><strong>ID:</strong> {selectedVisitante.id_visitante}</p>
                <p><strong>Nombre:</strong> {selectedVisitante.nombre_visitante}</p>
                <p><strong>RUT:</strong> {selectedVisitante.rut_visitante}</p>
              </div>
            )}
            {selectedVisitante ? (
              <VisitasForm
                fields={editarFields}
                buttonText={editLoading ? 'Actualizando...' : 'Actualizar Visitante'}
                onSubmit={handleEditarSubmit}
                useGrid={true}
              />
            ) : (
              <div className="visitas-hint">
                Haga clic en &quot;Buscar Visitante&quot; para seleccionar un visitante y editarlo.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Modal for Editar */}
      <PersonSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchType={searchType}
        onSearch={handleSearch}
        results={searchResults}
        onSelect={handleSelectVisitante}
      />
    </div>
  );
};

export default GestionarVisitantesForm;