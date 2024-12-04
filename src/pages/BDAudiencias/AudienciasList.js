import React from 'react';
import { useNavigate } from 'react-router-dom';
import AudienciasListPageO from '../../components/BD/AudienciasListPage';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import HeaderAdm from '../../components/BD/HeaderAdm';


const AudienciasListPage = () => {
  const navigate = useNavigate();
  

  const handleEdit = (juiz) => {
    navigate('/admin/dashboard/juiz/edit', { state: { juiz } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/juiz/new');
  };

  return (
    <>
    <HeaderAdm>
    
    </HeaderAdm>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Juizes</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Juiz</button>
   </div>   
   <AudienciasListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default AudienciasListPage;
