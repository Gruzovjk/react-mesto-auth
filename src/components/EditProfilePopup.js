import {useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onCloseByEscEndOverlay,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, resetForm} =
    useFormAndValidation();

  useEffect(() => {
    resetForm(
      {...values, name: currentUser.name, about: currentUser.about},
      {},
      true
    );
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="type_profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseByEscEndOverlay={onCloseByEscEndOverlay}
      isLoading={isLoading}
      isValid={isValid}
      buttonText="Сохранить"
      buttonLoadingText="Обновляем данные..."
    >
      <div className="popup__input-wrap">
        <input
          className="popup__input popup__profile-name"
          name="name"
          maxLength="20"
          minLength="2"
          required
          placeholder="Ваше имя"
          value={values.name || ""}
          onChange={handleChange}
          style={{borderColor: errors.name && "red"}}
        />
        <span className="popup__input-error">{!isValid && errors.name}</span>
      </div>
      <div className="popup__input-wrap">
        <input
          className="popup__input popup__profile-about"
          name="about"
          maxLength="40"
          minLength="2"
          required
          placeholder="Расскажите о себе"
          value={values.about || ""}
          onChange={handleChange}
          style={{borderColor: errors.about && "red"}}
        />
        <span className="popup__input-error">{!isValid && errors.about}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
