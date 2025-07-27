import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupReserva({ show, setShow, data = {}, espacios = [], action }) {
  const isEdit = !!data?.id_reserva;

  const handleSubmit = (formData) => {
    action(formData);
  };

  const generarOpcionesHora = () => {
    const opciones = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hh = h.toString().padStart(2, '0');
        const mm = m.toString().padStart(2, '0');
        opciones.push({ value: `${hh}:${mm}`, label: `${hh}:${mm}` });
      }
    }
    return opciones;
  };

  const opcionesHora = generarOpcionesHora();

  return (
    <>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <Form
              title={isEdit ? "Editar Reserva" : "Nueva Reserva"}
              fields={[
                {
                  label: "Fecha",
                  name: "fecha_reserva",
                  defaultValue: data.fecha_reserva || new Date().toISOString().split('T')[0],
                  fieldType: "input",
                  type: "date",
                  required: true,
                  readOnly: true,
                },
                {
                  label: "Espacio Común",
                  name: "id_espacio",
                  fieldType: "select",
                  options: espacios.map(e => ({
                    value: e.id_espacio,
                    label: e.tipo_espacio_comun,
                  })),
                  required: true,
                  defaultValue: data.espacio?.id_espacio || "",
                },
                {
                  label: "Hora de Inicio",
                  name: "hora_inicio",
                  fieldType: "select",
                  options: opcionesHora,
                  required: true,
                  defaultValue: data.hora_inicio || "",
                },
                {
                  label: "Hora de Término",
                  name: "hora_fin",
                  fieldType: "select",
                  options: opcionesHora,
                  required: true,
                  defaultValue: data.hora_fin || "",
                },
              ]}
              onSubmit={handleSubmit}
              buttonText={isEdit ? "Guardar Cambios" : "Crear Reserva"}
              backgroundColor="#fff"
            />
          </div>
        </div>
      )}
    </>
  );
}
