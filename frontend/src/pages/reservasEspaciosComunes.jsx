import { useState } from "react";
import getReservasEspacio from "@hooks/reservas/useGetReserva";
import createReservaEspacio from "@hooks/reservas/useCreateReserva";
import updateReservaEspacio from "@hooks/reservas/useEditReserva";
import deleteReservaEspacio from "@hooks/reservas/useDeleteReserva";
import useEspacioComun from "@hooks/espacios/useGetEspacioComun";
import PopupReserva from "@components/PopupReserva";
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import addIcon from '../assets/addIcon.svg';
import { parseJwt } from '../helpers/jwt';
import Cookies from 'js-cookie';
import '@styles/reservas.css';

const ReservasEspaciosComunes = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('create');
  const { reservas, loading: loadingReservas, fetchReservas } = getReservasEspacio();
  const { espacios } = useEspacioComun();
  const { crearReserva } = createReservaEspacio();
  const { editarReserva } = updateReservaEspacio();
  const { eliminarReserva } = deleteReservaEspacio();
  const token = Cookies.get('jwt-auth');
  const usuario = token ? parseJwt(token) : null;

  const handleCreate = async (data) => {
    try {
      if (!data.fecha_reserva || !data.hora_inicio || !data.hora_fin) {
        console.error("Datos faltantes:", data);
        alert("Por favor, completa todos los campos requeridos.");
        return false;
      }
      const usuarioJson = sessionStorage.getItem('usuario');
      const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;

      if (data.hora_inicio >= data.hora_fin) {
        alert("La hora de inicio debe ser anterior a la hora de fin.");
        return false;
      }

      console.log(usuario);

      const formattedData = {
        fecha_reserva: data.fecha_reserva,
        hora_inicio: data.hora_inicio,
        hora_fin: data.hora_fin,
        id_espacio: parseInt(data.id_espacio, 10),
        rut_usuario: usuario.rut_usuario,
        ...(data.descripcion && { descripcion: data.descripcion }),
        ...(data.id_usuario && { id_usuario: data.id_usuario }),
      };

      const result = await crearReserva(formattedData);
      if (result) {
        await fetchReservas();
        setIsPopupOpen(false);
        setSelectedReserva(null);
        alert("Reserva creada exitosamente");
      }
      return result;
    } catch (error) {
      console.error("Error al crear reserva:", error);
      alert(`Error al crear reserva: ${error.response?.data?.message || error.message}`);
      return false;
    }
  };


  const handleUpdate = async (data) => {
    try {
      console.log("Datos enviados para actualizar reserva:", data); // Debug
      const result = await editarReserva(selectedReserva.id_reserva, data);
      if (result) {
        await fetchReservas();
        setIsPopupOpen(false);
        setSelectedReserva(null);
      }
      if (data.hora_inicio >= data.hora_fin) {
        alert("La hora de inicio debe ser anterior a la hora de fin.");
        return false;
      }

      return result;
    } catch (error) {
      console.error("Error al actualizar reserva:", error);
      return false;
    }
  };

  const deleteReservation = async () => {
    if (selectedReserva) {
      await handleDelete();
    } else {
      alert("Por favor, selecciona una reserva para eliminar.");
    }
  };

  const handleDelete = async () => {
    if (selectedReserva) {
      try {
        const result = await eliminarReserva(selectedReserva.id_reserva);
        if (result) {
          await fetchReservas();
          setSelectedReserva(null);
        }
      } catch (error) {
        console.error("Error al eliminar reserva:", error);
      }
    }
  };

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay() === 0 ? 6 : startOfMonth.getDay() - 1;
  const daysInMonth = endOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    if (
      selectedDate &&
      selectedDate.getDate() === clickedDate.getDate() &&
      selectedDate.getMonth() === clickedDate.getMonth() &&
      selectedDate.getFullYear() === clickedDate.getFullYear()
    ) {
      setSelectedDate(null);
      setSelectedReserva(null); 
    } else {
      setSelectedDate(clickedDate);
      setSelectedReserva(null); 
    }
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalCells = startDay + daysInMonth;

    for (let i = 0; i < totalCells; i++) {
      if (i < startDay) {
        days.push(<div key={`empty-${i}`} className="calendar-day other-month"></div>);
      } else {
        const dayNum = i - startDay + 1;
        const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
        current.setHours(0, 0, 0, 0);
        const isPast = current < today;

        const isSelected =
          selectedDate &&
          selectedDate.getDate() === dayNum &&
          selectedDate.getMonth() === currentDate.getMonth() &&
          selectedDate.getFullYear() === currentDate.getFullYear();

        days.push(
          <div
            key={dayNum}
            className={`calendar-day ${isSelected ? "selected" : ""} ${isPast ? "past-day" : ""}`}
            onClick={() => !isPast && handleDayClick(dayNum)}
          >
            {dayNum}
          </div>
        );
      }
    }
    return days;
  };

  const reservasDelDia = reservas.filter((reserva) => {
    if (!selectedDate) return false;
    const reservaFecha = new Date(reserva.fecha_reserva);
    reservaFecha.setDate(reservaFecha.getDate() + 1); // ajuste por bug

    return (
      reservaFecha.getDate() === selectedDate.getDate() &&
      reservaFecha.getMonth() === selectedDate.getMonth() &&
      reservaFecha.getFullYear() === selectedDate.getFullYear()
    );
  });

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const addReservation = () => {
    if (!selectedDate) {
      alert("Por favor, selecciona una fecha para crear una reserva.");
      return;
    }
    
    const fechaFormateada = selectedDate.toISOString().split('T')[0];
    
    setPopupMode('create');
    setSelectedReserva({ 
      fecha_reserva: fechaFormateada,
      hora_inicio: '',
      hora_fin: '',
      id_espacio_comun: '',
    });
    setIsPopupOpen(true);
  };

  const editReservation = () => {
    if (!selectedReserva) {
      alert("Selecciona una reserva para editar");
      return;
    }
    setPopupMode('edit');
    setIsPopupOpen(true);
  };

  const handlePopupAction = async (data) => {
    console.log("Modo popup:", popupMode); 
    console.log("Datos recibidos del popup:", data);
    
    if (popupMode === 'create') {
      return await handleCreate(data);
    } else {
      return await handleUpdate(data);
    }
  };

  const formatearHora = (hora) => hora?.slice(0, 5) || ""; // Simple formatter

  return (
    <div className="container">
      <div className="header">
        <h1>Sistema de Reservas</h1>
      </div>

      <div className="main-content">
        <div className="calendar-section">
          <div className="calendar-header">
            <h2 className="calendar-title">Calendario de Reservas</h2>
            <div className="filter-actions-espacios">
              <button onClick={addReservation} disabled={!selectedDate}>
                <img
                  src={addIcon}
                  alt="add"
                />
              </button>

              <button onClick={editReservation} disabled={!selectedReserva}>
                <img
                  src={!selectedReserva ? UpdateIconDisable : UpdateIcon}
                  alt="edit"
                />
              </button>

              <button
                className="delete-user-button"
                onClick={deleteReservation}
                disabled={!selectedReserva}
              >
                <img
                  src={!selectedReserva ? DeleteIconDisable : DeleteIcon}
                  alt="delete"
                />
              </button>
            </div>
          </div>

          <div className="calendar-nav">
            <button className="nav-btn" onClick={handlePrevMonth}>←</button>
            <span className="month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button className="nav-btn" onClick={handleNextMonth}>→</button>
          </div>

          <div className="calendar-grid">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, index) => (
              <div key={index} className="calendar-header-cell">{day}</div>
            ))}
            {renderDays()}
          </div>
        </div>

        <div className="reservations-panel">
          <div className="panel-header">
            <h3 className="panel-title">Reservas del Día</h3>
            <div className="selected-date" id="selectedDate">
              {selectedDate
                ? selectedDate.toLocaleDateString("es-CL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })
                : "Selecciona una fecha"}
            </div>
          </div>

          <div id="reservationsList">
            {selectedDate ? (
              reservasDelDia.length > 0 ? (
                <div className="reservation-grid">
                  {reservasDelDia.map((reserva) => (
                    <div
                      key={reserva.id_reserva}
                      className={`reservation-card ${selectedReserva?.id_reserva === reserva.id_reserva ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedReserva(reserva);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p><strong>{formatearHora(reserva.hora_inicio)} - {formatearHora(reserva.hora_fin)}</strong></p>
                      <p><strong>Espacio:</strong> {reserva.espacio?.tipo_espacio_comun}</p>
                      <p><strong>Reservado por:</strong> {reserva.usuario?.nombre_usuario}</p>
                      <p><strong>Contacto:</strong> {usuario?.email_usuario}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay reservas para este día.</p>
              )
            ) : (
              <p>Selecciona una fecha para ver reservas.</p>
            )}
          </div>
        </div>
      </div>
      <PopupReserva
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={selectedReserva}
        espacios={espacios}
        action={handlePopupAction}
        fechaSeleccionada={selectedDate}
        mode={popupMode}
      />
    </div>
  );
};

export default ReservasEspaciosComunes;