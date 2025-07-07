import { useState, useEffect } from 'react';
import '@styles/popup.css';

const PopupReserva = ({ show, setShow, data, action, mode, espacios, residentes }) => {
  const [formData, setFormData] = useState({
    id_espacio: '',
    id_residente: '',
    fecha_reserva: '',
    hora_inicio: '',
    hora_fin: '',
    proposito_reserva: '',
    observaciones: '',
    estado_reserva: 'activa'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Cargar datos cuando el popup se abre
  useEffect(() => {
    if (show) {
      if (mode === 'edit' && data) {
        setFormData({
          id_espacio: data.id_espacio || '',
          id_residente: data.id_residente || '',
          fecha_reserva: data.fecha_reserva || '',
          hora_inicio: data.hora_inicio || '',
          hora_fin: data.hora_fin || '',
          proposito_reserva: data.proposito_reserva || '',
          observaciones: data.observaciones || '',
          estado_reserva: data.estado_reserva || 'activa'
        });
      } else {
        // Limpiar formulario para crear nueva reserva
        setFormData({
          id_espacio: '',
          id_residente: '',
          fecha_reserva: '',
          hora_inicio: '',
          hora_fin: '',
          proposito_reserva: '',
          observaciones: '',
          estado_reserva: 'activa'
        });
      }
      setErrors({});
    }
  }, [show, mode, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id_espacio) {
      newErrors.id_espacio = 'Debe seleccionar un espacio común';
    }
    
    if (!formData.id_residente) {
      newErrors.id_residente = 'Debe seleccionar un residente';
    }
    
    if (!formData.fecha_reserva) {
      newErrors.fecha_reserva = 'Debe seleccionar una fecha';
    }
    
    if (!formData.hora_inicio) {
      newErrors.hora_inicio = 'Debe especificar hora de inicio';
    }
    
    if (!formData.hora_fin) {
      newErrors.hora_fin = 'Debe especificar hora de fin';
    }
    
    if (formData.hora_inicio && formData.hora_fin && formData.hora_inicio >= formData.hora_fin) {
      newErrors.hora_fin = 'La hora de fin debe ser mayor a la hora de inicio';
    }
    
    // Validar que la fecha no sea en el pasado (solo para nuevas reservas)
    if (mode === 'create' && formData.fecha_reserva) {
      const fechaReserva = new Date(formData.fecha_reserva);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaReserva < hoy) {
        newErrors.fecha_reserva = 'No se pueden hacer reservas en fechas pasadas';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const dataToSend = mode === 'edit' ? { ...formData, id_reserva: data.id_reserva } : formData;
      const result = await action(dataToSend);
      
      if (result.success) {
        setShow(false);
      }
    } catch (error) {
      console.error('Error al procesar reserva:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      id_espacio: '',
      id_residente: '',
      fecha_reserva: '',
      hora_inicio: '',
      hora_fin: '',
      proposito_reserva: '',
      observaciones: '',
      estado_reserva: 'activa'
    });
    setErrors({});
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>{mode === 'edit' ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label htmlFor="id_espacio">Espacio Común *</label>
            <select
              id="id_espacio"
              name="id_espacio"
              value={formData.id_espacio}
              onChange={handleChange}
              className={errors.id_espacio ? 'error' : ''}
            >
              <option value="">Seleccione un espacio</option>
              {espacios.filter(espacio => espacio.estado_espacio_comun).map(espacio => (
                <option key={espacio.id_espacio} value={espacio.id_espacio}>
                  {espacio.tipo_espacio_comun}
                </option>
              ))}
            </select>
            {errors.id_espacio && <span className="error-message">{errors.id_espacio}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="id_residente">Residente *</label>
            <select
              id="id_residente"
              name="id_residente"
              value={formData.id_residente}
              onChange={handleChange}
              className={errors.id_residente ? 'error' : ''}
            >
              <option value="">Seleccione un residente</option>
              {residentes.map(residente => (
                <option key={residente.id_residente} value={residente.id_residente}>
                  {residente.nombre} {residente.apellido}
                </option>
              ))}
            </select>
            {errors.id_residente && <span className="error-message">{errors.id_residente}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha_reserva">Fecha *</label>
              <input
                type="date"
                id="fecha_reserva"
                name="fecha_reserva"
                value={formData.fecha_reserva}
                onChange={handleChange}
                className={errors.fecha_reserva ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.fecha_reserva && <span className="error-message">{errors.fecha_reserva}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="hora_inicio">Hora Inicio *</label>
              <input
                type="time"
                id="hora_inicio"
                name="hora_inicio"
                value={formData.hora_inicio}
                onChange={handleChange}
                className={errors.hora_inicio ? 'error' : ''}
              />
              {errors.hora_inicio && <span className="error-message">{errors.hora_inicio}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="hora_fin">Hora Fin *</label>
              <input
                type="time"
                id="hora_fin"
                name="hora_fin"
                value={formData.hora_fin}
                onChange={handleChange}
                className={errors.hora_fin ? 'error' : ''}
              />
              {errors.hora_fin && <span className="error-message">{errors.hora_fin}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="proposito_reserva">Propósito</label>
            <input
              type="text"
              id="proposito_reserva"
              name="proposito_reserva"
              value={formData.proposito_reserva}
              onChange={handleChange}
              placeholder="Motivo de la reserva"
            />
          </div>

          <div className="form-group">
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Observaciones adicionales"
              rows="3"
            />
          </div>

          {mode === 'edit' && (
            <div className="form-group">
              <label htmlFor="estado_reserva">Estado</label>
              <select
                id="estado_reserva"
                name="estado_reserva"
                value={formData.estado_reserva}
                onChange={handleChange}
              >
                <option value="activa">Activa</option>
                <option value="cancelada">Cancelada</option>
                <option value="completada">Completada</option>
              </select>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Procesando...' : (mode === 'edit' ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupReserva;