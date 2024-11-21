// src/pages/Foruns/ForunsFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackTribunal from './FeedbackTribunal';

const FeedbackTribunalPai = () => {
  const { id_tribunal } = useParams(); // Obtém o id_forum da URL
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_tribunais/${id_tribunal}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_tribunal]); // Dependência para refazer a busca quando o id_forum mudar

  return (
    <>
      <HeaderLggd/>
      <div>
        <FeedbackTribunal id_tribunal={id_tribunal} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default FeedbackTribunalPai;
