import React from 'react';
import styles from "./ContainerLggd.module.css";
// import { useLocation } from 'react-router-dom';







const ContainerLggd = ({ children }) => {
    // const [searchTerm, setSearchTerm] = useState('');
    // const location = useLocation();



    
    // const navigation = [
    //     { name: 'Tribunais', path: '/user/dashboard/tribunais' },
    //     { name: 'Fóruns', path: '/user/dashboard/foruns' },
    //     { name: 'Audiências', path: '/user/dashboard/audiencias' },
    //     { name: 'Mediações', path: '/user/dashboard/mediacoes' },
    //     { name: 'Advocacia', path: '/user/dashboard/advocacia' },
    //     { name: 'Portais', path: '/user/dashboard/portais' }
    // ];

    // const title = navigation.find(
    //     item => item.path.toLowerCase() === location.pathname.toLowerCase()
    // )?.name || 'Página Inicial';

    // const handleSearch = (e) => {
    //     const value = e.target.value;
    //     setSearchTerm(value);
    //     if (onSearch) {
    //         onSearch(value);
    //     }
    // };

    // const handleSearch = async (searchTerm, activeFilters) => {
    //     try {
    //         const response = await fetch(`/api/search?term=${searchTerm}&filters=${JSON.stringify(activeFilters)}`);
    //         const data = await response.json();
    //         // Atualize o estado com os resultados da pesquisa
    //     } catch (error) {
    //         console.error('Erro ao buscar dados:', error);
    //     }
    // };

    return (
        <section>
            <div className={styles.container}>
                
            </div>
            <main className="p-6">
                {children}
            </main>
        </section>
    );
};

export default ContainerLggd;