import SubmitButton from "./SubmitButton";

export default function Form({
  name,
  title,
  handleSubmit,
  buttonLoadingText,
  buttonText,
  isValid,
  isLoading,
  isDarkMode,
  children,
}) {
  return (
    <div className="popup__form">
      <form
        className={`popup__set ${isDarkMode && "auth__set"}`}
        name={name}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className={`popup__title ${isDarkMode && "auth__title"}`}>
          {title}
        </h2>
        {children}
        <SubmitButton
          buttonLoadingText={buttonLoadingText}
          buttonText={buttonText}
          isValid={isValid}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </form>
    </div>
  );
}
