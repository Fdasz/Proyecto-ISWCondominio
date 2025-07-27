import { useState } from "react";
import { deleteReservaEspacio } from "@services/reservaEspacios.service.js";

const useDeleteReservaEspacios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const eliminarReserva = async (id_reserva) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await deleteReservaEspacio(id_reserva);

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { eliminarReserva, loading, error, success };
};

export default useDeleteReservaEspacios;
