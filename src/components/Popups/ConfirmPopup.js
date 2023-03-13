import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({
  onClose,
  onCloseByEscEndOverlay,
  isLoading,
  onCardRemove,
  card,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardRemove(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="type_confirm"
      isOpen={card}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseByEscEndOverlay={onCloseByEscEndOverlay}
      isValid={true}
      isLoading={isLoading}
      buttonText="Да"
      buttonLoadingText="Удаляем место..."
    ></PopupWithForm>
  );
}

export default ConfirmPopup;
