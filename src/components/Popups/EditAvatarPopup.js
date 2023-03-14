import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
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
    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="type_img"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseByEscEndOverlay={onCloseByEscEndOverlay}
      buttonText="Сохранить"
      buttonLoadingText="Обновляем аватар..."
      isValid={isValid}
      isLoading={isLoading}
    >
      <div className="popup__input-wrap">
        <input
          type="url"
          className="popup__input popup__card-link"
          name="avatar"
          placeholder="Ссылка на фото (формата .jpg, .gif или .png)"
          onChange={handleChange}
          minLength={2}
          value={values.avatar || ""}
          pattern="(https?:\/\/.*\.(?:png|jpe?g|tiff?|png|webp|bmp|gif))"
          required
          style={{borderColor: errors.avatar && "red"}}
        />
        <span className="popup__input-error">{!isValid && errors.avatar}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
