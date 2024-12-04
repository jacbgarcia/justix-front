import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MediacoesListPageUser.css';

const API_BASE_URL = 'https://justix-back.vercel.app';

const MediacoesListPageUserL = () => {
  const [mediador, setMediacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    listarMediacoes();
  }, []);

  const listarMediacoes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/mediador`);
      const mediadorWithRatings = await Promise.all(
        res.data.map(async (mediador) => {
          try {
            const ratingRes = await axios.get(`${API_BASE_URL}/mediador_avaliacao/${mediador.id_mediador}`);
            
            const avaliacoesRes = await axios.get(`${API_BASE_URL}/av_mediador/${mediador.id_mediador}`);
            
            return {
              ...mediador,
              media_ponderada: parseFloat(ratingRes.data.media_ponderada) || 0,
              total_avaliacoes: avaliacoesRes.data.length || 0
            };
          } catch (err) {
            console.error(`Erro ao buscar dados para mediador ${mediador.id_mediador}:`, err);
            return {
              ...mediador,
              media_ponderada: 0,
              total_avaliacoes: 0
            };
          }
        })
      );
      setMediacoes(mediadorWithRatings);
    } catch (err) {
      console.error('Erro ao listar mediador:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/mediador/')) {
      return `${API_BASE_URL}${imagem}`;
    }
    return `${API_BASE_URL}/uploads/mediador/${imagem}`;
  };

  const handleVisualizarClick = (id_mediador) => {
    localStorage.setItem('id_mediador', id_mediador);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  const getFilteredMediacoes = () => {
    let filtered = mediador.filter(mediador => 
      mediador.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mediador.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (activeFilter) {
      case 'mais-avaliados':
        filtered = filtered.sort((a, b) => b.total_avaliacoes - a.total_avaliacoes);
        break;
      case 'melhor-classificacao':
        filtered = filtered.sort((a, b) => b.media_ponderada - a.media_ponderada);
        break;
      default:
        filtered = filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
    }

    return filtered;
  };

  return (
    <div className="container">
      {/* Barra de Pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar mediador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Categorias */}
      <div className="categories-container">
        <div className="categories-wrapper">
          <button 
            className={`category-button ${activeFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('todos')}
          >
            Todos
          </button>
          <button 
            className={`category-button ${activeFilter === 'mais-avaliados' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mais-avaliados')}
          >
            Mais Avaliados
          </button>
          <button 
            className={`category-button ${activeFilter === 'melhor-classificacao' ? 'active' : ''}`}
            onClick={() => setActiveFilter('melhor-classificacao')}
          >
            Melhor Classificação
          </button>
        </div>
      </div>

      {/* Lista de Mediacoes */}
      <div className="mediadors-grid">
        {getFilteredMediacoes().map(mediador => (
          <Link
            key={mediador.id_mediador}
            to={`/user/mediador/${mediador.id_mediador}/feedback`}
            onClick={() => handleVisualizarClick(mediador.id_mediador)}
            className="mediador-card"
          >
            <div className="mediador-content">
              {/* Imagem */}
              <div className="mediador-image-container">
                {mediador.imagem ? (
                  <img
                    src={getImagemUrl(mediador.imagem)}
                    alt={mediador.nome}
                    className="mediador-image"
                  />
                ) : (
                  <div className="mediador-no-image">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="mediador-info">
                <h3 className="mediador-name">{mediador.nome}</h3>
                <div className="mediador-rating">
                  <span className="rating-badge">
                    ★ {formatRating(mediador.media_ponderada)}
                  </span>
                  <span className="total-ratings">
                    ({mediador.total_avaliacoes} avaliações)
                  </span>
                </div>
                <p className="mediador-address">
                  Estado: {mediador.estado}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MediacoesListPageUserL;