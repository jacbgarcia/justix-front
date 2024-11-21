import styles from "./Container.module.css";

function ContainerHome({children , props}) {
    return(
        <section>
        <main className={styles.maincontent}>
            {props}
        </main>
            {children}
        </section>        
    );
}

export default ContainerHome;