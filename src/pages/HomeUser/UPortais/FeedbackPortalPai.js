import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import HeaderLggd from '../../../components/HeaderLggd';
import Footer from '../../../components/Footer';
import axios from 'axios';
import FeedbackPortal from './FeedbackPortais';

const FeedbackPortalPai = () => {
  const { id_portal } = useParams(); 
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_portal/${id_portal}`);
      setComments(response.data.comments); 
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    fetchComments(); 
  }, [id_portal]); 

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
