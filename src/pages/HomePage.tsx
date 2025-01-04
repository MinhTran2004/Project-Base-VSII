import { useNavigate } from "react-router-dom";
import CustomButton from "../components/Form/CustomButton";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CustomButton name="Update User" onClick={() => navigate("/user/lhininhl")} />
    </div>
  );
};

export default HomePage;
