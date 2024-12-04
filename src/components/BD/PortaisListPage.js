import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const PortaisListPageO = () => {
  const [portais, setPortais] = useState([]);
  const [filteredPortais, setFilteredPortais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    listarPortais();
  }, []);

  const listarPortais = async () => {
    try {
      const res = await axios.get('https://justix-back.vercel.app/portais');
      
      
      const portaisWithRatings = await Promise.all(
        res.data.map(async (portal) => {
          try {
            const ratingRes = await axios.get(`https://justix-back.vercel.app/portal_avaliacao/${portal.id_portal}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...portal,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para fórum ${portal.id_portal}:`, err);
            return {
              ...portal,
              avaliacao_media: 0
            };
          }
        })
      );

      setPortais(portaisWithRatings);
      setFilteredPortais(portaisWithRatings);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirPortais = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este portal?');
    if (!confirmacao) return;

    try {
      await axios.delete(`https://justix-back.vercel.app/portais/${id}`);
      listarPortais(); 
    } catch (err) {
      console.error('Erro ao excluir portais:', err);
    }
  };

  const handleEdit = (portais) => {
    navigate('/admin/dashboard/portais/edit', { state: { portais } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/portais/')) {
      return `https://justix-back.vercel.app/${imagem}`;
    }
    return `https://justix-back.vercel.app/uploads/portais/${imagem}`;
  };

  
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

   
    const filtered = portais.filter(portal =>
      portal.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredPortais(filtered);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };


  return (
    <div>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={style.searchInput}
      />

      {/* Renderização dos portais filtrados */}
      {filteredPortais.map(portal => (
        <div key={portal.id_portal} className={style.card}>
          <div className={style.cardleft}>
            {portal.imagem ? (
              <img
                src={getImagemUrl(portal.imagem)}
                alt={`Imagem de ${portal.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{portal.nome}</h3>
              <p className={style.tag}>{portal.url}</p>
              <p className={style.tag1}>Média: ★ {formatRating(portal.avaliacao_media)}</p>
            </div>
          </div>
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(portal)}
              style={{ marginRight: '5px' }}
            >
              Editar
            </button>
            <button
              className={style.visualizarbtn}
              onClick={() => excluirPortais(portal.id_portal)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortaisListPageO;
