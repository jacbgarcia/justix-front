import HeaderLggd from "../../components/HeaderLggd";
import ContainerLggd from "../../components/ContainerLggd";
import Footer from "../../components/Footer";
import styles from "./Tribunais.module.css";
import Card from "../../components/Card";

function Tribunais(){
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

export default Tribunais;