import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchPerson } from '@hooks/visits/useSearchPerson';
import PersonSearchModal from '@components/SearchPerson';
import Form from '@components/Form';
import { createVisita } from '@services/visita.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/form.css';
import '@styles/visitas_main.css';

const RegistrarVisitasForm = () => {
  const navigate = useNavigate();

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
    handleSearch,
    searchResults,
    searchType,
    setIsModalOpen
  } = useSearchPerson(formData, setFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    if (!finalData.rut_usuario || !finalData.rut_visitante) {
      showErrorAlert('Campos incompletos', 'Debe seleccionar un residente y un visitante.');
      return;
    }
    try {
      const response = await createVisita(finalData);
      if (response.status === 'Success') {
        showSuccessAlert('Éxito', 'Visita registrada correctamente.');
        navigate('/visitas');
      } else {
        showErrorAlert('Error', response.message || 'No se pudo registrar la visita.');
      }
    } catch (error) {
      console.error("Error creating visit:", error);
      showErrorAlert('Error', 'Ocurrió un error en el servidor.');
    }
  };

  const visitFields = [
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

  return (
    <div className="visitas-shared-container">
      <Form
        fields={visitFields}
        buttonText="Registrar"
        onSubmit={handleFormSubmit}
        formClassName="visitas-form-grid"
      />

      <PersonSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchType={searchType}
        results={searchResults}
        onSelect={handleSelectPerson}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default RegistrarVisitasForm;