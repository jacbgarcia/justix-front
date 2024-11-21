// src/pages/Usuarios/UsuariosFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UsuariosForm from './UsuariosForm';

const UsuariosFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioAtivo = location.state?.usuario || null;

  const handleSave = async (usuario) => {
    // Lógica de salvamento via API
    navigate('/usuarios');
  };

  const handleCancel = () => {
    navigate('/usuarios');
  };

  return (
    <div>
      <UsuariosForm usuarioAtivo={usuarioAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default UsuariosFormPage;
