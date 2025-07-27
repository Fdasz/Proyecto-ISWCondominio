import { useState, useEffect } from "react";

const useAuth = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return { usuario, logout };
};

export default useAuth;
