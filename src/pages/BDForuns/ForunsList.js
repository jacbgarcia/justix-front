// src/pages/Foruns/ForunsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForunsListPageO from '../../components/BD/ForunsListPage';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import HeaderAdm from '../../components/BD/HeaderAdm';


const ForunsListPage = () => {
  const navigate = useNavigate();
  


  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/foruns/new');
  };

  return (
    <>
    <HeaderAdm>
      

    </HeaderAdm>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Fóruns</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Fórum</button>
   </div>   
   <ForunsListPageO onEdit={handleEdit} />
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default ForunsListPage;