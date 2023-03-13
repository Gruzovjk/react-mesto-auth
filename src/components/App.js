import {useState, useEffect} from "react";
import Header from "./Main/Header";
import Main from "./Main/Main";
import Footer from "./Main/Footer";
import ImagePopup from "./Popups/ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./Popups/EditProfilePopup";
import EditAvatarPopup from "./Popups/EditAvatarPopup";
import AddPlacePopup from "./Popups/AddPlacePopup";
import ConfirmPopup from "./Popups/ConfirmPopup";
import InfoTooltip from "./Auth/InfoTooltip";
import successful from "../images/successful.svg";
import unsuccessful from "../images/unsuccessful.svg";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [сonfirmPopupOpen, setConfirmPopupOpen] = useState(null);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipProps, setInfoTooltipProps] = useState({
    title: "",
    img: "",
  });

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
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard(null);
    setConfirmPopupOpen(null);
    setInfoTooltip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
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
      <Register isLoading={isLoading} isDarkMode={true} />
      <Login isLoading={isLoading} isDarkMode={true} />
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

      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltip}
        onCloseByEscEndOverlay={closePopupByEscEndOverlay}
        props={infoTooltipProps}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
