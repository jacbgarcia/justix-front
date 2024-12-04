import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const AudienciasListPageO = () => {
  const [juizes, setJuizes] = useState([]);
  const [filteredJuizes, setFilteredJuizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    listarJuizes();
  }, []);

  const listarJuizes = async () => {
    try {
      const res = await axios.get('https://justix-back.vercel.app/juiz');
      
      
      const juizWithRatings = await Promise.all(
        res.data.map(async (juiz) => {
          try {
            const ratingRes = await axios.get(`https://justix-back.vercel.app/juiz_avaliacao/${juiz.id_juiz}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...juiz,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para fórum ${juiz.id_juiz}:`, err);
            return {
              ...juiz,
              avaliacao_media: 0
            };
          }
        })
      );

      setJuizes(juizWithRatings);
      setFilteredJuizes(juizWithRatings);
    } catch (err) {
      console.error('Erro ao listar juiz:', err);
    }
  };

  const excluirJuiz = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este juiz?');
    if (!confirmacao) return;

    try {
      await axios.delete(`https://justix-back.vercel.app/juiz/${id}`);
      listarJuizes(); 
    } catch (err) {
      console.error('Erro ao excluir juiz:', err);
    }
  };

  const handleEdit = (juiz) => {
    navigate('/admin/dashboard/juiz/edit', { state: { juiz } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    
    if (imagem.startsWith('/uploads/juiz/')) {
      return `https://justix-back.vercel.app/${imagem}`; 
    }
    return `https://justix-back.vercel.app/uploads/juiz/${imagem}`; 
  };

 
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    
    const filtered = juizes.filter(juiz => 
      juiz.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredJuizes(filtered);
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

      {/* Renderização dos juízes filtrados */}
      {filteredJuizes.map(juiz => (
        <div key={juiz.id_juiz} className={style.card}>
          <div className={style.cardleft}>
            {juiz.imagem ? (
              <img
                src={getImagemUrl(juiz.imagem)}
                alt={`Imagem de ${juiz.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{juiz.nome}</h3>
              <p className={style.tag}>
                {juiz.tempo_servico} anos de serviço - {juiz.casos_julgados} casos julgados
              </p>
              <p className={style.tag1}>Média: ★ {formatRating(juiz.avaliacao_media)}</p>
            </div>
          </div>
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(juiz)}
              style={{ marginRight: '5px' }}
            >
              Editar
            </button>
            <button 
              className={style.visualizarbtn}
              onClick={() => excluirJuiz(juiz.id_juiz)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudienciasListPageO;
