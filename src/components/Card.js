import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardRemove, onCardLike}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleRemoveClick() {
    onCardRemove(card);
  }
  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__img"
        onClick={handleCardClick}
      />
      <div className="card__caption">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            title="Мне нравится"
          />
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__remove-button"
          type="button"
          title="Удалить место"
          onClick={handleRemoveClick}
        />
      )}
    </li>
  );
}

export default Card;
