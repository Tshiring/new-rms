import Achievements from "./components/Achievements";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RestaurantList from "./components/RestaurantList";

const Landing = () => {
  return (
    <div>
      <Header />
      <Hero />
      <RestaurantList />
      <Achievements />
      <Footer />
    </div>
  );
};

export default Landing;
