import "Stylesheets/Button.scss";
import { joinStyles } from "Utils/dev.js";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={joinStyles(["button", className])}>
      {children}
    </button>
  );
};

export default Button;
