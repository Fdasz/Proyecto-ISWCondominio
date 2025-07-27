import { useState } from "react";
import { createReservaEspacio } from "@services/reservaEspacios.service.js";

const useCreateReservaEspacio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const crearReserva = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await createReservaEspacio(formData);

      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { crearReserva, loading, error, success };
};

export default useCreateReservaEspacio;
