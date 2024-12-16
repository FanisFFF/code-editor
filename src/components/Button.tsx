import { FC } from "react";

interface IButton {
  handleClick: () => void;
  isLoading: boolean;
}

const Button: FC<IButton> = ({ handleClick, isLoading }) => {
  return (
    <button
      style={{
        marginTop: "1rem",
        color: "white",
        fontSize: "16px",
        backgroundColor: isLoading ? "#3792ce8b" : "#007acc",
        border: "none",
        borderRadius: "5px",
        padding: "0.4rem 0.8rem",
        fontFamily: "'Lato', sans-serif",
        cursor: isLoading ? "default" : "pointer",
      }}
      disabled={isLoading}
      onClick={handleClick}
    >
      Run
    </button>
  );
};
export default Button;
