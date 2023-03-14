import {useEffect} from "react";

function InfoTooltip({props, onClose, onCloseByEscEndOverlay, isOpen}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keyup", onCloseByEscEndOverlay);
      document.addEventListener("mouseup", onCloseByEscEndOverlay);
    } else {
      document.removeEventListener("keyup", onCloseByEscEndOverlay);
      document.removeEventListener("mouseup", onCloseByEscEndOverlay);
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className="popup__container">
          <img
            src={props.img}
            alt={props.title}
            className="popup__tooltip-img"
          />
          <h2 className="popup__tooltip-title">{props.title}</h2>
        </div>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
