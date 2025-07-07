import { useVisitas } from '@hooks/visits/useVisitas';
import Form from '@components/Form';
import Table from '@components/Table';
import '@styles/form.css';
import '@styles/visitas_search.css';

import { DateTime } from 'luxon';
if (window.luxon === undefined) {
  window.luxon = { DateTime };
}


function Visitas() {
  const { visitas, loading, error, performSearch } = useVisitas();

  const handleSearch = (formData) => {
    performSearch(formData);
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

  const columns = [
    { 
      title: "Fecha y Hora", 
      field: "fecha_visita", 
      formatter: "datetime", 
      formatterParams: { 
        inputFormat: "iso",
        outputFormat: "dd/MM/yyyy hh:mm a",
        invalidPlaceholder: "(fecha inválida)",
      } 
    },
    { title: "Visitante", field: "nombre_visitante" },
    { title: "Residente", field: "nombre_usuario" },
    { title: "Patente", field: "visitante.patente_visitante", formatter: (cell) => cell.getValue() || "N/A" },
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
          {!loading && !error && (
            <Table
              data={visitas}
              columns={columns}
              initialSortName={'fecha_visita'}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default Visitas;