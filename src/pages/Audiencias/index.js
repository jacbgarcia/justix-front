import HeaderLggd from "../../components/HeaderLggd";
import ContainerLggd from "../../components/ContainerLggd";
import Footer from "../../components/Footer";
import styles from "./Audiencias.module.css";
import Card from "../../components/Card";

function Audiencias(){
    return(
        <>
        <HeaderLggd>
            <div className={styles.tags}>

            </div>
        </HeaderLggd>
        <ContainerLggd>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </ContainerLggd>
        <Footer/>
        </>
    );
}

export default Audiencias;