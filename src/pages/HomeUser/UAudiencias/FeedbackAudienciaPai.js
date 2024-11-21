// src/pages/Foruns/ForunsFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackAudiencia from './FeedbackAudiencias';

const FeedbackAudienciaPai = () => {
  const { id_juiz } = useParams(); // Obtém o id_juiz da URL
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_juiz/${id_juiz}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_juiz]); // Dependência para refazer a busca quando o id_juiz mudar

  return (
    <>
      <HeaderLggd/>
      <div>
        <FeedbackAudiencia id_juiz={id_juiz} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default FeedbackAudienciaPai;
