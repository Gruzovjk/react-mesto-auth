import {useEffect} from "react";
import CloseButton from "../UI/CloseButton";
import Form from "../UI/Form";

export default function PopupWithForm({
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
  isDarkMode,
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
        <Form
          name={name}
          title={title}
          onSubmit={onSubmit}
          buttonLoadingText={buttonLoadingText}
          buttonText={buttonText}
          isValid={isValid}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          children={children}
        />
        <CloseButton onClose={onClose} />
      </div>
    </div>
  );
}
