import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./FeedbackPortal.css";

const FeedbackPortal = ({ id_portal }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    comentario: '',
    av_seguranca_sistema: 0,
    av_usabilidade: 0,
    av_integracao: 0,
    av_atualizacao: 0,
    av_acessibilidade: 0
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuarios'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateUserProgress = (userId) => {
    const currentProgress = parseInt(localStorage.getItem(`userProgress_${userId}`)) || 0;
    const newProgress = Math.min(currentProgress + 50, 1000); 
    localStorage.setItem(`userProgress_${userId}`, newProgress.toString());
  };

  const categorias = [
    { key: 'av_seguranca_sistema', label: 'Segurança', desc: 'Avalie a segurança e confiabilidade (Peso: 5)' },
    { key: 'av_usabilidade', label: 'Usabilidade', desc: 'Avalie a facilidade de uso e navegação (Peso: 4)' },

    { key: 'av_integracao', label: 'Integração', desc: 'Avalie a integração com outros sistemas (Peso: 3)' },


    { key: 'av_atualizacao', label: 'Atualização', desc: 'Avalie a frequencia de atualizações (Peso: 2)' },
    { key: 'av_acessibilidade', label: 'Acessibilidade', desc: 'Avalie os recurssos de acessibilidade (Peso: 1)' }
  ];

  const handleRatingChange = (categoria, valor) => {
    setFormData(prev => ({
      ...prev,
      [categoria]: valor
    }));
  };

  const renderStars = (categoria) => {
    const rating = formData[categoria];
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="star-button"
            onClick={() => handleRatingChange(categoria, star)}
          >
            <Star 
              className={`star ${star <= rating ? 'filled' : ''}`}
              fill={star <= rating ? '#4169E1' : 'none'}
              stroke={star <= rating ? '#4169E1' : '#dadce0'}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!user) {
      setError('Usuário não identificado. Por favor, faça login novamente.');
      setSubmitting(false);
      return;
    }

    if (!id_portal) {
      setError('ID do portal não identificado.');
      setSubmitting(false);
      return;
    }

    

    try {
      const response = await axios.post('https://justix-back.vercel.app/av_portal', {
        ...formData,
        id_portal: parseInt(id_portal, 10),
        id_usuario: parseInt(user.id, 10)
      });

      updateUserProgress(user.id);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          comentario: '',
          av_produtividade: 0,
          av_fundamentacao: 0,
          av_pontualidade: 0,
          av_organizacao: 0,
          av_atendimento: 0
        });
        navigate(-1);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao enviar avaliação');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Avalie sua experiência</h2>
      
      <form onSubmit={handleSubmit} className="feedback-form">

        {categorias.map(({ key, label, desc }) => (
          <div key={key} className="rating-group">
            <div className="rating-header">
              <h3>{label}</h3>
              <p className="rating-description">{desc}</p>
            </div>
            {renderStars(key)}
          </div>
        ))}

        <div className="input-group">
          <label htmlFor="comentario">Comentário (opcional)</label>
          <textarea
            id="comentario"
            value={formData.comentario}
            onChange={(e) => setFormData(prev => ({ ...prev, comentario: e.target.value }))}
            placeholder="Compartilhe sua experiência..."
            rows={4}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Avaliação enviada com sucesso!</div>}

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? 'Enviando...' : 'Enviar Avaliação'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPortal;