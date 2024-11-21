// src/pages/Usuarios/UsuariosListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosList from './UsuariosList';

const UsuariosListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (usuario) => {
    navigate('/usuarios/edit', { state: { usuario } });
  };

  const handleNew = () => {
    navigate('/usuarios/new');
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <button onClick={handleNew}>Novo Usuário</button>
      <UsuariosList onEdit={handleEdit} />
    </div>
  );
};

export default UsuariosListPage;