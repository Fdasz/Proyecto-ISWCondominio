import { useState } from 'react';
import { getVisitante } from '@services/visitante.service';
import { getUser } from '@services/user.service';
import { showErrorAlert } from '@helpers/sweetAlert';

export const useSearchPerson = (formData, setFormData) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchType, setSearchType] = useState('');

    const handleSearch = async (searchFields) => {
        try {
            const apiParams = {};
            if (searchType === 'usuario') {
                if (searchFields.nombre?.trim()) apiParams.nombre_usuario = searchFields.nombre.trim();
                if (searchFields.rut?.trim()) apiParams.rut_usuario = searchFields.rut.trim();
            } else { // 'visitante'
                if (searchFields.nombre?.trim()) apiParams.nombre_visitante = searchFields.nombre.trim();
                if (searchFields.rut?.trim()) apiParams.rut_visitante = searchFields.rut.trim();
            }

            if (Object.keys(apiParams).length === 0) {
                showErrorAlert('Atención', 'Debes ingresar un RUT o un nombre para buscar.');
                return;
            }

            const service = searchType === 'usuario' ? getUser : getVisitante;
            const response = await service(apiParams);

            if (response?.status === 'Success' && response.data) {
                setSearchResults(Array.isArray(response.data) ? response.data : [response.data]);
            } else {
                setSearchResults([]);
                if (response?.message) {
                    showErrorAlert('Sin resultados', response.message);
                }
            }
        } catch (error) {
            console.error('Error in handleSearch:', error);
            showErrorAlert('Error', 'Ocurrió un error al realizar la búsqueda.');
            setSearchResults([]);
        }
    };

    const handleSelectPerson = (person) => {
        if (searchType === 'visitante') {
            setFormData({
                ...formData,
                rut_visitante: person.rut_visitante,
                nombre_visitante: person.nombre_visitante,
                patente_visitante: person.patente_visitante || ''
            });
        } else { // 'usuario'
            setFormData({
                ...formData,
                rut_usuario: person.rut_usuario,
                nombre_usuario: person.nombre_usuario
            });
        }
        setIsModalOpen(false);
    };

    const openSearchModal = (type) => {
        setSearchType(type);
        setSearchResults([]);
        setIsModalOpen(true);
    };

    return {
        searchResults,
        isModalOpen,
        setIsModalOpen,
        searchType,
        handleSearch,
        handleSelectPerson,
        openSearchModal
    };
};