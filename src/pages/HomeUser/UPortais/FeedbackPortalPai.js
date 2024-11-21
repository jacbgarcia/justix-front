// src/pages/Foruns/ForunsFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackPortal from './FeedbackPortais';

const FeedbackPortalPai = () => {
  const { id_portal } = useParams(); // Obtém o id_portal da URL
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_portal/${id_portal}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_portal]); // Dependência para refazer a busca quando o id_portal mudar

  return (
    <>
      <HeaderLggd/>
      <div>
        <FeedbackPortal id_portal={id_portal} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default FeedbackPortalPai;
