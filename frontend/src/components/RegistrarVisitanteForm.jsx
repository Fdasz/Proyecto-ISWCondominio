import VisitasForm from '@components/VisitasForm';
import { createVisitante } from '@services/visitante.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import { useNavigate } from 'react-router-dom';
import '@styles/visitas_main.css';

const fields = [
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

const RegistrarVisitanteForm = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    if (!data.nombre_visitante || !data.rut_visitante) {
      showErrorAlert('Campos incompletos', 'Debe ingresar el nombre y el RUT del visitante.');
      return;
    }
    const [, error] = await createVisitante(data);
    if (error) {
      showErrorAlert('Error', error || 'No se pudo registrar al visitante.');
    } else {
      showSuccessAlert('Éxito', 'Visitante registrado correctamente.');
      navigate('/visitas');
    }
  };

  return (
    <div className="visitas-shared-container">
      <VisitasForm
        fields={fields}
        buttonText="Registrar"
        onSubmit={handleFormSubmit}
        useGrid={true}
      />
    </div>
  );
};

export default RegistrarVisitanteForm;