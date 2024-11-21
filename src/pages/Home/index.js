import styles from "./Home.module.css";
import ContainerHome from "../../components/ContainerHome";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import '@fontsource/montserrat/300.css';
import HomeCards from "./HomeCards";
import DynamicBanner from "./DynamicBanner";

function Home() {
  return (      
    <div className={styles.container}>
      <Header>
        
      </Header>
      
      
        <section>
          <DynamicBanner />
         
          <HomeCards />        
        </section>
    
      <Footer />
    </div>
  );
}

export default Home;