import { useState } from "react";
import { updateReservaEspacio } from "@services/reservaEspacios.service.js"; // Asegúrate que este servicio exista

const useEditReservaEspacios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const editarReserva = async (id_reserva, datosActualizados) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await updateReservaEspacio(id_reserva, datosActualizados);

      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editarReserva, loading, error, success };
};

export default useEditReservaEspacios;
