import { DateTime } from 'luxon';
import '@styles/visita_card.css';

const VisitaCard = ({ visita, onDelete }) => {
  const { id_visita, nombre_visitante, nombre_usuario, fecha_visita, visitante } = visita;

  const formattedDate = DateTime.fromISO(fecha_visita).toLocaleString(DateTime.DATETIME_SHORT);

  return (
    <div className="visita-card">
      <div className="card-section">
        <span className="card-label">Visitante</span>
        <span className="card-value">{nombre_visitante}</span>
      </div>
      <div className="card-section">
        <span className="card-label">Residente</span>
        <span className="card-value">{nombre_usuario}</span>
      </div>
      <div className="card-section">
        <span className="card-label">Fecha y Hora</span>
        <span className="card-value">{formattedDate}</span>
      </div>
      <div className="card-section">
        <span className="card-label">Patente</span>
        <span className="card-value">{visitante?.patente_visitante || 'N/A'}</span>
      </div>
      <div className="card-actions">
        <button onClick={() => onDelete(id_visita)} className="delete-button">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default VisitaCard;