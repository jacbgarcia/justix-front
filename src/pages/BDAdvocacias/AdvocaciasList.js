import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvocaciaListPageO from '../../components/BD/AdvocaciaListPage';
import Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd';
import style from '../../components/Card/Card.module.css';
import HeaderAdm from '../../components/BD/HeaderAdm';

const AdvocaciasListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (advocacia) => {
    navigate('/admin/dashboard/advocacia/edit', { state: { advocacia } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/advocacia/new');
  };

  return (
    <>
      <HeaderAdm>
        
      </HeaderAdm>
      <ContainerLggd>
        <div className="flex flex-col items-center justify-center space-y-4 h-screen">
          <h2 className="text-center text-xl">Lista de Advocacia</h2>
          <button className={`${style.visualizarbtn1} text-center text-xl`} onClick={handleNew}>
            Adicionar ao Setor
          </button>
        </div>
        <AdvocaciaListPageO onEdit={handleEdit} />
      </ContainerLggd>
      <Footer />
    </>
  );
};

export default AdvocaciasListPage;
