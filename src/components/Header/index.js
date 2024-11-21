import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cadastro from '../../pages/Cadastro';
import Login from '../../pages/Login';
import styles from './Header.module.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOptionsOpen, setIsMobileSearchOptionsOpen] = useState(false);
  const searchRef = useRef(null);
  const resultRefs = useRef([]);
  const navigate = useNavigate();

  const fetchSearchResults = async (query) => {
    try {
      const endpoints = [
        { name: 'tribunais', idField: 'id_tribunal' },
        { name: 'foruns', idField: 'id_forum' },
        { name: 'juiz', idField: 'id_juiz' },
        { name: 'mediador', idField: 'id_mediador' },
        { name: 'advocacia', idField: 'id_advocacia' },
        { name: 'portais', idField: 'id_portal' }
      ];

      const promises = endpoints.map(({ name, idField }) =>
        axios.get(`https://justix-back.vercel.app/${name}`).then((res) =>
          res.data.map((item) => ({
            name: item.nome,
            link: `/${name}/${item[idField]}/feedback`,
          }))
        )
      );
      const results = await Promise.all(promises);
      const allItems = results.flat();
      const filteredItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredItems);
      setActiveIndex(-1);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) fetchSearchResults(searchQuery);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsMenuOpen(!!query);
    if (query) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (link) => {
    setIsMenuOpen(false);
    setSearchQuery('');
    navigate(link);
  };

  const handleKeyDown = (e) => {
    if (isMenuOpen) {
      if (e.key === 'ArrowDown') {
        setActiveIndex((prevIndex) => {
          const newIndex = prevIndex === searchResults.length - 1 ? 0 : prevIndex + 1;
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prevIndex) => {
          const newIndex = prevIndex <= 0 ? searchResults.length - 1 : prevIndex - 1;
          return newIndex;
        });
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        handleResultClick(searchResults[activeIndex].link);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsMobileSearchOptionsOpen(false);
    }
  };

  const toggleMobileSearchOptions = () => {
    setIsMobileSearchOptionsOpen(!isMobileSearchOptionsOpen);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOptionsOpen(false);
  };

  useEffect(() => {
    if (activeIndex >= 0 && resultRefs.current[activeIndex]) {
      resultRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, activeIndex, searchResults]);

  return (
    <header>
      <div className={styles.navbar}>
        <Link to="/" className={styles.brandL}>
          <span className={styles.brand}>JUSTIX</span>
        </Link>
        
        <div className={styles.searchContainer} ref={searchRef}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={handleInputChange}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Buscar
              </button>
            </div>
          </form>
          
          {isMenuOpen && searchResults.length > 0 && (
            <div className={styles.megaMenu}>
              <ul>
                {searchResults.map((result, index) => (
                  <li 
                    key={index} 
                    ref={(el) => (resultRefs.current[index] = el)}
                    className={`${styles.menuItem} ${activeIndex === index ? styles.activeItem : ''}`}
                  >
                    <Link 
                      to={result.link}
                      onClick={() => handleResultClick(result.link)}
                    >
                      {result.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Menu Desktop */}
        <div className={styles.navleft}>
          <div 
            className={styles.dropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={styles.navlinks}>Opções de busca</button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link to="/tribunais">Tribunais</Link>
                <Link to="/foruns">Fóruns</Link>
                <Link to="/juiz">Audiencias</Link>
                <Link to="/mediacoes">Mediações</Link>
                <Link to="/advocacia">Advocacia</Link>
                <Link to="/portais">Portais</Link>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className={styles.navlinksl}
          >
            Login
          </button>
          <button 
            onClick={() => setIsCadastroOpen(true)}
            className={styles.cadastrese}
          >
            Cadastre-se
          </button>
        </div>

        {/* Botão Hamburguer */}
        <button 
          className={styles.hamburgerMenu}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Mobile */}
        <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`} onClick={toggleMobileMenu}></div>
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuHeader}>
            <h3>Menu</h3>
            <button className={styles.closeButton} onClick={toggleMobileMenu}>×</button>
          </div>
          <div className={styles.mobileMenuContent}>
            <button onClick={toggleMobileSearchOptions}>
              Opções de busca {isMobileSearchOptionsOpen ? '▼' : '▶'}
            </button>
            <div className={`${styles.mobileSearchOptions} ${isMobileSearchOptionsOpen ? styles.open : ''}`}>
              <Link to="/tribunais" onClick={handleMobileMenuClick}>Tribunais</Link>
              <Link to="/foruns" onClick={handleMobileMenuClick}>Fóruns</Link>
              <Link to="/juiz" onClick={handleMobileMenuClick}>Audiências</Link>
              <Link to="/mediacoes" onClick={handleMobileMenuClick}>Mediações</Link>
              <Link to="/advocacia" onClick={handleMobileMenuClick}>Advocacia</Link>
              <Link to="/portais" onClick={handleMobileMenuClick}>Portais</Link>
            </div>
            <button onClick={() => {
              setIsLoginOpen(true);
              handleMobileMenuClick();
            }}>Login</button>
            <button onClick={() => {
              setIsCadastroOpen(true);
              handleMobileMenuClick();
            }}>Cadastre-se</button>
          </div>
        </div>
      </div>

      <Login 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <Cadastro 
  isOpen={isCadastroOpen}
  onClose={() => setIsCadastroOpen(false)}
  onSwitchToLogin={() => {
    setIsCadastroOpen(false);
    setIsLoginOpen(true);
  }}
/>
    </header>
  );
};

export default Header;