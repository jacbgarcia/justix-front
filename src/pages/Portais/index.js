import HeaderLggd from "../../components/HeaderLggd";
import ContainerLggd from "../../components/ContainerLggd";
import Footer from "../../components/Footer";
import styles from "./Portais.modules.css";
import Card from "../../components/Card";

function Portais(){
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

export default Portais;