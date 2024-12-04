import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AudienciasListPageUser.css';

const API_BASE_URL = 'https://justix-back.vercel.app';

const AudienciasListPageUserL = () => {
  const [juiz, setAudiencias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    listarAudiencias();
  }, []);

  const listarAudiencias = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/juiz`);
      const juizWithRatings = await Promise.all(
        res.data.map(async (juiz) => {
          try {
       
            const ratingRes = await axios.get(`${API_BASE_URL}/juiz_avaliacao/${juiz.id_juiz}`);
            
       
            const avaliacoesRes = await axios.get(`${API_BASE_URL}/av_juiz/${juiz.id_juiz}`);
            
            return {
              ...juiz,
              media_ponderada: parseFloat(ratingRes.data.media_ponderada) || 0,
              total_avaliacoes: avaliacoesRes.data.length || 0
            };
          } catch (err) {
            console.error(`Erro ao buscar dados para juiz ${juiz.id_juiz}:`, err);
            return {
              ...juiz,
              media_ponderada: 0,
              total_avaliacoes: 0
            };
          }
        })
      );
      setAudiencias(juizWithRatings);
    } catch (err) {
      console.error('Erro ao listar juiz:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/juiz/')) {
      return `${API_BASE_URL}${imagem}`;
    }
    return `${API_BASE_URL}/uploads/juiz/${imagem}`;
  };

  const handleVisualizarClick = (id_juiz) => {
    localStorage.setItem('id_juiz', id_juiz);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  const getFilteredAudiencias = () => {
    let filtered = juiz.filter(juiz => 
      juiz.nome.toLowerCase().includes(searchTerm.toLowerCase()) 
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
          placeholder="Pesquisar juiz..."
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

      {/* Lista de Audiencias */}
      <div className="juizs-grid">
        {getFilteredAudiencias().map(juiz => (
          <Link
            key={juiz.id_juiz}
            to={`/user/juiz/${juiz.id_juiz}/feedback`}
            onClick={() => handleVisualizarClick(juiz.id_juiz)}
            className="juiz-card"
          >
            <div className="juiz-content">
              {/* Imagem */}
              <div className="juiz-image-container">
                {juiz.imagem ? (
                  <img
                    src={getImagemUrl(juiz.imagem)}
                    alt={juiz.nome}
                    className="juiz-image"
                  />
                ) : (
                  <div className="juiz-no-image">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="juiz-info">
                <h3 className="juiz-name">{juiz.nome}</h3>
                <div className="juiz-rating">
                  <span className="rating-badge">
                    ★ {formatRating(juiz.media_ponderada)}
                  </span>
                  <span className="total-ratings">
                    ({juiz.total_avaliacoes} avaliações)
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AudienciasListPageUserL;