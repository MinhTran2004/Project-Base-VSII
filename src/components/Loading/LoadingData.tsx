import { FaSpinner } from "react-icons/fa";
import "./loading.css"

export const LoadingData = () => {
  return (
    <div className="loading-container">
      <FaSpinner className="spinner" />
    </div>
  )
}
