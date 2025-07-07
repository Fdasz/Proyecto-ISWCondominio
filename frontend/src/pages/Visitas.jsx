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
    { name: 'nombre_visitante', placeholder: 'Nombre Visitante', fieldType: 'input', type: 'text' },
    { name: 'nombre_usuario', placeholder: 'Nombre Residente', fieldType: 'input', type: 'text' },
    { name: 'rut_visitante', placeholder: 'RUT Visitante', fieldType: 'input', type: 'text' },
    { name: 'rut_usuario', placeholder: 'RUT Residente', fieldType: 'input', type: 'text' },
    { name: 'patente_visitante', placeholder: 'Patente', fieldType: 'input', type: 'text' },
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
        <h1 className='page-title'>Búsqueda de Visitas</h1>
        
        <Form
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