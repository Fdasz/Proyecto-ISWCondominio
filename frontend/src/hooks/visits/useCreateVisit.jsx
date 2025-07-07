// src/hooks/visits/useCreateVisit.jsx
import { useState } from 'react';
import { createVisita } from '@services/visita.service';
import { searchVisitantes, searchUsuarios } from '@services/search.service';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert';

const useCreateVisit = () => {
    const [formData, setFormData] = useState({
        rut_visitante: '',
        nombre_visitante: '',
        rut_usuario: '',
        nombre_usuario: '',
        fecha_visita: new Date().toISOString().slice(0, 16),
        patente_visitante: ''
    });

    const [errors, setErrors] = useState({});
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchType, setSearchType] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.rut_visitante.trim()) {
            newErrors.rut_visitante = 'El RUT del visitante es requerido';
        }
        if (!formData.rut_usuario.trim()) {
            newErrors.rut_usuario = 'El RUT del residente es requerido';
        }
        if (!formData.fecha_visita) {
            newErrors.fecha_visita = 'La fecha de visita es requerida';
        }

        console.log('Validation values:', {
            rut_visitante: formData.rut_visitante,
            rut_usuario: formData.rut_usuario,
            fecha_visita: formData.fecha_visita
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

        if (!validateForm()) {
            showErrorAlert('Error', 'Por favor complete todos los campos requeridos');
            return;
        }

        try {
            const visitData = {
                rut_visitante: formData.rut_visitante,
                rut_usuario: formData.rut_usuario,
                fecha_visita: formData.fecha_visita,
                patente_visitante: formData.patente_visitante || null
            };

            console.log('Submitting visit data:', visitData);

            const response = await createVisita(visitData);
            
            if (response.status === 'Success') {
                showSuccessAlert('¡Éxito!', 'Visita registrada correctamente');
                setFormData({
                    rut_visitante: '',
                    nombre_visitante: '',
                    rut_usuario: '',
                    nombre_usuario: '',
                    fecha_visita: new Date().toISOString().slice(0, 16),
                    patente_visitante: ''
                });
            } else {
                showErrorAlert('Error', response.details || 'Error al registrar la visita');
            }
        } catch (error) {
            console.error('Error creating visit:', error);
            showErrorAlert('Error', 'Error al registrar la visita');
        }
    };

    const handleOpenSearch = (type) => {
        setSearchType(type === 'visitor' ? 'visitante' : 'usuario');
        setIsSearchOpen(true);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleSearch = async () => {
        try {
            console.log('Searching with type:', searchType);
            let results;
            
            if (searchType === 'visitante') {
                results = await searchVisitantes(searchQuery);
            } else if (searchType === 'usuario') {
                results = await searchUsuarios(searchQuery);
            }

            console.log('Search results:', results);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching:', error);
            showErrorAlert('Error', 'Error al buscar');
        }
    };

    const handleSelectPerson = (selectedPerson) => {
        if (searchType === 'visitante') {
            setFormData(prev => ({
                ...prev,
                rut_visitante: selectedPerson.rut_visitante,
                nombre_visitante: selectedPerson.nombre_visitante
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                rut_usuario: selectedPerson.rut_usuario,
                nombre_usuario: selectedPerson.nombre_usuario
            }));
        }
        setIsSearchOpen(false);
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        errors,
        isSearchOpen,
        setIsSearchOpen,
        searchType,
        handleOpenSearch,
        handleSelectPerson,
        searchQuery,
        setSearchQuery,
        handleSearch,
        searchResults
    };
};

export default useCreateVisit;