import { useNavigate } from 'react-router-dom';
import Form from '@components/Form';
import { createVisitante } from '@services/visitante.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/form.css';
import '@styles/visits.css';

const Visitante = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    if (!data.nombre_visitante || !data.rut_visitante) {
      showErrorAlert('Campos incompletos', 'Debe ingresar el nombre y el RUT del visitante.');
      return;
    }
    try {

      // eslint-disable-next-line no-unused-vars
      const [_visitante, error] = await createVisitante(data);
      if (error) {
        showErrorAlert('Error', error || 'No se pudo registrar al visitante.');
      } else {
        showSuccessAlert('Éxito', 'Visitante registrado correctamente.');
        navigate('/visits');
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
    },
    {
      label: "RUT",
      name: "rut_visitante",
      placeholder: "Ingrese el RUT",
      fieldType: 'input',
      type: "text",
      required: true,
    },
    {
      label: "Patente del Vehículo (Opcional)",
      name: "patente_visitante",
      placeholder: "Ej: ABCD12",
      fieldType: 'input',
      type: "text",
    }
  ];

  return (
    <main className="page-container">
      <Form
        title="Registrar Nuevo Visitante"
        fields={visitanteFields}
        buttonText="Registrar Visitante"
        onSubmit={handleFormSubmit}
      />
    </main>
  );
};

export default Visitante;