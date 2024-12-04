import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../HeaderLggd/HeaderLggd.module.css";

function HeaderAdm({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOptionsOpen, setIsMobileSearchOptionsOpen] = useState(false);


    const sidebarRef = useRef(null);
    const searchRef = useRef(null);
    const resultRefs = useRef([]);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [firstLetter, setFirstLetter] = useState('');
    const [userColor, setUserColor] = useState('#000000');
    const [progress, setProgress] = useState(0);
    const [rewardToken, setRewardToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    
    

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateRandomToken = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 16;
        let token = '';
        for (let i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    };

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
                        link: `/user/${name}/${item[idField]}/feedback`,
                    }))
                )
            );
            const results = await Promise.all(promises);
            const allItems = results.flat();
            const filteredItems = allItems.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredItems);
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

    const handleGenerateToken = () => {
        const token = generateRandomToken();
        setRewardToken(token);
        localStorage.setItem('rewardToken', token);
        setProgress(0);
        localStorage.setItem(`userProgress_${user.id}`, '0');
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuarios'));
        if (storedUser) {
            setUser(storedUser);
            setFirstLetter(storedUser.nome.charAt(0).toUpperCase());

            let userColor = localStorage.getItem('userColor');
            if (!userColor) {
                userColor = generateRandomColor();
                localStorage.setItem('userColor', userColor);
            }
            setUserColor(userColor);

            const storedProgress = localStorage.getItem(`userProgress_${storedUser.id}`);
            setProgress(storedProgress ? parseInt(storedProgress) : 0);
        }
    }, []);

    const generateRandomColor = () => {
        const colors = [
            '#2196F3', '#4CAF50', '#9C27B0', '#F44336', '#FF9800',
            '#009688', '#3F51B5', '#795548', '#607D8B', '#E91E63'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
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
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [isMenuOpen, activeIndex, searchResults]);

      useEffect(() => {
        const handleClickOutside = (event) => {
            
            if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
                return; 
            }

            
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
                setIsOpen(false);
                setShowOverlay(false);
            }

            
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setSearchResults([]);
            }
        };

        
        if (showOverlay || isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOverlay, isMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarios');
        localStorage.removeItem('userColor');
        window.location.href = '/';
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

  
    const UserPanel = () => (
        <div 
            className={isMobile ? styles.mobilePopup : styles.sidebarContent}
            ref={sidebarRef}
        >
            <button
                className={styles.closeButton}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsSidebarOpen(false);
                    setIsOpen(false);
                    setShowOverlay(false);
                }}
            >
                X
            </button>
            <div className={styles.userHeader}>
                <div className={styles.usuario} style={{ backgroundColor: userColor }}>
                    {firstLetter}
                </div>
                <div className={styles.userName}>{user?.nome}</div>
            </div>
            {user?.role !== 'admin' && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDetails(!showDetails);
                        }}
                        className={styles.menuItem}
                    >
                        Dados do usuário
                    </button>
                    {showDetails && (
                        <div className={styles.userDetails} onClick={(e) => e.stopPropagation()}>
                            <div>CPF: {user?.cpf || 'Não disponível'}</div>
                            <div>Telefone: {user?.telefone || 'Não disponível'}</div>
                            <div>Email: {user?.email || 'Não disponível'}</div>
                        </div>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowProgress(!showProgress);
                        }}
                        className={styles.menuItem}
                    >
                        Pontuação
                    </button>
                    {showProgress && (
                        <div className={styles.progressContainer} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${(progress / 1000) * 100}%` }}
                                />
                            </div>
                            <div className={styles.progressText}>{progress} / 1000 pontos</div>
                            {progress >= 1000 && !rewardToken && (
                                <button
                                    onClick={handleGenerateToken}
                                    className={styles.rewardButton}
                                >
                                    Gerar Token de Recompensa
                                </button>
                            )}
                            {rewardToken && (
                                <div className={styles.tokenContainer}>
                                    <p>Seu Token:</p>
                                    <p>{rewardToken}</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
            <button 
                onClick={handleLogout}
                className={styles.menuItem}
            >
                Logout
            </button>
        </div>
    );

    return (
        <header>
            <nav className={styles.navbar}>
                <Link to="/admin/dashboard/tribunais" className={styles.brandL}>
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

                {/* Desktop Menu */}
                <div className={`${styles.navleft} ${styles.desktopOnly}`}>
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className={styles.dropbtn}>Opções de busca</button>
                        {isDropdownOpen && (
                            <div className={styles.dropdownContent}>
                                <Link to="/admin/dashboard/tribunais">Tribunais</Link>
                                <Link to="/admin/dashboard/foruns">Fóruns</Link>
                                <Link to="/admin/dashboard/juiz">Juiz</Link>
                                <Link to="/admin/dashboard/mediador">Mediação</Link>
                                <Link to="/admin/dashboard/advocacia">Advocacia</Link>
                                <Link to="/admin/dashboard/portais">Portais</Link>
                            </div>
                        )}
                    </div>
                    <button
                        className={styles.userButton}
                        onClick={() => {
                            setIsSidebarOpen(true);
                            setIsOpen(true);
                            setShowOverlay(true);
                        }}
                    >
                        <span className={styles.usuario} style={{ backgroundColor: userColor }}>
                            {firstLetter}
                        </span>
                    </button>
                </div>

                {/* Hamburger Menu Button - Apenas Mobile */}
                <button 
                    className={styles.hamburgerMenu}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`} onClick={toggleMobileMenu}></div>
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileMenuHeader}>
                    <h3>Menu</h3>
                    <button className={styles.closeButton} onClick={toggleMobileMenu}>×</button>
                </div>
                <div className={styles.mobileMenuContent}>
                    <button onClick={toggleMobileSearchOptions} className={styles.mobileMenuButton}>
                        Opções de busca {isMobileSearchOptionsOpen ? '▼' : '▶'}
                    </button>
                    <div className={`${styles.mobileSearchOptions} ${isMobileSearchOptionsOpen ? styles.open : ''}`}>
                        <Link to="/admin/dashboard/tribunais" onClick={handleMobileMenuClick}>Tribunais</Link>
                        <Link to="/admin/dashboard/foruns" onClick={handleMobileMenuClick}>Fóruns</Link>
                        <Link to="/admin/dashboard/juiz" onClick={handleMobileMenuClick}>Juiz</Link>
                        <Link to="/admin/dashboard/mediacoes" onClick={handleMobileMenuClick}>Mediação</Link>
                        <Link to="/admin/dashboard/advocacia" onClick={handleMobileMenuClick}>Advocacia</Link>
                        <Link to="/admin/dashboard/portais" onClick={handleMobileMenuClick}>Portais</Link>
                    </div>
                    <button
                        className={styles.mobileUserButton}
                        onClick={() => {
                            setIsSidebarOpen(true);
                            setIsOpen(true);
                            setShowOverlay(true);
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        <span className={styles.usuario} style={{ backgroundColor: userColor }}>
                            {firstLetter}
                        </span>
                        <span>Perfil</span>
                    </button>
                </div>
            </div>

            {/* Sidebar e Overlay */}
            {(showOverlay || isMobileMenuOpen) && (
                <div 
                    className={`${styles.overlay} ${(showOverlay || isMobileMenuOpen) ? styles.show : ''}`}
                    onClick={() => {
                        setIsSidebarOpen(false);
                        setIsOpen(false);
                        setShowOverlay(false);
                        setIsMobileMenuOpen(false);
                        setIsMenuOpen(false);
                        setSearchResults([]);
                    }}
                />
            )}

            {isMobile ? (
                <div className={`${styles.mobileContainer} ${isSidebarOpen ? styles.show : ''}`}>
                    <UserPanel />
                </div>
            ) : (
                <div className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
                    <UserPanel />
                </div>
            )}
        </header>
    );
}

export default HeaderAdm;