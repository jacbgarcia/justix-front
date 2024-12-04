import React from 'react';
import styles from "./ContainerLggd.module.css";



const ContainerLggd = ({ children }) => {
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