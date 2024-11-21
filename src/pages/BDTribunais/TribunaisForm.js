// src/pages/Tribunais/TribunaisFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TribunaisFormPageO from '../../components/BD/TribunaisFormPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';

const TribunaisFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tribunalAtivo = location.state?.tribunal || null;

  const handleSave = async (tribunal) => {
    // Lógica de salvamento via API
    navigate('/admin/dashboard/tribunais');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/tribunais');
  };

  return (
    <>
    <HeaderLggd></HeaderLggd>
    <div>
      <TribunaisFormPageO tribunalAtivo={tribunalAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
    <Footer></Footer>
    </>
  );
};

export default TribunaisFormPage;
