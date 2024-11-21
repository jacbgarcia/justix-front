// src/pages/Tribunais/TribunaisListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TribunaisListPageO from '../../components/BD/TribunaisListPage';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import HeaderAdm from '../../components/BD/HeaderAdm';




const TribunaisListPage = () => {
  const navigate = useNavigate();



  const handleEdit = (tribunal) => {
    navigate('/admin/dashboard/tribunais/edit', { state: { tribunal } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/tribunais/new');
  };

  return (
    <>
    <HeaderAdm>
    </HeaderAdm>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Tribunais</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Tribunal</button>
   </div>   
   <TribunaisListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
    
  );
};

export default TribunaisListPage;
