import React, { useState } from 'react';
import styles from './SearchSection.module.css';

const SearchSection = ({ onSearch, activeFilters }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            // Chama onSearch com o termo de pesquisa e os filtros ativos
            onSearch(value, activeFilters);
        }
    };

    return (
        <div className={styles.searchSection}>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className={styles.titulo}></div>
            <div className={styles.space}></div>
        </div>
    );
}

export default SearchSection;