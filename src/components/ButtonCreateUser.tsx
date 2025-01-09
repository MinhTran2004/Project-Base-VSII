import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ButtonProps {
  text: string; 
  width?: string;
  height?: string; 
  onClick?: () => void;
  loading?: boolean; 
  disabled?: boolean;
}

const ButtonCreateUser: React.FC<ButtonProps> = ({
  text,
  width = "auto",
  height = "auto",
  onClick,
  loading = false,
  disabled = false,
}) => {
  const style = {
    width,
    height,
  };

  return (
    <button
      style={style}
      className={`btn btn-primary d-flex align-items-center justify-content-center`}
      onClick={onClick}
      disabled={loading || disabled} 
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonCreateUser;
