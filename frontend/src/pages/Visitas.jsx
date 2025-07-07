import { useVisitas } from '@hooks/visits/useVisitas';
import Form from '@components/Form';
import VisitaCard from '@components/VisitaCard';
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import { deleteVisita } from '@services/visita.service';
import '@styles/form.css';
import '@styles/visitas_search.css';

function Visitas() {
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

  const searchFields = [
    { name: 'nombre_visitante', label: 'Nombre Visitante', placeholder: 'Ingrese nombre del visitante', fieldType: 'input', type: 'text' },
    { name: 'nombre_usuario', label: 'Nombre Residente', placeholder: 'Ingrese nombre del residente', fieldType: 'input', type: 'text' },
    { name: 'rut_visitante', label: 'RUT Visitante', placeholder: 'Ingrese RUT del visitante', fieldType: 'input', type: 'text' },
    { name: 'rut_usuario', label: 'RUT Residente', placeholder: 'Ingrese RUT del residente', fieldType: 'input', type: 'text' },
    { name: 'patente_visitante', label: 'Patente', placeholder: 'Ingrese patente', fieldType: 'input', type: 'text' },
    { name: 'startDate', label: 'Desde:', fieldType: 'input', type: 'date' },
    { name: 'endDate', label: 'Hasta:', fieldType: 'input', type: 'date' },
  ];

  return (
    <main className="container">
      <div className='visitas-search-container'>
        
        <Form
          title="Búsqueda de Visitas"
          fields={searchFields}
          buttonText="Buscar"
          onSubmit={handleSearch}
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
    </main>
  );
}

export default Visitas;