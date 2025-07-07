// src/hooks/visits/useSearchPerson.jsx
import { useState } from 'react';
import { getVisitante } from '@services/visitante.service';
import { getUser } from '@services/user.service';

const useSearchPerson = (formData, setFormData) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchType, setSearchType] = useState('visitor');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      if (searchType === 'visitor') {
        const [visitors, error] = await getVisitante({
          rut_visitante: searchQuery,
          nombre_visitante: searchQuery
        });
        
        if (error) {
          console.error(error);
          setSearchResults([]);
        } else {
          setSearchResults(Array.isArray(visitors) ? visitors : [visitors]);
        }
      } else {
        const [users, error] = await getUser({
          rut_usuario: searchQuery,
          nombre_usuario: searchQuery
        });
        
        if (error) {
          console.error(error);
          setSearchResults([]);
        } else {
          setSearchResults(Array.isArray(users) ? users : [users]);
        }
      }
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
  };

  const handleSelectPerson = (person) => {
    if (searchType === 'visitor') {
      setFormData({
        ...formData,
        rut_visitante: person.rut_visitante,
        nombre_visitante: person.nombre_visitante,
        ...(person.patente_visitante && { patente_visitante: person.patente_visitante })
      });
    } else {
      setFormData({
        ...formData,
        rut_usuario: person.rut_usuario,
        nombre_residente: person.nombre_usuario
      });
    }
  };

  return {
    isSearchOpen,
    setIsSearchOpen,
    searchType,
    setSearchType,
    searchResults,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleSelectPerson
  };
};

export default useSearchPerson;