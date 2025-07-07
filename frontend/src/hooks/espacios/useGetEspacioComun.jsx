import { useState, useEffect } from 'react';
import { getEspaciosComunes } from '@services/EspacioComun.service.js';

const useEspacioComun = () => {
  const [espacios, setEspacios] = useState([]);

  const fetchEspacios = async () => {
    try {
      const response = await getEspaciosComunes();
      
      // Verificar que la respuesta existe y es un array
      if (!response || !Array.isArray(response)) {
        console.error("No se encontraron espacios comunes:", response);
        setEspacios([]);
        return;
      }

      // Los datos ya vienen formateados del servicio
      dataLogged(response);
      setEspacios(response);
    } catch (error) {
      console.error("Error fetching espacios comunes: ", error);
      setEspacios([]);
    }
  };

  useEffect(() => {
    fetchEspacios();
  }, []);

  const dataLogged = (formattedData) => {
    try {
      const usuario = sessionStorage.getItem('usuario');
      if (!usuario) return;

      const { id_espacio } = JSON.parse(usuario);
      for (let i = 0; i < formattedData.length; i++) {
        if (formattedData[i].id_espacio === id_espacio) {
          formattedData.splice(i, 1);
          break;
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return { espacios, fetchEspacios, setEspacios };
};

export default useEspacioComun;