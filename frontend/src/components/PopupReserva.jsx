import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';


export default function PopupReserva({
  show,
  setShow,
  data = {},
  espacios = [],
  action,
  fechaSeleccionada
}) {
  const isEdit = !!data?.id_reserva;
  const reserva = data || {};

  const handleSubmit = (formData) => {
    const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined && key !== 'fecha_display') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const dataToSend = {
      ...cleanedData,
      id_espacio: cleanedData.id_espacio_comun,
      fecha_reserva: formData.fecha_reserva || fechaDefault,
      rut_usuario: '',
      ...(isEdit && { id_usuario: reserva.id_usuario }),
      ...(isEdit && { id_reserva: reserva.id_reserva })
    };
    delete dataToSend.id_espacio_comun;

    console.log("Datos enviados desde PopupReserva:", dataToSend); 
    console.log("Espacios disponibles:", espacios); 
    
    action(dataToSend);
  };

  const generarOpcionesHora = () => {
    const opciones = [];
    for (let h = 8; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hh = h.toString().padStart(2, '0');
        const mm = m.toString().padStart(2, '0');
        opciones.push({ value: `${hh}:${mm}`, label: `${hh}:${mm}` });
      }
    }
    return opciones;
  };

  const opcionesHora = generarOpcionesHora();
  const fechaDefault =
    reserva.fecha_reserva ||
    fechaSeleccionada?.toISOString().split('T')[0] ||
    new Date().toISOString().split('T')[0];

  return (
    show && (
      <div className="bg">
        <div className="popup">
          <button className="close" onClick={() => setShow(false)}>
            <img src={CloseIcon} alt="Cerrar" />
          </button>

          <Form
            title={isEdit ? 'Editar Reserva' : 'Nueva Reserva'}
            fields={[
              {
                label: 'Fecha',
                name: 'fecha_display',
                fieldType: 'text',
                required: false,
                disabled: true,
                defaultValue: new Date(fechaDefault).toLocaleDateString('es-CL'),
              },
              {
                label: 'Espacio Común',
                name: 'id_espacio_comun',
                fieldType: 'select',
                options: espacios
                .filter((e) => e.estado_espacio_comun !== false)
                .map((e) => ({
                  value: e.id_espacio,
                  label: e.tipo_espacio_comun,
                })),
                required: true,
                defaultValue: reserva.id_espacio_comun || reserva.espacio?.id_espacio || '',
              },
              {
                label: 'Hora de Inicio',
                name: 'hora_inicio',
                fieldType: 'select',
                options: opcionesHora,
                required: true,
                defaultValue: reserva.hora_inicio || '',
              },
              {
                label: 'Hora de Término',
                name: 'hora_fin',
                fieldType: 'select',
                options: opcionesHora,
                required: true,
                defaultValue: reserva.hora_fin || '',
              },
              {
                name: 'fecha_reserva',
                fieldType: 'hidden',
                defaultValue: fechaDefault,
              },
            ]}
            onSubmit={handleSubmit}
            buttonText={isEdit ? 'Guardar Cambios' : 'Crear Reserva'}
            backgroundColor="#fff"
          />
        </div>
      </div>
    )
  );
}