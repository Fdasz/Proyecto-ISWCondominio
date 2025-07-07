// filepath: src/hooks/visits/useVisitas.js
import { useState, useEffect, useCallback } from 'react';
import { searchVisitas } from '@services/visita.service.js';

export function useVisitas() {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );

    const [data, err] = await searchVisitas(activeFilters);

    if (err) {
      setError(err);
      setVisitas([]);
    } else {
      setVisitas(data || []); 
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const initialFilters = {
      startDate: yesterday.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    };
    performSearch(initialFilters);
  }, [performSearch]);

  return { visitas, loading, error, performSearch };
}