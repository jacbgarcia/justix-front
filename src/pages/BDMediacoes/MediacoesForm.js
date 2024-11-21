// src/pages/Foruns/ForunsFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MediacoesFormPageO from '../../components/BD/MediacoesFormPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';

const MediacoesFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mediadorAtivo = location.state?.mediador || null;

  const handleSave = async (mediador) => {
    // Lógica de salvamento via API
    navigate('/admin/dashboard/mediador');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/mediador');
  };

  return (
    <>
    <HeaderLggd></HeaderLggd>
    <div>
      <MediacoesFormPageO mediadorAtivo={mediadorAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
    <Footer></Footer>
    </>
  );
};

export default MediacoesFormPage;