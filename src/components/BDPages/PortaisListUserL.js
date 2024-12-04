import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PortaisListPageUser.css';

const API_BASE_URL = 'https://justix-back.vercel.app';

const PortaisListPageUserL = () => {
  const [portais, setPortais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    listarPortais();
  }, []);

  const listarPortais = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/portais`);
      const portaisWithRatings = await Promise.all(
        res.data.map(async (portal) => {
          try {
            const ratingRes = await axios.get(`${API_BASE_URL}/portal_avaliacao/${portal.id_portal}`);
            
            const avaliacoesRes = await axios.get(`${API_BASE_URL}/av_portal/${portal.id_portal}`);
            
            return {
              ...portal,
              media_ponderada: parseFloat(ratingRes.data.media_ponderada) || 0,
              total_avaliacoes: avaliacoesRes.data.length || 0
            };
          } catch (err) {
            console.error(`Erro ao buscar dados para portal ${portal.id_portal}:`, err);
            return {
              ...portal,
              media_ponderada: 0,
              total_avaliacoes: 0
            };
          }
        })
      );
      setPortais(portaisWithRatings);
    } catch (err) {
      console.error('Erro ao listar portais:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/portais/')) {
      return `${API_BASE_URL}${imagem}`;
    }
    return `${API_BASE_URL}/uploads/portais/${imagem}`;
  };

  const handleVisualizarClick = (id_portal) => {
    localStorage.setItem('id_portal', id_portal);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  const getFilteredPortais = () => {
    let filtered = portais.filter(portal => 
      portal.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      portal.url.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Pesquisar portais..."
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

      {/* Lista de Portais */}
      <div className="portals-grid">
        {getFilteredPortais().map(portal => (
          <Link
            key={portal.id_portal}
            to={`/user/portais/${portal.id_portal}/feedback`}
            onClick={() => handleVisualizarClick(portal.id_portal)}
            className="portal-card"
          >
            <div className="portal-content">
              {/* Imagem */}
              <div className="portal-image-container">
                {portal.imagem ? (
                  <img
                    src={getImagemUrl(portal.imagem)}
                    alt={portal.nome}
                    className="portal-image"
                  />
                ) : (
                  <div className="portal-no-image">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="portal-info">
                <h3 className="portal-name">{portal.nome}</h3>
                <div className="portal-rating">
                  <span className="rating-badge">
                    ★ {formatRating(portal.media_ponderada)}
                  </span>
                  <span className="total-ratings">
                    ({portal.total_avaliacoes} avaliações)
                  </span>
                </div>
                <p className="portal-address">
                  {portal.url}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PortaisListPageUserL;