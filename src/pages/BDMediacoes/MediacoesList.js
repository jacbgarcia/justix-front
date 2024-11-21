// src/pages/Foruns/ForunsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MediacoesListPageO from '../../components/BD/MediacoesListPage';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import HeaderAdm from '../../components/BD/HeaderAdm';

const MediacoesListPage = () => {
  const navigate = useNavigate();
  

  const handleEdit = (mediador) => {
    navigate('/admin/dashboard/mediador/edit', { state: { mediador } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/mediador/new');
  };

  return (
    <>
    <HeaderAdm>
    
    </HeaderAdm>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Mediadores</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Mediador</button>
   </div>   
   <MediacoesListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default MediacoesListPage;