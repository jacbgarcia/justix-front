// src/pages/Audiencias/AudienciasFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AudienciasFormFeed from '../../../components/BDPages/Feedbacks/AudienciasFormFeed';
import HeaderLggd from '../../../components/HeaderLggd';
import style from '../../../components/Card/Card.module.css';
import Footer from '../../../components/Footer';
import axios from 'axios';

const AudienciasFormPage = () => {
  const { id_juiz } = useParams(); // Obtém o id_juiz da URL
  const [comments, setComments] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para buscar comentários
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://justix-back.vercel.app/av_juiz/${id_juiz}`);
      setComments(response.data.comments); // Supondo que a resposta tenha um array de comentários
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    fetchComments(); // Chama a função para buscar comentários ao montar o componente
  }, [id_juiz]); // Dependência para refazer a busca quando o id_juiz mudar

  return (
    <>
      <HeaderLggd>
      {isMobile ? (
          <div className={style.menuIcon} onClick={toggleMenu}>
            ☰ {/* Ícone de menu hamburger */}
          </div>
        ) : (
          <div className="w-full flex justify-start items-center gap-6 pl-4 -ml-8">
            <Link to="/user/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
            <Link to="/user/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
            <Link to="/user/dashboard/audiencias" className={style.navlinksl}>Audiências</Link>
            <Link to="/user/dashboard/mediacoes" className={style.navlinksl}>Mediações</Link>
            <Link to="/user/dashboard/advocacia" className={style.navlinksl}>Advocacia</Link>
            <Link to="/user/dashboard/portais" className={style.navlinksl}>Portais</Link>
          </div>
        )}
        {isMobile && menuOpen && (
          <div className={style.mobileMenu}>
            <Link to="/user/dashboard/tribunais" onClick={toggleMenu} className={style.navlinksl}>Tribunais</Link>
            <Link to="/user/dashboard/foruns" onClick={toggleMenu} className={style.navlinks2}>Fóruns</Link>
            <Link to="/user/dashboard/audiencias" onClick={toggleMenu} className={style.navlinksl}>Audiências</Link>
            <Link to="/user/dashboard/mediacoes" onClick={toggleMenu} className={style.navlinksl}>Mediações</Link>
            <Link to="/user/dashboard/advocacia" onClick={toggleMenu} className={style.navlinksl}>Advocacia</Link>
            <Link to="/user/dashboard/portais" onClick={toggleMenu} className={style.navlinksl}>Portais</Link>
          </div>
        )}
      </HeaderLggd>
      <div>
        <AudienciasFormFeed id_juiz={id_juiz} fetchComments={fetchComments} />
      </div>
      <Footer />
    </>
  );
};

export default AudienciasFormPage;
