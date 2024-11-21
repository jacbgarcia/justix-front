// src/pages/Foruns/ForunsFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackForum from './FeedbackForum';

const FeedbackForumPai = () => {
  const { id_forum } = useParams(); // Obtém o id_forum da URL
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_foruns/${id_forum}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_forum]); // Dependência para refazer a busca quando o id_forum mudar

  return (
    <>
      <HeaderLggd/>
      <div>
        <FeedbackForum id_forum={id_forum} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default FeedbackForumPai;
