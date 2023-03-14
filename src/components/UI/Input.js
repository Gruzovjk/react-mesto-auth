export default function Input({
  type,
  name,
  placeholder,
  pattern,
  minLength,
  maxLength,
  handleChange,
  values,
  errors,
  isValid,
  isDarkMode,
}) {
  return (
    <div className="popup__input-wrap">
      <input
        className={`popup__input ${isDarkMode && "auth__input"}`}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        value={values[name] || ""}
        onChange={handleChange}
        style={{borderColor: errors[name] && "red"}}
        required
      />
      <span className="popup__input-error">{!isValid && errors[name]}</span>
    </div>
  );
}
