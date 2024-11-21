import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const ForunsListPageO = () => {
  const [foruns, setForuns] = useState([]);
  const [filteredForuns, setFilteredForuns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    listarForuns();
  }, []);

  const listarForuns = async () => {
    try {
      const res = await axios.get('https://justix-back.vercel.app/foruns');
      
      // Buscar as avaliações atualizadas para cada fórum
      const forunsWithRatings = await Promise.all(
        res.data.map(async (forum) => {
          try {
            const ratingRes = await axios.get(`https://justix-back.vercel.app/foruns_avaliacao/${forum.id_forum}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...forum,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para fórum ${forum.id_forum}:`, err);
            return {
              ...forum,
              avaliacao_media: 0
            };
          }
        })
      );

      setForuns(forunsWithRatings);
      setFilteredForuns(forunsWithRatings);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirForum = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este fórum?');
    if (!confirmacao) return;

    try {
      await axios.delete(`https://justix-back.vercel.app/foruns/${id}`);
      listarForuns();
    } catch (err) {
      console.error('Erro ao excluir fórum:', err);
    }
  };

  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/foruns/')) {
      return `https://justix-back.vercel.app/${imagem}`;
    }
    return `https://justix-back.vercel.app/uploads/foruns/${imagem}`;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = foruns.filter(forum =>
      forum.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredForuns(filtered);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={style.searchInput}
      />

      {filteredForuns.map(forum => (
        <div key={forum.id_forum} className={style.card}>
          <div className={style.cardleft}>
            {forum.imagem ? (
              <img
                src={getImagemUrl(forum.imagem)}
                alt={`Imagem de ${forum.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{forum.nome}</h3>
              <p className={style.tag}>
                {forum.endereco}, {forum.cidade} - {forum.estado}, {forum.cep}
              </p>
              <p className={style.tag1}>
                Média: ★ {formatRating(forum.avaliacao_media)}
              </p>
            </div>
          </div>
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(forum)}
              style={{ marginRight: '5px' }}
            >
              Editar
            </button>
            <button
              className={style.visualizarbtn}
              onClick={() => excluirForum(forum.id_forum)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForunsListPageO;