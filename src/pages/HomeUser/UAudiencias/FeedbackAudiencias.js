import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./FeedbackAudiencia.css";

const FeedbackAudiencia = ({ id_juiz }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    numero_processo: '',
    comentario: '',
    av_produtividade: 0,
    av_fundamentacao: 0,
    av_pontualidade: 0,
    av_organizacao: 0,
    av_atendimento: 0,
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
    const newProgress = Math.min(currentProgress + 50, 1000); 
    localStorage.setItem(`userProgress_${userId}`, newProgress.toString());
  };

  const categorias = [
    { key: 'av_produtividade', label: 'Produtividade', desc: 'Avalie o tempo que levou a decisão do julgamento considerando a complexidade do mesmo e documentações presentes (Peso: 5)' },
    { key: 'av_fundamentacao', label: 'Fundamentos', desc: 'Avalie a ética e clareza das decisões e conciliações (Peso: 4)' },

    { key: 'av_pontualidade', label: 'Pontualidade', desc: 'Avalie se houveram muitos atrasos e adiamentos por parte do juiz do julgamento considerando sua complexidade (Peso: 3)' },


    { key: 'av_organizacao', label: 'Organização', desc: 'Avalie como foi a organização dos processos  (Peso: 2)' },
    { key: 'av_atendimento', label: 'Pautas socioambientais', desc: 'Avalie a importancia da decisão do juiz em questão para questões relacionadas aos direitos humanos e meio ambiente (Peso: 1)' }
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

    if (!id_juiz) {
      setError('ID do juiz não identificado.');
      setSubmitting(false);
      return;
    }

    if (formData.numero_processo.length < 5 || formData.numero_processo.length > 20) {
      setError('O número de processo deve ter entre 5 e 20 dígitos.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://justix-back.vercel.app/av_juiz', {
        ...formData,
        id_juiz: parseInt(id_juiz, 10),
        id_usuario: parseInt(user.id, 10)
      });

      updateUserProgress(user.id);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          numero_processo: '',
          comentario: '',
          av_produtividade: 0,
          av_fundamentacao: 0,
          av_pontualidade: 0,
          av_organizacao: 0,
          av_atendimento: 0,
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

export default FeedbackAudiencia;