import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdvocaciasFormPageO from '../../components/BD/AdvocaciaFormPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';

const AdvocaciasFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const advocaciaAtivo = location.state?.advocacia|| null;

  const handleSave = async (advocacia) => {
    
    navigate('/admin/dashboard/advocacia');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/advocacia');
  };

  return (
    <>
    <HeaderLggd></HeaderLggd>
    <div>
      <AdvocaciasFormPageO advocaciaAtivo={advocaciaAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
    <Footer></Footer>
    </>
  );
};

export default AdvocaciasFormPage;