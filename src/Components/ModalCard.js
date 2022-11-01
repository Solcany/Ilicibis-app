import "Stylesheets/ModalCard.scss";
import { joinStyles } from "Utils/dev.js";

const ModalCard = ({ children, className, isVisible = false }) => {
  return (
    <>
      {isVisible && (
        <div className={joinStyles(["modal-card-wrapper", className])}>
          <div className="modal-card-content">{children}</div>
        </div>
      )}
    </>
  );
};

export default ModalCard;
