// src/pages/Tribunais/TribunaisFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AudienciasFormPageO from '../../components/BD/AudienciasFormPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';

const AudienciasFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const juizAtivo = location.state?.juiz || null;

  const handleSave = async (juiz) => {
    // Lógica de salvamento via API
    navigate('/admin/dashboard/juiz');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/juiz');
  };

  return (
    <>
    <HeaderLggd></HeaderLggd>
    <div>
      <AudienciasFormPageO juizAtivo={juizAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
    <Footer></Footer>
    </>
  );
};

export default AudienciasFormPage;
