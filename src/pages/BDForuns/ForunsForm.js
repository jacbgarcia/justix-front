import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ForunsFormPageO from '../../components/BD/ForunsFormPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';

const ForunsFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const forumAtivo = location.state?.forum || null;

  const handleSave = async (forum) => {
   
    navigate('/admin/dashboard/foruns');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/foruns');
  };

  return (
    <>
    <HeaderLggd></HeaderLggd>
    <div>
      <ForunsFormPageO forumAtivo={forumAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
    <Footer></Footer>
    </>
  );
};

export default ForunsFormPage;