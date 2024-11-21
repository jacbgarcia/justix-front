// src/pages/Foruns/ForunsFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackMediacoes from './FeedbackMediacoes';

const FeedbackMediacoesPai = () => {
  const { id_mediador } = useParams(); // Obtém o id_mediador da URL
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_mediador/${id_mediador}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_mediador]); // Dependência para refazer a busca quando o id_mediador mudar

  return (
    <>
      <HeaderLggd/>
      <div>
        <FeedbackMediacoes id_mediador={id_mediador} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default FeedbackMediacoesPai;
