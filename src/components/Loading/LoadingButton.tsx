import { ImSpinner10 } from "react-icons/im";
import "./loading.css"

export const LoadingButton = () => {
  return (
    <div className="spinner-container" style={{ backgroundColor: "#FF0000" }}>
      <ImSpinner10 />
    </div>
  );
};
