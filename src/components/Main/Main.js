import {useContext} from "react";
import Card from "../Card";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardRemove,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            title="Ваш аватар"
            alt="Аватар"
            className="profile__avatar-img"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            title="Редактировать фото профиля"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            title="Редактировать профиль"
            onClick={onEditProfile}
          />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить новое место"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardRemove={onCardRemove}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
