import { useEffect, useState } from "react";
import { getReservasEspacio } from "@services/reservaEspacios.service.js";

const useReservasEspacios = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const data = await getReservasEspacio();
      setReservas(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return { reservas, loading, error, fetchReservas };
};

export default useReservasEspacios;
