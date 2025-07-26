import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';  

export default function Popup({ show, setShow, data, action }) {
    const espacioData = data || {};

    const handleSubmit = (formData) => {
        action(formData);
        setShow(false);
    };

    // Determinar si es crear o editar
    const isEditing = data && data.id_espacio;
    const title = isEditing ? "Editar Espacio Común" : "Crear Espacio Común";
    const buttonText = isEditing ? "Actualizar Espacio" : "Crear Espacio";

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title={title}
                        fields={[
                            {
                                label: "Tipo de Espacio Común",
                                name: "tipo_espacio_comun",
                                defaultValue: espacioData.tipo_espacio_comun || "",
                                placeholder: 'Ej: Piscina, Gimnasio, Salón de eventos',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 3,
                                maxLength: 60,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Descripción",
                                name: "descripcion_espacio_comun",
                                defaultValue: espacioData.descripcion_espacio_comun || "",
                                placeholder: 'Describe las características y servicios del espacio',
                                fieldType: 'textarea',
                                required: true,
                                minLength: 10,
                                maxLength: 255,
                            },
                            {
                                label: "Estado",
                                name: "estado_espacio_comun",
                                fieldType: 'select',
                                options: [
                                    { value: true, label: 'Activo' },
                                    { value: false, label: 'Inactivo' },
                                ],
                                required: true,
                                defaultValue: espacioData.estado_espacio_comun !== undefined ? espacioData.estado_espacio_comun : true,
                            }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText={buttonText}
                        backgroundColor={'#fff'}
                        onClose={() => window.location.reload()}
                    />
                </div>
            </div>
            )}
        </div>
    );
}