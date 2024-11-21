import styles from "./Card.module.css";

function Card() {
    return(
        <div className={styles.cardscontainer}>
            
            <div className={styles.card}>
                <div className={styles.cardleft}>
                    <div className={styles.profileimg}></div>
                    <div className={styles.cardinfo}>
                    </div>
                </div>
            <button className={styles.visualizarbtn}>Visualizar</button>
        </div>
    </div>
    );
}

export default Card;