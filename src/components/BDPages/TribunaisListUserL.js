import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TribunaisListPageUser.css';

const API_BASE_URL = 'https://justix-back.vercel.app';

const TribunaisListPageUserL = () => {
  const [tribunais, setTribunais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    listarTribunais();
  }, []);

  const listarTribunais = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/tribunais`);
      const tribunaisWithRatings = await Promise.all(
        res.data.map(async (tribunal) => {
          try {
            const ratingRes = await axios.get(`${API_BASE_URL}/tribunais_avaliacao/${tribunal.id_tribunal}`);
            
            const avaliacoesRes = await axios.get(`${API_BASE_URL}/av_tribunais/${tribunal.id_tribunal}`);
            
            return {
              ...tribunal,
              media_ponderada: parseFloat(ratingRes.data.media_ponderada) || 0,
              total_avaliacoes: avaliacoesRes.data.length || 0
            };
          } catch (err) {
            console.error(`Erro ao buscar dados para tribunal ${tribunal.id_tribunal}:`, err);
            return {
              ...tribunal,
              media_ponderada: 0,
              total_avaliacoes: 0
            };
          }
        })
      );
      setTribunais(tribunaisWithRatings);
    } catch (err) {
      console.error('Erro ao listar tribunais:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/tribunais/')) {
      return `${API_BASE_URL}${imagem}`;
    }
    return `${API_BASE_URL}/uploads/tribunais/${imagem}`;
  };

  const handleVisualizarClick = (id_tribunal) => {
    localStorage.setItem('id_tribunal', id_tribunal);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  const getFilteredTribunais = () => {
    let filtered = tribunais.filter(tribunal => 
      tribunal.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tribunal.endereco.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Pesquisar tribunais..."
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

      {/* Lista de Tribunais */}
      <div className="tribunals-grid">
        {getFilteredTribunais().map(tribunal => (
          <Link
            key={tribunal.id_tribunal}
            to={`/user/tribunais/${tribunal.id_tribunal}/feedback`}
            onClick={() => handleVisualizarClick(tribunal.id_tribunal)}
            className="tribunal-card"
          >
            <div className="tribunal-content">
              {/* Imagem */}
              <div className="tribunal-image-container">
                {tribunal.imagem ? (
                  <img
                    src={getImagemUrl(tribunal.imagem)}
                    alt={tribunal.nome}
                    className="tribunal-image"
                  />
                ) : (
                  <div className="tribunal-no-image">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="tribunal-info">
                <h3 className="tribunal-name">{tribunal.nome}</h3>
                <p className="tribunal-city">{tribunal.cidade}</p>
                <div className="tribunal-rating">
                  <span className="rating-badge">
                    ★ {formatRating(tribunal.media_ponderada)}
                  </span>
                  <span className="total-ratings">
                    ({tribunal.total_avaliacoes} avaliações)
                  </span>
                </div>
                <p className="tribunal-address">
                  {tribunal.endereco}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TribunaisListPageUserL;