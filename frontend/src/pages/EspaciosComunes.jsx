import { useState, useCallback } from "react";
import useEspacioComun from "@hooks/espacios/useGetEspacioComun";
import useEditEspacioComun from "@hooks/espacios/useEditEspacioComun";
import useDeleteEspacioComun from "@hooks/espacios/useDeleteEspacioComun";
import useCreateEspacioComun from "@hooks/espacios/useCreateEspacioComun";
import Popup from "@components/PopupEspaciosComunes";
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import SearchIcon from '../assets/SearchIcon.svg';
import '@styles/espaciosComunes.css';

const EspaciosComunes = () => {
  const { espacios, fetchEspacios, setEspacios } = useEspacioComun();
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('create'); // 'create' o 'edit'

  const {
    handleUpdate,
    setDataEspacio
  } = useEditEspacioComun(setEspacios);

  const { handleDelete } = useDeleteEspacioComun(fetchEspacios, setDataEspacio);

  const {
    handleCreate
  } = useCreateEspacioComun(setEspacios);

  const toggleSelect = useCallback((espacio) => {
    setSelectedEspacio((prev) => {
      if (prev && prev.id_espacio === espacio.id_espacio) {
        setDataEspacio(null);
        return null;
      }
      setDataEspacio(espacio);
      return espacio;
    });
  }, [setDataEspacio]);

  const isSelected = (espacio) =>
    selectedEspacio && selectedEspacio.id_espacio === espacio.id_espacio;

  const handleClickCreate = () => {
    setPopupMode('create');
    setIsPopupOpen(true);
  };

  const handleClickUpdate = () => {
    if (selectedEspacio) {
      setPopupMode('edit');
      setIsPopupOpen(true);
    }
  };

  const handlePopupAction = (data) => {
    if (popupMode === 'create') {
      return handleCreate(data);
    } else {
      return handleUpdate(data);
    }
  };

  return (
    <div className="main-container">
      <div className="top-table">
        <h1 className="title-table">Espacios Comunes</h1>
        <div className="filter-actions">
          <button onClick={handleClickCreate}>
            <img
              src={SearchIcon}
              alt="add"
            />
          </button>
          <button onClick={handleClickUpdate} disabled={!selectedEspacio}>
            <img
              src={!selectedEspacio ? UpdateIconDisable : UpdateIcon}
              alt="edit"
            />
          </button>
          <button className="delete-user-button" disabled={!selectedEspacio} onClick={() => handleDelete([selectedEspacio])}>
            <img
              src={!selectedEspacio ? DeleteIconDisable : DeleteIcon}
              alt="delete"
            />
          </button>
        </div>
      </div>

      <div className="espacios-grid">
        {espacios.length === 0 ? (
          <p className="no-results">No se encontraron espacios comunes.</p>
        ) : (
          espacios.map((espacio) => (
            <div
              key={espacio.id_espacio}
              className={`espacio-card ${isSelected(espacio) ? 'selected' : ''}`}
              onClick={() => toggleSelect(espacio)}
            >
              <h3>{espacio.tipo_espacio_comun}</h3>
              <p>{espacio.descripcion_espacio_comun}</p>
              <p className={`estado ${espacio.estado_espacio_comun ? 'activo' : 'inactivo'}`}>
                {espacio.estado_espacio_comun ? 'Activo' : 'Inactivo'}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Popup unificado para crear y editar */}
      <Popup 
        show={isPopupOpen} 
        setShow={setIsPopupOpen} 
        data={popupMode === 'edit' ? selectedEspacio : null} 
        action={handlePopupAction}
        mode={popupMode}
      />
    </div>
  );
};

export default EspaciosComunes;