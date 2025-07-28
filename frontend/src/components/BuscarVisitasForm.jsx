import { useVisitas } from '@hooks/visits/useVisitas';
import VisitasForm from '@components/VisitasForm';
import VisitaCard from '@components/VisitaCard';
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import { deleteVisita } from '@services/visita.service';
import '@styles/visitas_main.css';

const BuscarVisitasForm = () => {
  const { visitas, loading, error, performSearch, setVisitas } = useVisitas();

  const handleSearch = (formData) => {
    performSearch(formData);
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

  return (
    <div className="visitas-shared-container">
      <VisitasForm
        fields={[
          { name: 'nombre_visitante', label: 'Nombre Visitante', placeholder: 'Ingrese el nombre del visitante...', fieldType: 'input', type: 'text', className: 'form-field' },
          { name: 'nombre_usuario', label: 'Nombre Residente', placeholder: 'Ingrese el nombre del residente...', fieldType: 'input', type: 'text', className: 'form-field' },
          { name: 'rut_visitante', label: 'RUT Visitante', placeholder: 'Ej: 12345678-9', fieldType: 'input', type: 'text', className: 'form-field' },
          { name: 'rut_usuario', label: 'RUT Residente', placeholder: 'Ej: 12345678-9', fieldType: 'input', type: 'text', className: 'form-field' },
          { name: 'patente_visitante', label: 'Patente', placeholder: 'Ej: ABCD12', fieldType: 'input', type: 'text', className: 'form-field patente-field' },
          { name: 'startDate', label: 'Desde:', placeholder: 'Fecha de inicio', fieldType: 'input', type: 'date', className: 'form-field date-field' },
          { name: 'endDate', label: 'Hasta:', placeholder: 'Fecha de fin', fieldType: 'input', type: 'date', className: 'form-field date-field' },
        ]}
        buttonText="Buscar"
        onSubmit={handleSearch}
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
          !loading && <p>No se encontraron visitas con los criterios de búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default BuscarVisitasForm;