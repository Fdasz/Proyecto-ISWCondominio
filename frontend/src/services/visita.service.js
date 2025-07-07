import axios from './root.service';

export const createVisita = async (visitData) => {
    try {
        const dataToSend = {
            rut_usuario: visitData.rut_usuario,
            rut_visitante: visitData.rut_visitante,
            nombre_usuario: visitData.nombre_usuario,
            nombre_visitante: visitData.nombre_visitante,
            patente_visitante: visitData.patente_visitante,
            fecha_visita: visitData.fecha_visita,
        };
        const response = await axios.post('/visitas', dataToSend);
        return response.data;
    } catch (error) {
        console.error("Error creating visit:", error.response?.data || error.message);
        return error.response?.data || { status: 'Error', message: 'Error de red' };
    }
};

export const searchVisitas = async (filters) => {
  try {
    const response = await axios.get('/visitas/search', {
      params: filters,
    });


    const backendData = response.data;

    if (backendData && backendData.status === 'Success') {
      return [backendData.data, null]; 
    } else {
      const message = backendData.message || 'La búsqueda no tuvo éxito.';
      console.error('[Service] Search failed:', message);
      return [null, message];
    }
  } catch (error) {
    console.error('[Service] CRITICAL ERROR searching visits:', error);
    const errorMessage = error.response?.data?.message || 'Error de red o en el servidor.';
    return [null, errorMessage];
  }
};