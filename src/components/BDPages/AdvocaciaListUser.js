import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdvocaciaListPageUser.css';

const API_BASE_URL = 'https://justix-back.vercel.app';

const AdvocaciaListPageUser = () => {
  const [advocacia, setAdvocacia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    listarAdvocacia();
  }, []);

  const listarAdvocacia = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/advocacia`);
      const advocaciaWithRatings = await Promise.all(
        res.data.map(async (advocacia) => {
          try {
            const ratingRes = await axios.get(`${API_BASE_URL}/advocacia_avaliacao/${advocacia.id_advocacia}`);

            const avaliacoesRes = await axios.get(`${API_BASE_URL}/av_advocacia/${advocacia.id_advocacia}`);
            
            return {
              ...advocacia,
              media_ponderada: parseFloat(ratingRes.data.media_ponderada) || 0,
              total_avaliacoes: avaliacoesRes.data.length || 0
            };
          } catch (err) {
            console.error(`Erro ao buscar dados para advocacia ${advocacia.id_advocacia}:`, err);
            return {
              ...advocacia,
              media_ponderada: 0,
              total_avaliacoes: 0
            };
          }
        })
      );
      setAdvocacia(advocaciaWithRatings);
    } catch (err) {
      console.error('Erro ao listar advocacia:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/advocacia/')) {
      return `${API_BASE_URL}${imagem}`;
    }
    return `${API_BASE_URL}/uploads/advocacia/${imagem}`;
  };

  const handleVisualizarClick = (id_advocacia) => {
    localStorage.setItem('id_advocacia', id_advocacia);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  const getFilteredAdvocacia = () => {
    let filtered = advocacia.filter(advocacia => 
      advocacia.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      advocacia.profissao.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Pesquisar advocacia..."
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

      {/* Lista de Advocacia */}
      <div className="advocacias-grid">
        {getFilteredAdvocacia().map(advocacia => (
          <Link
            key={advocacia.id_advocacia}
            to={`/advocacia/${advocacia.id_advocacia}/feedback`}
            onClick={() => handleVisualizarClick(advocacia.id_advocacia)}
            className="advocacia-card"
          >
            <div className="advocacia-content">
              {/* Imagem */}
              <div className="advocacia-image-container">
                {advocacia.imagem ? (
                  <img
                    src={getImagemUrl(advocacia.imagem)}
                    alt={advocacia.nome}
                    className="advocacia-image"
                  />
                ) : (
                  <div className="advocacia-no-image">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="advocacia-info">
                <h3 className="advocacia-name">{advocacia.nome}</h3>
                <div className="advocacia-rating">
                  <span className="rating-badge">
                    ★ {formatRating(advocacia.media_ponderada)}
                  </span>
                  <span className="total-ratings">
                    ({advocacia.total_avaliacoes} avaliações)
                  </span>
                </div>
                <p className="advocacia-address">
                  {advocacia.profissao}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdvocaciaListPageUser;