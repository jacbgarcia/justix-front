// src/pages/Foruns/ForunsListPage.js
import React from 'react';
import FeedTribunais from './FeedTribunais'
import Header from  '../../../components/Header/index';
import Footer from '../../../components/Footer';
import ContainerLggd from '../../../components/ContainerLggd';


const UnloggedTribunais = () => {
  

  

  return (
    <>
      <Header/>
      
      
      <ContainerLggd>
      
        <FeedTribunais />
      </ContainerLggd>
      <Footer />
    </>
  );
};

export default UnloggedTribunais;
