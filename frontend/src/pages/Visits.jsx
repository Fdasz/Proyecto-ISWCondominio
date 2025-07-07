// src/pages/VisitsForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchPerson } from '@hooks/visits/useSearchPerson';
import PersonSearchModal from '@components/SearchPerson';
import Form from '@components/Form';
import { createVisita } from '@services/visita.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/form.css';
import '@styles/visits.css';

const Visits = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    rut_visitante: '',
    nombre_visitante: '',
    patente_visitante: '',
    fecha_visita: '',
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
    if (!finalData.rut_usuario || !finalData.rut_visitante || !finalData.fecha_visita) {
      showErrorAlert('Campos incompletos', 'Debe seleccionar un residente, un visitante y una fecha.');
      return;
    }
    try {
      const response = await createVisita(finalData);
      if (response.status === 'Success') {
        showSuccessAlert('Éxito', 'Visita registrada correctamente.');
        navigate('/home');
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
      label: "Residente",
      name: "nombre_usuario",
      placeholder: "Click para buscar residente...",
      fieldType: 'input',
      type: "text",
      readOnly: true,
      value: formData.nombre_usuario,
      onClick: () => openSearchModal('usuario')
    },
    {
      label: "RUT Residente",
      name: "rut_usuario",
      placeholder: "RUT del residente...",
      fieldType: 'input',
      type: "text",
      readOnly: true,
      value: formData.rut_usuario
    },
    {
      label: "Visitante",
      name: "nombre_visitante",
      placeholder: "Click para buscar visitante...",
      fieldType: 'input',
      type: "text",
      readOnly: true,
      value: formData.nombre_visitante,
      onClick: () => openSearchModal('visitante')
    },
    {
      label: "RUT Visitante",
      name: "rut_visitante",
      placeholder: "RUT del visitante...",
      fieldType: 'input',
      type: "text",
      readOnly: true,
      value: formData.rut_visitante
    },
    {
      label: "Patente del Vehículo (Opcional)",
      name: "patente_visitante",
      placeholder: "Ej: ABCD12",
      fieldType: 'input',
      type: "text",
      value: formData.patente_visitante,
      onChange: handleChange
    },
    {
      label: "Fecha y Hora de Visita",
      name: "fecha_visita",
      fieldType: 'input',
      type: "datetime-local",
      value: formData.fecha_visita,
      onChange: handleChange
    }
  ];

  return (
    <main className="container">
      <div className='visitas-register-container'> 
        <Form
          title="Registrar Visita"
          fields={visitFields}
          buttonText="Registrar"
          onSubmit={handleFormSubmit}
        />
      </div>

      <PersonSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchType={searchType}
        results={searchResults}
        onSelect={handleSelectPerson}
        onSearch={handleSearch}
      />
    </main>
  );
};

export default Visits;