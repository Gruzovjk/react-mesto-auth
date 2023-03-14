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
import ProtectedRoute from "./Auth/ProtectedRoute";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {signUp, signIn, checkToken} from "../utils/ApiAuth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipProps, setInfoTooltipProps] = useState({
    title: "",
    img: "",
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  function handleSignIn(email, password) {
    setLoading(true);
    signIn(email, password)
      .then((res) => {
        setLoggedIn(true);
        setEmail(email);
        localStorage.setItem("jwt", res.token);
        navigate("/");
      })
      .catch(() => {
        setInfoTooltipProps({
          title: "Что-то пошло не так! Попробуйте еще раз.",
          img: unsuccessful,
        });
        setInfoTooltip(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSignUp(email, password) {
    setLoading(true);
    signUp(email, password)
      .then((res) => {
        setInfoTooltipProps({
          title: "Вы успешно зарегистрировались!",
          img: successful,
        });
        navigate("/sign-in");
      })
      .catch(() => {
        setInfoTooltipProps({
          title: "Что-то пошло не так! Попробуйте еще раз.",
          img: unsuccessful,
        });
      })
      .finally(() => {
        setInfoTooltip(true);
        setLoading(false);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    setEmail(null);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`При проверке токена произошла ошибка: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardList]) => {
          setCurrentUser(userData);
          setCards(cardList);
        })
        .catch((err) =>
          console.log(`При получении данных произошла ошибка: ${err}`)
        );
    }
  }, [isLoggedIn]);

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                title="Выйти"
                isLoggedIn={isLoggedIn}
                route=""
                email={email}
                onClick={handleLogOut}
              />
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                card={selectedCard}
                onCardLike={handleCardLike}
                onCardRemove={handleCardRemoveClick}
                component={Main}
                isLoggedIn={isLoggedIn}
              />
            </>
          }
        />

        <Route
          path="/sign-up"
          element={
            <>
              <Header title="Войти" route="/sign-in" />
              <Register
                isLoading={isLoading}
                isDarkMode={true}
                onSubmit={handleSignUp}
              />
            </>
          }
        />

        <Route
          path="/sign-in"
          element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login
                isLoading={isLoading}
                isDarkMode={true}
                onSubmit={handleSignIn}
              />
            </>
          }
        />

        <Route
          exact
          path="*"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
          }
        />
      </Routes>

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
        card={confirmPopupOpen}
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
