import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import styles from "./Sobre.module.css"
import ContainerHome from "../../components/ContainerHome";


function Sobre(){
    return(
        <>
        <Header>
        <div className={styles.navleft}>
        <Link to="/cadastro" className={styles.cadastrese}>Cadastre-se</Link>
        <Link to="/login" className={styles.navlinksl}>Login</Link>
        </div>
        </Header>
        <ContainerHome>
        <Link to="/" className={styles.backButton}>
                        <span className={styles.backArrow}>←</span>
                        Voltar
            </Link>
            <div className={styles.banner}></div>            
            <section>
                <p className={styles.description}>
                Somos o grupo JEJE’s Bizarre Programing, somos alunos da faculdade uninassal criamos este site com o intuito de sanar os problemas mencionados na TAP do nosso grupo, o grupo 5. 
                </p>
                <p className={styles.description}>
                Nosso grupo é composto por:
                </p>
                <p className={styles.names}>
                Idalicio Jacob Borba Garcia - 01594821<p></p>

​                Jamille de Lima Barros - 01573947<p></p>  

​                Evandro José Rodrigues Torres Zacarias - 01591481<p></p>  

​                Eulália de Andrade Joffily - 01447187
                </p>               
            </section>
        </ContainerHome>
        <Footer/>
        </>
    );
}

export default Sobre;