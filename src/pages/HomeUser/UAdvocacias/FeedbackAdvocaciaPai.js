import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackAdvocacia from './FeedbackAdvocacias';

const FeedbackAdvocaciaPai = () => {
  const { id_advocacia } = useParams(); 
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_advocacia/${id_advocacia}`);
      setComments(response.data.comments); 
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id_advocacia]);

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
