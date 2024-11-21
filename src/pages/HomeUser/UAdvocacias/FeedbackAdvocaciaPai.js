// src/pages/Foruns/ForunsFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackAdvocacia from './FeedbackAdvocacias';

const FeedbackAdvocaciaPai = () => {
  const { id_advocacia } = useParams(); // Obtém o id_advocacia da URL
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_advocacia/${id_advocacia}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_advocacia]); // Dependência para refazer a busca quando o id_advocacia mudar

  return (
    <>
      <HeaderLggd/>
      <div>
        <FeedbackAdvocacia id_advocacia={id_advocacia} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default FeedbackAdvocaciaPai;
