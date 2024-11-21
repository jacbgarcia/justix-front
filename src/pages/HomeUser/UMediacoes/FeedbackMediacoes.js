import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./FeedbackMediacoes.css";

const FeedbackMediacoes = ({ id_mediador }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    numero_processo: '',
    comentario: '',
    av_satisfacao: 0,
    av_imparcialidade: 0,
    av_conhecimento: 0,
    av_pontualidade: 0,
    av_organizacao: 0,
    horario_chegada: '',
    horario_saida: ''
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
    const newProgress = Math.min(currentProgress + 50, 1000); // Add 50 points per submission, max 1000
    localStorage.setItem(`userProgress_${userId}`, newProgress.toString());
  };

  const categorias = [
    { key: 'av_satisfacao', label: 'Conciliação', desc: 'Avalie a satisfação alcançada na conciliação, leve em conta a complexidade do acordo (Peso: 5)' },
    { key: 'av_imparcialidade', label: 'Imparcialidade', desc: 'Avalie o nível de imparcialidade do mediador (Peso: 4)' },

    { key: 'av_conhecimento', label: 'Conhecimento e comunicação', desc: 'Avalie o conhecimento juridico do mediador e como ele o comunica  (Peso: 3)' },


    { key: 'av_pontualidade', label: 'Pontualidade', desc: 'Avalie a pontualidade do mediador e da sessão (Peso: 2)' },

    { key: 'av_organizacao', label: 'Organização', desc: 'Avalie como a sessão foi organizada (Peso: 1)' },

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

    if (!id_mediador) {
      setError('ID do mediador não identificado.');
      setSubmitting(false);
      return;
    }

    if (formData.numero_processo.length < 5 || formData.numero_processo.length > 20) {
      setError('O número de processo deve ter entre 5 e 20 dígitos.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://justix-back.vercel.app/av_mediador', {
        ...formData,
        id_mediador: parseInt(id_mediador, 10),
        id_usuario: parseInt(user.id, 10)
      });

      // Update progress after successful submission
      updateUserProgress(user.id);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          numero_processo: '',
          comentario: '',
          av_satisfacao: 0,
          av_imparcialidade: 0,
          av_conhecimento: 0,
          av_pontualidade: 0,
          av_organizacao: 0,
          horario_chegada: '',
          horario_saida: ''
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
        <div className="input-group">
          <label htmlFor="numero_processo">Número do Processo</label>
          <input
            type="text"
            id="numero_processo"
            value={formData.numero_processo}
            onChange={(e) => setFormData(prev => ({ ...prev, numero_processo: e.target.value }))}
            required
            minLength={5}
            maxLength={20}
            placeholder="Digite o número do processo"
          />
        </div>

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
          <label htmlFor="horario_chegada">Horário de Chegada</label>
          <input
            type="time"
            id="horario_chegada"
            value={formData.horario_chegada}
            onChange={(e) => setFormData(prev => ({ ...prev, horario_chegada: e.target.value }))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="horario_saida">Horário de Saída</label>
          <input
            type="time"
            id="horario_saida"
            value={formData.horario_saida}
            onChange={(e) => setFormData(prev => ({ ...prev, horario_saida: e.target.value }))}
          />
        </div>

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

export default FeedbackMediacoes;