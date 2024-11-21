import styles from "../Home/Home.module.css";
import ContainerHome from "../../components/ContainerHome";
import Footer from "../../components/Footer";
import HeaderLggd from "../../components/HeaderLggd/index"
import '@fontsource/montserrat/300.css';
import { Link } from "react-router-dom";
import HomeCardsUser from "./HomeCardsUser"
import DynamicBannerUser from "./DynamicBannerUser";

function HomeUser() {
  return (      
    <div className={styles.container}>
      <HeaderLggd>
        <div className={styles.navleft}>
        </div>
      </HeaderLggd>
      
      <ContainerHome>
        <section>
          <DynamicBannerUser />
          <HomeCardsUser />        
        </section>
      </ContainerHome>
      <Footer />
    </div>
  );
}

export default HomeUser;