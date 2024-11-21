// src/pages/Foruns/ForunsListPage.js
import React from 'react';
import FeedForuns from './FeedForuns'
import Header from  '../../../components/Header/index';
import Footer from '../../../components/Footer';
import ContainerLggd from '../../../components/ContainerLggd';


const UnloggedForuns = () => {
  

  

  return (
    <>
      <Header/>
      
      
      <ContainerLggd>
      
        <FeedForuns />
      </ContainerLggd>
      <Footer />
    </>
  );
};

export default UnloggedForuns;
