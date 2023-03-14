import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

function AddPlacePopup({
  isOpen,
  onClose,
  onUpdatePlace,
  onCloseByEscEndOverlay,
  isLoading,
}) {
  const {values, handleChange, errors, isValid, resetForm} =
    useFormAndValidation();

  useEffect(() => {
    resetForm({}, {}, false);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdatePlace({
      name: values.name,
      src: values.src,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseByEscEndOverlay={onCloseByEscEndOverlay}
      isLoading={isLoading}
      isValid={isValid}
      buttonText="Создать"
      buttonLoadingText="Добавляем место..."
    >
      <div className="popup__input-wrap">
        <input
          className="popup__input popup__card-name"
          name="name"
          placeholder="Название места"
          minLength="2"
          maxLength="40"
          required
          value={values.name || ""}
          onChange={handleChange}
          style={{borderColor: errors.name && "red"}}
        />
        <span className="popup__input-error">{!isValid && errors.name}</span>
      </div>
      <div className="popup__input-wrap">
        <input
          type="url"
          className="popup__input popup__card-link"
          name="src"
          placeholder="Ссылка на фото (формата .jpg или .png)"
          pattern="(https?:\/\/.*\.(?:png|jpe?g|tiff?|png|webp|bmp))"
          required
          minLength="2"
          value={values.src || ""}
          onChange={handleChange}
          style={{borderColor: errors.src && "red"}}
        />
        <span className="popup__input-error">{!isValid && errors.src}</span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
