import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ContainerHome from '../../ContainerHome/index';
import styles from '../../../pages/Login/Login.module.css'

const PortaisListFeed = () => {
    const { id_portal } = useParams();
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (id_portal) {
            fetchComments();
            fetchAverageRating();
        }
    }, [id_portal]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`https://justix-back.vercel.app/av_portal/${id_portal}`);
            setComments(res.data);
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const res = await axios.get(`https://justix-back.vercel.app/portal_avaliacao/${id_portal}`);
            setAverageRating(res.data.media_avaliacao || 0);
        } catch (error) {
            console.error('Erro ao calcular média de avaliações:', error);
        }
    };

    return (
        <ContainerHome>
            <div>
                {id_portal && (
                    <Link to={`/user/dashboard/portais/${id_portal}/feedback/add`} className={styles.feedbtn}>
                        Realizar seu Feedback?
                    </Link>
                )}
                <div className={styles.feedtxt}>
                <h3>Média: ★ {averageRating}</h3>
                <h4>Comentários</h4>
                </div>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <section className={styles.CSection}>
                        <div key={index} className={styles.commentContainer}>
                            <p>
                                <strong>{comment.nome}</strong> Anonimous{comment.id_usuario} - 
                                 ★ {comment.avaliacao}
                            </p>
                            <div className={styles.commentarea}>
                            <p>{comment.comentario}</p>
                            </div>
                            <p>Data: {new Date(comment.data_criacao).toLocaleDateString()}</p>
                        </div>
                        </section>
                    ))
                ) : (
                    <p>Ainda sem comentários.</p>
                )}
            </div>
        </ContainerHome>
    );
};

export default PortaisListFeed;
