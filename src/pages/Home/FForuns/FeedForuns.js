import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, StarHalf } from 'lucide-react';
import styles from "../../Home/FForuns/Feed.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer/index";
import Cadastro from '../../Cadastro';
import Login from '../../Login';

const API_BASE_URL = 'https://justix-back.vercel.app';

const FeedForuns = () => {
    const { id_forum } = useParams();
    const [comments, setComments] = useState([]);
    const [isCadastroOpen, setIsCadastroOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [averageRatings, setAverageRatings] = useState({
        av_atendimento: 0,
        av_organizacao: 0,
        av_digital: 0,
        av_infraestrutura: 0,
        av_seguranca: 0
    });
    const [weightedAverage, setWeightedAverage] = useState(0);
    const [forumData, setForumData] = useState(null);
    const [ratingStats, setRatingStats] = useState({
        weighted: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        av_atendimento: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        av_organizacao: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        av_digital: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        av_infraestrutura: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        av_seguranca: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });
    const [selectedCategory, setSelectedCategory] = useState('weighted');
    const [filteredRating, setFilteredRating] = useState(null);

    const ratingCategories = {
        weighted: { name: 'Média', weight: 0 },
        av_atendimento: { name: 'Qualidade do atendimento', weight: 5 },
        av_organizacao: { name: 'Organização do Serviço', weight: 4 },
        av_digital: { name: 'Tecnologia', weight: 3 },
        av_infraestrutura: { name: 'Infraestrutura', weight: 2 },
        av_seguranca: { name: 'Segurança', weight: 1 }
    };

    const calculateWeightedRating = (data) => {
        let weightedSum = 0;
        let totalWeight = 0;

        Object.entries(ratingCategories).forEach(([category, { weight }]) => {
            if (category !== 'weighted' && data[category]) {
                weightedSum += data[category] * weight;
                totalWeight += weight;
            }
        });

        return totalWeight > 0 ? weightedSum / totalWeight : 0;
    };

    useEffect(() => {
        if (id_forum) {
            fetchComments();
            fetchForumData();
            fetchWeightedAverage();
        }
    }, [id_forum]);

    const fetchWeightedAverage = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/foruns_avaliacao/${id_forum}`);
            const rating = res.data.media_ponderada ? parseFloat(res.data.media_ponderada) : 0;
            setWeightedAverage(rating);
        } catch (error) {
            console.error('Erro ao buscar média ponderada:', error);
            setWeightedAverage(0);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/av_foruns/${id_forum}`);
            const commentsData = res.data;

            setComments(commentsData);
            calculateRatingStats(commentsData);
            calculateAverageRatings(commentsData);
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    };

    const calculateRatingStats = (commentsData) => {
        const newStats = { ...ratingStats };
        
        // Calcula stats para categorias normais
        Object.keys(ratingCategories).forEach(category => {
            if (category !== 'weighted') {
                const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                commentsData.forEach(comment => {
                    const rating = Math.floor(comment[category]);
                    if (stats[rating] !== undefined) {
                        stats[rating]++;
                    }
                });
                newStats[category] = stats;
            }
        });
    
        // Calcula stats para weighted
        const weightedStats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        commentsData.forEach(comment => {
            const weightedRating = calculateWeightedRating(comment);
            const roundedRating = Math.floor(weightedRating);
            if (weightedStats[roundedRating] !== undefined) {
                weightedStats[roundedRating]++;
            }
        });
        newStats.weighted = weightedStats;
    
        setRatingStats(newStats);
    };

    const calculateAverageRatings = (commentsData) => {
        const sums = {};
        const counts = {};
        
        Object.keys(ratingCategories).forEach(category => {
            if (category !== 'weighted') {
                sums[category] = 0;
                counts[category] = 0;
            }
        });

        commentsData.forEach(comment => {
            Object.keys(ratingCategories).forEach(category => {
                if (category !== 'weighted' && comment[category]) {
                    sums[category] += comment[category];
                    counts[category]++;
                }
            });
        });

        const averages = {};
        Object.keys(ratingCategories).forEach(category => {
            if (category !== 'weighted') {
                averages[category] = counts[category] > 0 ? 
                    sums[category] / counts[category] : 0;
            }
        });

        setAverageRatings(averages);
    };

    const fetchForumData = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/foruns/${id_forum}`);
            setForumData(res.data);
        } catch (error) {
            console.error('Erro ao buscar dados do forum:', error);
        }
    };

    const getImagemUrl = (imagem) => {
        if (!imagem) return null;
        if (imagem.startsWith('/uploads/foruns/')) {
            return `${API_BASE_URL}${imagem}`;
        }
        return `${API_BASE_URL}/uploads/foruns/${imagem}`;
    };

    const RatingBar = ({ rating, count, totalReviews }) => {
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return (
            <div
                className={styles.ratingbar}
                onClick={() => setFilteredRating(rating)}
                style={{ cursor: 'pointer' }}
            >
                <span className={styles.ratingnumber}>{rating}</span>
                <div className={styles.progressbar}>
                    <div
                        className={styles.progressfill}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className={styles.ratingcount}>{count}</span>
            </div>
        );
    };

    const RatingStars = ({ rating }) => {
        const ratingNumber = parseFloat(rating) || 0;
        const fullStars = Math.floor(ratingNumber);
        const hasHalfStar = ratingNumber % 1 >= 0.5;

        return (
            <div className={styles.ratingstars}>
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className={styles.starfilled} />
                ))}
                {hasHalfStar && <StarHalf className={styles.starhalf} />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <Star key={`empty-${i}`} className={styles.starempty} />
                ))}
            </div>
        );
    };

    const getDisplayedRating = () => {
        if (selectedCategory === 'weighted') {
            return calculateWeightedRating(averageRatings).toFixed(1);
        }
        return averageRatings[selectedCategory].toFixed(1);
    };

    const CategorySelector = () => (
        <div className={styles.categorySelector}>
            <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.categorySelect}
            >
                <option value="weighted">
                    Média
                </option>
                {Object.entries(ratingCategories)
                    .filter(([key]) => key !== 'weighted')
                    .map(([key, { name, weight }]) => (
                        <option key={key} value={key}>
                            {name} (Peso {weight})
                        </option>
                    ))}
            </select>
        </div>
    );

    const totalReviews = comments.length;
    const filteredComments = filteredRating
        ? comments.filter(comment => {
            if (selectedCategory === 'weighted') {
                const weightedRating = calculateWeightedRating(comment);
                return Math.floor(weightedRating) === filteredRating;
            }
            return comment[selectedCategory] && 
                Math.floor(comment[selectedCategory]) === filteredRating;
        })
        : comments;

    return (
        <>
            <Header />
            <div className={styles.feedcontainer}>
                <div className={styles.feedheader}>
                    {forumData && (
                        <h1 className={styles.maintitle}>{forumData.nome}</h1>
                    )}
                </div>

                {forumData && (
                    <div className={styles.foruminfo}>
                        <div className={styles.forumimagecontainer}>
                            {forumData.imagem ? (
                                <img
                                    src={getImagemUrl(forumData.imagem)}
                                    alt={forumData.nome}
                                    className={styles.forumimage}
                                />
                            ) : (
                                <div className={styles.noimageplacement}>
                                    Sem imagem disponível
                                </div>
                            )}
                        </div>
                        <div className={styles.forumdetails}>
                            <div className={styles.addressinfo}>
                                <h3 className={styles.addresstitle}>Informações de Localização</h3>
                                <p className={styles.addresstext}>
                                    {forumData.endereco}
                                    <br />
                                    {forumData.cidade} - {forumData.estado}
                                    <br />
                                    CEP: {forumData.cep}
                                </p>
                            </div>
                            <p className={styles.forumdescription}>{forumData.descricao}</p>
                        </div>
                    </div>
                )}

                <div className={styles.ratingscard}>
                    <CategorySelector />
                    <div className={styles.ratingsoverview}>
                        <div className={styles.averageratingcontainer}>
                            <div className={styles.hugerating}>
                                {getDisplayedRating()}
                            </div>
                            <RatingStars rating={
                                selectedCategory === 'weighted' 
                                    ? calculateWeightedRating(averageRatings)
                                    : averageRatings[selectedCategory]
                            } />
                            <div className={styles.totalreviews}>
                                {totalReviews.toLocaleString()} avaliações
                            </div>
                        </div>

                        <div className={styles.ratingdistribution}>
                            {[5, 4, 3, 2, 1].map(rating => (
                                <RatingBar
                                    key={rating}
                                    rating={rating}
                                    count={ratingStats[selectedCategory][rating]}
                                    totalReviews={totalReviews}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.feedbackbuttoncontainer}>
                <Link 
            onClick={() => setIsCadastroOpen(true)}
            className={styles.feedbackbutton}
          >
            Realizar seu Feedback
          </Link>
                </div>

                <div className={styles.commentssection}>
                    <h2 className={styles.commentstitle}>Comentários e Avaliações</h2>

                    {filteredRating && (
                        <div className={styles.clearfilter}>
                            <button onClick={() => setFilteredRating(null)}>
                                Limpar filtro
                            </button>
                        </div>
                    )}

                    <div className={styles.commentslist}>
                        {filteredComments.length > 0 ? (
                            filteredComments.map((comment, index) => (
                                <div key={index} className={styles.commentcard}>
                                    <div className={styles.commentheader}>
                                        <div className={styles.commentuser}>
                                            <div className={styles.useravatar}>
                                                {comment.nome ? comment.nome[0].toUpperCase() : 
                                                    `${comment.id_usuario}`}
                                            </div>
                                            <span className={styles.username}>
                                                {comment.nome || `anonimo${comment.id_usuario}`}
                                            </span>
                                        </div>
                                        <div className={styles.ratinginfo}>
                                            <span className={styles.ratingcategory}>
                                                {ratingCategories[selectedCategory].name}:
                                            </span>
                                            <RatingStars rating={
                                                selectedCategory === 'weighted' 
                                                    ? calculateWeightedRating(comment)
                                                    : comment[selectedCategory]
                                            } />
                                        </div>
                                    </div>
                                    <p className={styles.commenttext}>{comment.comentario}</p>
                                    <div className={styles.commentdate}>
                                        {new Date(comment.data_criacao).toLocaleDateString('pt-BR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.nocomments}>Nenhum comentário disponível.</p>
                        )}
                    </div>
                </div>
            </div>
            <Login 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
            <Cadastro 
        isOpen={isCadastroOpen}
        onClose={() => setIsCadastroOpen(false)}
        onSwitchToLogin={() => {
            setIsCadastroOpen(false);
            setIsLoginOpen(true);
          }}
      />
            <Footer />
        </>
    );
};

export default FeedForuns;