import FooterComponent from "../components/Footer";
import HeaderComponent from "../components/Header/header";
import FindPetById from "./FindPetById";

const HomePage = () => {
  return (
    <div>
      <HeaderComponent />
      <FindPetById />
      <FooterComponent />
    </div>
  );
};

export default HomePage;
