import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '@components/Form';
import { createVisitante } from '@services/visitante.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/form.css';
import '@styles/visits.css'; // Reusing styles for consistency

const Visitante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_visitante: '',
    rut_visitante: '',
    patente_visitante: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    if (!finalData.nombre_visitante || !finalData.rut_visitante) {
      showErrorAlert('Campos incompletos', 'Debe ingresar el nombre y el RUT del visitante.');
      return;
    }
    try {
      const [visitante, error] = await createVisitante(finalData);
      if (error) {
        showErrorAlert('Error', error || 'No se pudo registrar al visitante.');
      } else {
        showSuccessAlert('Éxito', 'Visitante registrado correctamente.');
        navigate('/visits'); // Navigate to the visit registration page
      }
    } catch (error) {
      console.error("Error creating visitor:", error);
      showErrorAlert('Error', 'Ocurrió un error en el servidor.');
    }
  };

  const visitanteFields = [
    {
      label: "Nombre Completo",
      name: "nombre_visitante",
      placeholder: "Ingrese el nombre completo",
      fieldType: 'input',
      type: "text",
      required: true,
      value: formData.nombre_visitante,
      onChange: handleChange
    },
    {
      label: "RUT",
      name: "rut_visitante",
      placeholder: "Ingrese el RUT",
      fieldType: 'input',
      type: "text",
      required: true,
      value: formData.rut_visitante,
      onChange: handleChange
    },
    {
      label: "Patente del Vehículo (Opcional)",
      name: "patente_visitante",
      placeholder: "Ej: ABCD12",
      fieldType: 'input',
      type: "text",
      value: formData.patente_visitante,
      onChange: handleChange
    }
  ];

  return (
    <main className="container">
      <div className='visitas-register-container'> 
        <Form
          title="Registrar Nuevo Visitante"
          fields={visitanteFields}
          buttonText="Registrar Visitante"
          onSubmit={handleFormSubmit}
        />
      </div>
    </main>
  );
};

export default Visitante;