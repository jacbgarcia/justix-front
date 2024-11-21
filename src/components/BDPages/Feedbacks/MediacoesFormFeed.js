import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../../pages/Login/Login.module.css';

const MediacoesForm = ({ id_mediador, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(1);
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setError('');

        if (!user) {
            setError('Usuário não identificado. Por favor, faça login novamente.');
            return;
        }

        if (!id_mediador) {
            setError('ID do mediador não identificado.');
            return;
        }

        const formData = {
            id_usuario: parseInt(user.id, 10),
            id_mediador: parseInt(id_mediador, 10),
            comentario: newComment,
            avaliacao: rating,  // Avaliação em estrelas
            horario_chegada: arrivalTime || null,
            horario_saida: departureTime || null,
        };

        try {
            const response = await axios.post('https://justix-back.vercel.app/av_mediador', formData);
            
            // Atualiza progresso após envio bem-sucedido
            updateUserProgress(user.id);
            
            setNewComment('');
            setRating(1);
            setArrivalTime('');
            setDepartureTime('');
            setError('');

            if (onCommentAdded) onCommentAdded();
            navigate(-1); // Redireciona para a página anterior
        } catch (error) {
            console.error('Erro completo:', error);
            const errorMessage = error.response?.data?.error || 'Erro ao adicionar comentário';
            setError(errorMessage);
        }
    };

    const handleStarClick = (star) => {
        setRating(star);
    };

    return (
        <section className={styles.loginSection}>
        <div className={styles.loginContainer}>
            <h4 className={styles.title}>Deixe seu Feedback</h4>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmitComment} className={styles.loginForm}>
                <div className={styles.formGroupD}>
                    <label>Horário de Chegada (Opcional):</label>
                    <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className={styles.formcontrol}
                    />
                </div>
                <div className={styles.formGroupD}>
                    <label>Horário de Saída (Opcional):</label>
                    <input
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className={styles.formcontrol}
                    />
                </div>
                <div className={styles.formGroupC}>
                    <label>Comentário:</label>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className={styles.formcontrol}
                    />
                </div>
                <div className={styles.formgroup}>
                    <label>Deixe sua avaliação:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                            className={styles.star}
                                key={star}
                                onClick={() => handleStarClick(star)}
                                style={{
                                    cursor: 'pointer',
                                    color: star <= rating ? 'black' : 'white',
                                    fontSize: '3em'
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                <button type="submit" className={styles.submitButton}>
                    Enviar Comentário
                </button>
                <button type="button" onClick={() => navigate(-1)} className={styles.submitButton}>
                    Cancelar
                </button>
                </div>
            </form>
        </div>
        </section>
    );
};

export default MediacoesForm;
