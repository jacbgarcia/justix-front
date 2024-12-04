import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackForum from './FeedbackForum';

const FeedbackForumPai = () => {
  const { id_forum } = useParams(); 
  const [comments, setComments] = useState([]);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_foruns/${id_forum}`);
      setComments(response.data.comments); 
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id_forum]); 

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
