import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortaisListPageO from '../../components/BD/PortaisListPage';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import HeaderAdm from '../../components/BD/HeaderAdm';




const PortaisListPage = () => {
  const navigate = useNavigate();
  

  const handleEdit = (portais) => {
    navigate('/admin/dashboard/portais/edit', { state: { portais } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/portais/new');
  };

  return (
    <>
    <HeaderAdm>
    </HeaderAdm>
    <ContainerLggd>
     
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Portais</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Portal</button>
   </div>   
   <PortaisListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
    
  );
};

export default PortaisListPage;
