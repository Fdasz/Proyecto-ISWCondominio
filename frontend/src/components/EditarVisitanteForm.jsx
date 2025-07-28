import { useState } from 'react';
import { updateVisitante } from '../services/visitante.service';
import { useSearchPerson } from '@hooks/visits/useSearchPerson';
import PersonSearchModal from './SearchPerson';
import VisitasForm from './VisitasForm';
import { showSuccessAlert, showErrorAlert } from '../helpers/sweetAlert';
import '../styles/visitas_main.css';

export default function EditarVisitanteForm() {
  const [formData, setFormData] = useState({
    nombre_visitante: '',
    rut_visitante: ''
  });
  const [visitante, setVisitante] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    isModalOpen,
    openSearchModal,
    handleSearch,
    searchResults,
    searchType,
    setIsModalOpen
  } = useSearchPerson({}, () => {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectVisitante = (selected) => {
    setVisitante(selected);
    setFormData({
      nombre_visitante: selected.nombre_visitante || '',
      rut_visitante: selected.rut_visitante || ''
    });
    setIsModalOpen(false);
  };

  const handleUpdate = async (formSubmissionData) => {
    if (!visitante) {
      showErrorAlert('Error', 'Debe seleccionar un visitante primero');
      return;
    }
    
    const currentData = { ...formData, ...formSubmissionData };
    
    const updatedFields = {};
    if (currentData.nombre_visitante !== visitante.nombre_visitante && currentData.nombre_visitante.trim() !== '') {
      updatedFields.nombre_visitante = currentData.nombre_visitante;
    }
    if (currentData.rut_visitante !== visitante.rut_visitante && currentData.rut_visitante.trim() !== '') {
      updatedFields.rut_visitante = currentData.rut_visitante;
    }
    
    if (Object.keys(updatedFields).length === 0) {
      showErrorAlert('Sin cambios', 'No se han detectado cambios para actualizar');
      return;
    }
    
    setLoading(true);
    try {
      const [updated, err] = await updateVisitante(visitante.id_visitante, updatedFields);
      if (err) {
        showErrorAlert('Error', err);
      } else {
        showSuccessAlert('Éxito', 'Visitante actualizado correctamente');
        setVisitante(updated);
        setFormData({
          nombre_visitante: updated.nombre_visitante || '',
          rut_visitante: updated.rut_visitante || ''
        });
      }
    } catch (error) {
      console.error('Error updating visitante:', error);
      showErrorAlert('Error', 'Error al actualizar visitante');
    }
    setLoading(false);
  };

  const editFields = [
    {
      name: 'nombre_visitante',
      label: 'Nombre del Visitante',
      placeholder: 'Ingrese el nombre del visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      value: formData.nombre_visitante,
      onChange: handleChange
    },
    {
      name: 'rut_visitante',
      label: 'RUT del Visitante',
      placeholder: 'Ingrese el RUT del visitante...',
      fieldType: 'input',
      type: 'text',
      className: 'form-field',
      value: formData.rut_visitante,
      onChange: handleChange
    }
  ];

  return (
    <div className="visitas-shared-container">
      <h2>Editar Visitante</h2>
      
      <div className="search-section">
        <button 
          type="button" 
          className="gestionar-search-btn"
          onClick={() => openSearchModal('visitante')}
          style={{ marginBottom: '20px' }}
        >
          Buscar Visitante
        </button>
      </div>

      {visitante && (
        <div className="visitante-info" style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '5px', 
          marginBottom: '20px',
          border: '1px solid #dee2e6',
          color: '#000', // Set default text color for all children
        }}>
          <h4 style={{ color: '#000', marginBottom: '10px' }}>Visitante Seleccionado:</h4>
          <p style={{ color: '#000', margin: '5px 0' }}><strong style={{color:'#000'}}>ID:</strong> <span style={{color:'#000'}}>{visitante.id_visitante}</span></p>
          <p style={{ color: '#000', margin: '5px 0' }}><strong style={{color:'#000'}}>Nombre:</strong> <span style={{color:'#000'}}>{visitante.nombre_visitante}</span></p>
          <p style={{ color: '#000', margin: '5px 0' }}><strong style={{color:'#000'}}>RUT:</strong> <span style={{color:'#000'}}>{visitante.rut_visitante}</span></p>
        </div>
      )}

      {visitante ? (
        <VisitasForm
          fields={editFields}
          buttonText={loading ? 'Actualizando...' : 'Actualizar Visitante'}
          onSubmit={handleUpdate}
          useGrid={true}
        />
      ) : (
        <div className="visitas-hint">
          Haga clic en &quot;Buscar Visitante&quot; para seleccionar un visitante y editarlo.
        </div>
      )}

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
}
