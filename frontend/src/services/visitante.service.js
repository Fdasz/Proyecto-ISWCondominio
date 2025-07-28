import axios from './root.service';

export const getVisitante = async (query) => {
  try {
    const { data } = await axios.get('/visitantes/detail', { params: query });
    return {
      status: 'Success',
      data: data.data
    };
  } catch (error) {
    return {
      status: 'Error',
      details: error.response?.data?.message || 'Error al buscar visitante'
    };
  }
};

export async function createVisitante(visitanteData) {
  try {
    const { data } = await axios.post('/visitantes', visitanteData);
    return [data.data, null];
  } catch (error) {
    console.error('Error creating visitante:', error);
    return [null, error.response?.data?.message || 'Error al crear visitante'];
  }
}

export async function updateVisitante(id, visitanteData) {
  try {
    const { data } = await axios.patch(`/visitantes/${id}`, visitanteData);
    return [data.data, null];
  } catch (error) {
    return [null, error.response?.data?.message || 'Error al actualizar visitante'];
  }
}
