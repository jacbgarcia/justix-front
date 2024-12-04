import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackAudiencia from './FeedbackAudiencias';

const FeedbackAudienciaPai = () => {
  const { id_juiz } = useParams(); 
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_juiz/${id_juiz}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); 
  }, [id_juiz]); 

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
