import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PortaisFormPageO from '../../components/BD/PortaisFormPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';

const PortaisFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portaisAtivo = location.state?.portais || null;

  const handleSave = async (portais) => {
  
    navigate('/admin/dashboard/portais');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/portais');
  };

  return (
    <>
    <HeaderLggd></HeaderLggd>
    <div>
      <PortaisFormPageO portaisAtivo={portaisAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
    <Footer></Footer>
    </>
  );
};

export default PortaisFormPage;