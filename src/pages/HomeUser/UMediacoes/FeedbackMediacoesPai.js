import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackMediacoes from './FeedbackMediacoes';

const FeedbackMediacoesPai = () => {
  const { id_mediador } = useParams();
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_mediador/${id_mediador}`);
      setComments(response.data.comments); 
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); 
  }, [id_mediador]); 

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
