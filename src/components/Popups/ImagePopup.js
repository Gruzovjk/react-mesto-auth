import {useEffect} from "react";

function ImagePopup({card, onClose, onCloseByEscEndOverlay, isOpen}) {
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
    <div className={`popup popup_type_img ${card && "popup_opened"}`}>
      <div className="popup__container popup__container-img">
        <img
          src={card && card.link}
          alt={card && card.name}
          className="popup__img"
        />
        <p className="popup__img-caption">{card && card.name}</p>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
