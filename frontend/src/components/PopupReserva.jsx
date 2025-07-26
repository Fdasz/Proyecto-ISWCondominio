
import { useState } from "react";

// Componente Popup para crear/editar reservas
const PopupReserva = ({ selectedDate, espacios, popupMode, selectedReserva, onClose, onSubmit, formatDate }) => {
  const [formData, setFormData] = useState({
    id_espacio: selectedReserva?.espacio?.id_espacio || '',
    hora_inicio: selectedReserva?.hora_inicio || '08:00',
    hora_fin: selectedReserva?.hora_fin || '09:00'
  });

  // Generar opciones de horario (8:00 AM - 12:00 PM, intervalos de 15 min)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    options.push('12:00');
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Validar que la hora de fin sea al menos 1 hora después del inicio
  const validateHours = (inicio, fin) => {
    const [inicioHour, inicioMin] = inicio.split(':').map(Number);
    const [finHour, finMin] = fin.split(':').map(Number);
    
    const inicioTotal = inicioHour * 60 + inicioMin;
    const finTotal = finHour * 60 + finMin;
    
    return finTotal - inicioTotal >= 60;
  };

  const handleSubmit = () => {
    if (!formData.id_espacio) {
      alert('Por favor selecciona un espacio');
      return;
    }
    
    if (!validateHours(formData.hora_inicio, formData.hora_fin)) {
      alert('La reserva debe tener una duración mínima de 1 hora');
      return;
    }

    const submitData = {
      ...formData,
      fecha_reserva: selectedDate.toISOString().split('T')[0]
    };

    if (popupMode === 'edit' && selectedReserva) {
      submitData.id_reserva = selectedReserva.id_reserva;
    }

    onSubmit(submitData);
  };

  const handleHoraInicioChange = (e) => {
    const nuevaHoraInicio = e.target.value;
    setFormData(prev => {
      const [hour, min] = nuevaHoraInicio.split(':').map(Number);
      const siguienteHora = `${(hour + 1).toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      
      return {
        ...prev,
        hora_inicio: nuevaHoraInicio,
        hora_fin: timeOptions.includes(siguienteHora) ? siguienteHora : prev.hora_fin
      };
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        minWidth: '400px',
        maxWidth: '500px'
      }}>
        <h3 style={{margin: '0 0 1rem 0'}}>
          {popupMode === 'create' ? 'Nueva Reserva' : 'Editar Reserva'}
        </h3>
        
        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px'}}>
          <strong>Fecha:</strong> {formatDate(selectedDate)}
        </div>

        <div>
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
              Espacio:
            </label>
            <select
              value={formData.id_espacio}
              onChange={(e) => setFormData(prev => ({...prev, id_espacio: e.target.value}))}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="">Selecciona un espacio</option>
              {espacios.map(espacio => (
                <option key={espacio.id_espacio} value={espacio.id_espacio}>
                  {espacio.tipo_espacio_comun} - {espacio.descripcion_espacio_comun}
                </option>
              ))}
            </select>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                Hora de inicio:
              </label>
              <select
                value={formData.hora_inicio}
                onChange={handleHoraInicioChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              >
                {timeOptions.slice(0, -4).map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                Hora de fin:
              </label>
              <select
                value={formData.hora_fin}
                onChange={(e) => setFormData(prev => ({...prev, hora_fin: e.target.value}))}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              >
                {timeOptions.map(time => {
                  const isValid = validateHours(formData.hora_inicio, time);
                  return (
                    <option key={time} value={time} disabled={!isValid}>
                      {time} {!isValid ? '(muy pronto)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div style={{
            padding: '0.75rem',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            <strong>Duración:</strong> {
              (() => {
                const [inicioHour, inicioMin] = formData.hora_inicio.split(':').map(Number);
                const [finHour, finMin] = formData.hora_fin.split(':').map(Number);
                const duracionMin = (finHour * 60 + finMin) - (inicioHour * 60 + inicioMin);
                const horas = Math.floor(duracionMin / 60);
                const minutos = duracionMin % 60;
                return `${horas}h ${minutos > 0 ? minutos + 'm' : ''}`;
              })()
            }
          </div>

          <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#4caf50',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {popupMode === 'create' ? 'Crear Reserva' : 'Actualizar Reserva'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupReserva;