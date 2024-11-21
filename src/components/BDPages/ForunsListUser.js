import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ForunsListPageUser.css';

const API_BASE_URL = 'https://justix-back.vercel.app';

const ForunsListPageUser = () => {
  const [foruns, setForuns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    listarForuns();
  }, []);

  const listarForuns = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/foruns`);
      const forunsWithRatings = await Promise.all(
        res.data.map(async (forum) => {
          try {
            // Buscar a média ponderada
            const ratingRes = await axios.get(`${API_BASE_URL}/foruns_avaliacao/${forum.id_forum}`);
            
            // Buscar total de avaliações
            const avaliacoesRes = await axios.get(`${API_BASE_URL}/av_foruns/${forum.id_forum}`);
            
            return {
              ...forum,
              media_ponderada: parseFloat(ratingRes.data.media_ponderada) || 0,
              total_avaliacoes: avaliacoesRes.data.length || 0
            };
          } catch (err) {
            console.error(`Erro ao buscar dados para forum ${forum.id_forum}:`, err);
            return {
              ...forum,
              media_ponderada: 0,
              total_avaliacoes: 0
            };
          }
        })
      );
      setForuns(forunsWithRatings);
    } catch (err) {
      console.error('Erro ao listar foruns:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/foruns/')) {
      return `${API_BASE_URL}${imagem}`;
    }
    return `${API_BASE_URL}/uploads/foruns/${imagem}`;
  };

  const handleVisualizarClick = (id_forum) => {
    localStorage.setItem('id_forum', id_forum);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  // Função para filtrar foruns baseado no termo de busca e filtro ativo
  const getFilteredForuns = () => {
    // Primeiro aplica o filtro de busca
    let filtered = foruns.filter(forum => 
      forum.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      forum.endereco.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Depois aplica o filtro de categoria
    switch (activeFilter) {
      case 'mais-avaliados':
        filtered = filtered.sort((a, b) => b.total_avaliacoes - a.total_avaliacoes);
        break;
      case 'melhor-classificacao':
        filtered = filtered.sort((a, b) => b.media_ponderada - a.media_ponderada);
        break;
      default: // 'todos'
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
          placeholder="Pesquisar foruns..."
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

      {/* Lista de Foruns */}
      <div className="forums-grid">
        {getFilteredForuns().map(forum => (
          <Link
            key={forum.id_forum}
            to={`/foruns/${forum.id_forum}/feedback`}
            onClick={() => handleVisualizarClick(forum.id_forum)}
            className="forum-card"
          >
            <div className="forum-content">
              {/* Imagem */}
              <div className="forum-image-container">
                {forum.imagem ? (
                  <img
                    src={getImagemUrl(forum.imagem)}
                    alt={forum.nome}
                    className="forum-image"
                  />
                ) : (
                  <div className="forum-no-image">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="forum-info">
                <h3 className="forum-name">{forum.nome}</h3>
                <p className="forum-city">{forum.cidade}</p>
                <div className="forum-rating">
                  <span className="rating-badge">
                    ★ {formatRating(forum.media_ponderada)}
                  </span>
                  <span className="total-ratings">
                    ({forum.total_avaliacoes} avaliações)
                  </span>
                </div>
                <p className="forum-address">
                  {forum.endereco}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForunsListPageUser;