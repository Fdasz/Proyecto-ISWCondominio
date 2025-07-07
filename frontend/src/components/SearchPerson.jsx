import { useState } from 'react';
import '@styles/popup.css';

const PersonSearchModal = ({
  isOpen,
  onClose,
  searchType,
  onSearch,
  results,
  onSelect
}) => {
  const [searchFields, setSearchFields] = useState({
    rut: '',
    nombre: ''
  });

  if (!isOpen) return null;

  const handleSearchClick = () => {
    onSearch(searchFields);
  };

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={onClose}>✕</button>
        <div className="form">
          <h1 className="title">
            {`Buscar ${searchType === 'visitante' ? 'Visitante' : 'Residente'}`}
          </h1>
          
          <div className="container_inputs">
            <label>RUT</label>
            <input
              type="text"
              value={searchFields.rut}
              onChange={(e) => setSearchFields(prev => ({ ...prev, rut: e.target.value }))}
              placeholder="RUT de la persona"
            />
          </div>

          <div className="container_inputs">
            <label>Nombre</label>
            <input
              type="text"
              value={searchFields.nombre}
              onChange={(e) => setSearchFields(prev => ({ ...prev, nombre: e.target.value }))}
              placeholder="Nombre de la persona"
            />
          </div>

          <button onClick={handleSearchClick}>Buscar</button>

          {results && results.length > 0 ? (
            <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((person, index) => (
                    <tr key={index}>
                      <td>{searchType === 'visitante' ? person.rut_visitante : person.rut_usuario}</td>
                      <td>{searchType === 'visitante' ? person.nombre_visitante : person.nombre_usuario}</td>
                      <td>
                        <button onClick={() => onSelect(person)}>
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonSearchModal;