import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const TribunaisListPageO = () => {
  const [tribunais, setTribunais] = useState([]);
  const [filteredTribunais, setFilteredTribunais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    listarTribunais();
  }, []);

  const listarTribunais = async () => {
    try {
      const res = await axios.get('https://justix-back.vercel.app/tribunais');
      
      // Buscar as avaliações atualizadas para cada tribunal
      const tribunaisWithRatings = await Promise.all(
        res.data.map(async (tribunal) => {
          try {
            const ratingRes = await axios.get(`https://justix-back.vercel.app/tribunais_avaliacao/${tribunal.id_tribunal}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...tribunal,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para tribunal ${tribunal.id_tribunal}:`, err);
            return {
              ...tribunal,
              avaliacao_media: 0
            };
          }
        })
      );

      setTribunais(tribunaisWithRatings);
      setFilteredTribunais(tribunaisWithRatings);
    } catch (err) {
      console.error('Erro ao listar tribunais:', err);
    }
  };

  const excluirTribunal = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este tribunal?');
    if (!confirmacao) return;

    try {
      await axios.delete(`https://justix-back.vercel.app/tribunais/${id}`);
      listarTribunais();
    } catch (err) {
      console.error('Erro ao excluir tribunal:', err);
    }
  };

  const handleEdit = (tribunal) => {
    navigate('/admin/dashboard/tribunais/edit', { state: { tribunal } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/tribunais/')) {
      return `https://justix-back.vercel.app/${imagem}`;
    }
    return `https://justix-back.vercel.app/uploads/tribunais/${imagem}`;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = tribunais.filter(tribunal =>
      tribunal.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredTribunais(filtered);
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

      {filteredTribunais.map(tribunal => (
        <div key={tribunal.id_tribunal} className={style.card}>
          <div className={style.cardleft}>
            {tribunal.imagem ? (
              <img
                src={getImagemUrl(tribunal.imagem)}
                alt={`Imagem de ${tribunal.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{tribunal.nome}</h3>
              <p className={style.tag}>
                {tribunal.endereco}, {tribunal.cidade} - {tribunal.estado}, {tribunal.cep}
              </p>
              <p className={style.tag1}>
                Média: ★ {formatRating(tribunal.avaliacao_media)}
              </p>
            </div>
          </div>
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(tribunal)}
              style={{ marginRight: '5px' }}
            >
              Editar
            </button>
            <button
              className={style.visualizarbtn}
              onClick={() => excluirTribunal(tribunal.id_tribunal)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TribunaisListPageO;
