import {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [сonfirmPopupOpen, setConfirmPopupOpen] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch((err) =>
        console.log(`При получении данных произошла ошибка: ${err}`)
      );
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setConfirmPopupOpen(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) =>
        console.log(`При постановке лайка произошла ошибка: ${err}`)
      );
  }

  function handleCardRemove(card) {
    setLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== card._id && item)
        );
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При удалении карточки произошла ошибка: ${err}`)
      )
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCardRemoveClick(card) {
    setConfirmPopupOpen(card);
  }

  function handleUpdateUser(data) {
    setLoading(true);
    api
      .editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При обновлении данных произошла ошибка: ${err}`)
      )
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api
      .editUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При обновлении аватара произошла ошибка: ${err}`)
      )
      .finally(() => {
        setLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`При добавлении места произошла ошибка: ${err}`)
      )
      .finally(() => {
        setLoading(false);
      });
  }

  function closePopupByEscEndOverlay(e) {
    if (e.key === "Escape" || e.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        card={selectedCard}
        onCardLike={handleCardLike}
        onCardRemove={handleCardRemoveClick}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onCloseByEscEndOverlay={closePopupByEscEndOverlay}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onCloseByEscEndOverlay={closePopupByEscEndOverlay}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdatePlace={handleAddPlaceSubmit}
        onCloseByEscEndOverlay={closePopupByEscEndOverlay}
        isLoading={isLoading}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onCloseByEscEndOverlay={closePopupByEscEndOverlay}
        isOpen={isImagePopupOpen}
      />

      <ConfirmPopup
        card={сonfirmPopupOpen}
        onCloseByEscEndOverlay={closePopupByEscEndOverlay}
        onClose={closeAllPopups}
        onCardRemove={handleCardRemove}
        isLoading={isLoading}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
