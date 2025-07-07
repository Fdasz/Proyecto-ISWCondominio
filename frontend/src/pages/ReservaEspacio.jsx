import { useState, useCallback } from "react";
import useReservas from "@hooks/reservas/useGetReserva";
import useEditReserva from "@hooks/reservas/useEditReserva";
import useDeleteReserva from "@hooks/reservas/useDeleteReserva";
import useCreateReserva from "@hooks/reservas/useCreateReserva";
import useEspacioComun from "@hooks/espacios/useGetEspacioComun";
import useResidentes from "@hooks/Users/useGetUsers";
import PopupReserva from "@components/PopupReserva";
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import PersonIcon from '../assets/PersonIcon.svg';
import '../styles/reservasEspacios.css';

const ReservasEspacios = () => {
  const { espacios } = useEspacioComun();
  const { residentes } = useResidentes();
  const { reservas, fetchReservas, setReservas } = useReservas();
  const { handleUpdate, setDataReserva } = useEditReserva(setReservas);
  const { handleDelete } = useDeleteReserva(fetchReservas, setDataReserva);
  const { handleCreate } = useCreateReserva(setReservas);

  const [selectedReserva, setSelectedReserva] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('create');
  const [filtroEspacio, setFiltroEspacio] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroResidente, setFiltroResidente] = useState('');

  const toggleSelect = useCallback((reserva) => {
    setSelectedReserva(prev => {
      if (prev?.id_reserva === reserva.id_reserva) {
        setDataReserva(null);
        return null;
      }
      setDataReserva(reserva);
      return reserva;
    });
  }, [setDataReserva]);

  const isSelected = (reserva) => selectedReserva?.id_reserva === reserva.id_reserva;

  const handleClickCreate = () => {
    setPopupMode('create');
    setIsPopupOpen(true);
  };

  const handleClickUpdate = () => {
    if (selectedReserva) {
      setPopupMode('edit');
      setIsPopupOpen(true);
    }
  };

  const handlePopupAction = (data) => popupMode === 'create' ? handleCreate(data) : handleUpdate(data);

  const reservasFiltradas = reservas.filter(reserva => {
    const matchEspacio = !filtroEspacio || reserva.espacio?.tipo_espacio_comun?.toLowerCase().includes(filtroEspacio.toLowerCase());
    const matchFecha = !filtroFecha || reserva.fecha_reserva?.includes(filtroFecha);
    const matchResidente = !filtroResidente || `${reserva.residente?.nombre} ${reserva.residente?.apellido}`.toLowerCase().includes(filtroResidente.toLowerCase());
    return matchEspacio && matchFecha && matchResidente;
  });

  const getNombreEspacio = (r) => r.espacio?.tipo_espacio_comun || 'Espacio no encontrado';
  const getNombreResidente = (r) => r.residente ? `${r.residente.nombre} ${r.residente.apellido}` : 'Residente no encontrado';
  const getRutResidente = (r) => r.residente ? `${r.residente.rut_residente_num}-${r.residente.rut_residente_dv}` : '';

  const formatearFecha = (f) => new Date(f).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const formatearHora = (h) => h?.substring(0, 5);

  const getEstadoReserva = (r) => {
    const ahora = new Date();
    const fecha = new Date(r.fecha_reserva);
    const [hi] = r.hora_inicio.split(':');
    const [hf] = r.hora_fin.split(':');
    const inicio = new Date(fecha); inicio.setHours(+hi, +r.hora_inicio.split(':')[1]);
    const fin = new Date(fecha); fin.setHours(+hf, +r.hora_fin.split(':')[1]);

    if (fin < ahora) return 'pasada';
    if (inicio <= ahora && fin >= ahora) return 'en-curso';
    if (fecha.toDateString() === ahora.toDateString()) return 'hoy';
    return 'futura';
  };

  const calcularDuracion = (hi, hf) => {
    const [h1, m1] = hi.split(':').map(Number);
    const [h2, m2] = hf.split(':').map(Number);
    const mins = (h2 * 60 + m2) - (h1 * 60 + m1);
    return `${Math.floor(mins / 60)}h ${mins % 60 > 0 ? mins % 60 + 'm' : ''}`;
  };

  const tieneConflicto = (r) => reservas.some(o => o.id_reserva !== r.id_reserva && o.espacio?.id_espacio === r.espacio?.id_espacio && o.fecha_reserva === r.fecha_reserva && o.hora_inicio < r.hora_fin && o.hora_fin > r.hora_inicio);

  return (
    <div className="main-container">
      <div className="top-table">
        <h1 className="title-table">Reservas de Espacios Comunes</h1>
        <div className="filter-actions">
          <div className="filters">
            <input type="text" placeholder="Filtrar por espacio..." value={filtroEspacio} onChange={e => setFiltroEspacio(e.target.value)} className="filter-input" />
            <input type="date" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} className="filter-input" />
            <input type="text" placeholder="Filtrar por residente..." value={filtroResidente} onChange={e => setFiltroResidente(e.target.value)} className="filter-input" />
          </div>
          <div className="action-buttons">
            <button onClick={handleClickCreate} className="create-button">
              <span className="add-icon">+</span> Nueva Reserva
            </button>
            <button onClick={handleClickUpdate} disabled={!selectedReserva} className="update-button">
              <img src={!selectedReserva ? UpdateIconDisable : UpdateIcon} alt="edit" />
            </button>
            <button onClick={() => handleDelete([selectedReserva])} disabled={!selectedReserva} className="delete-button">
              <img src={!selectedReserva ? DeleteIconDisable : DeleteIcon} alt="delete" />
            </button>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card"><h3>Total Reservas</h3><span className="stat-number">{reservas.length}</span></div>
        <div className="stat-card"><h3>Hoy</h3><span className="stat-number">{reservas.filter(r => getEstadoReserva(r) === 'hoy').length}</span></div>
        <div className="stat-card"><h3>En Curso</h3><span className="stat-number">{reservas.filter(r => getEstadoReserva(r) === 'en-curso').length}</span></div>
        <div className="stat-card"><h3>Próximas</h3><span className="stat-number">{reservas.filter(r => getEstadoReserva(r) === 'futura').length}</span></div>
      </div>

      <div className="reservas-container">
        {reservasFiltradas.length === 0 ? <p className="no-results">No se encontraron reservas.</p> : (
          <div className="reservas-grid">
            {reservasFiltradas.map(reserva => (
              <div
                key={reserva.id_reserva}
                className={`reserva-card ${isSelected(reserva) ? 'selected' : ''} ${getEstadoReserva(reserva)} ${tieneConflicto(reserva) ? 'conflicto' : ''}`}
                onClick={() => toggleSelect(reserva)}
              >
                <div className="reserva-header">
                  <h3>{getNombreEspacio(reserva)}</h3>
                  <div className="badges">
                    {tieneConflicto(reserva) && <span className="badge conflicto">Conflicto</span>}
                    <span className={`badge estado ${getEstadoReserva(reserva)}`}>{getEstadoReserva(reserva).replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="reserva-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{formatearFecha(reserva.fecha_reserva)}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <span>{formatearHora(reserva.hora_inicio)} - {formatearHora(reserva.hora_fin)}</span>
                    </div>
                    <div className="duration">
                      <span className="duration-text">{calcularDuracion(reserva.hora_inicio, reserva.hora_fin)}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <img src={PersonIcon} alt="residente" className="detail-icon" />
                      <div className="residente-info">
                        <span className="residente-nombre">{getNombreResidente(reserva)}</span>
                        <span className="residente-rut">{getRutResidente(reserva)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reserva-footer">
                  <span className="reserva-id">ID: {reserva.id_reserva}</span>
                  <span className="espacio-estado">Espacio: {reserva.espacio?.estado_espacio_comun ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PopupReserva 
        show={isPopupOpen} 
        setShow={setIsPopupOpen} 
        data={popupMode === 'edit' ? selectedReserva : null} 
        action={handlePopupAction}
        mode={popupMode}
        espacios={espacios}
        residentes={residentes}
      />
    </div>
  );
};

export default ReservasEspacios;
