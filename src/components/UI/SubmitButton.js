export default function SubmitButton({
  isLoading,
  isValid,
  isDarkMode,
  buttonText,
  buttonLoadingText,
}) {
  return (
    <button
      type="submit"
      className={`popup__save-button ${isDarkMode && "auth__submit-button"}`}
      disabled={!isValid}
    >
      {isLoading ? buttonLoadingText : buttonText}
    </button>
  );
}
