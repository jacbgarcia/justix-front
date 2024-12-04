import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackTribunal from './FeedbackTribunal';

const FeedbackTribunalPai = () => {
  const { id_tribunal } = useParams(); 
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_tribunais/${id_tribunal}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id_tribunal]);

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
