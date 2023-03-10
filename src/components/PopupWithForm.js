import {useEffect} from "react";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  onCloseByEscEndOverlay,
  buttonLoadingText,
  buttonText,
  isValid,
  isLoading,
}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keyup", onCloseByEscEndOverlay);
      document.addEventListener("mousedown", onCloseByEscEndOverlay);
    } else {
      document.removeEventListener("keyup", onCloseByEscEndOverlay);
      document.removeEventListener("mousedown", onCloseByEscEndOverlay);
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className="popup__form">
          <form
            className="popup__set"
            name={name}
            onSubmit={onSubmit}
            noValidate
          >
            <h2 className="popup__title">{title}</h2>
            {children}
            <button
              type="submit"
              className="popup__save-button"
              disabled={!isValid}
            >
              {isLoading ? buttonLoadingText : buttonText}
            </button>
          </form>
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

export default PopupWithForm;
