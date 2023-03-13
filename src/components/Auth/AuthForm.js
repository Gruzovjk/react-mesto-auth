import Form from "../UI/Form";
import Input from "../UI/Input";

export default function AuthForm({
  name,
  title,
  buttonLoadingText,
  buttonText,
  isValid,
  isLoading,
  isDarkMode,
  handleChange,
  values,
  errors,
  span,
}) {
  return (
    <div className="auth">
      <div className={`popup__container ${isDarkMode && "auth__container"}`}>
        <Form
          name={name}
          title={title}
          // onSubmit={handleSubmit}
          buttonLoadingText={buttonLoadingText}
          buttonText={buttonText}
          isValid={isValid}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        >
          <Input
            type="email"
            name="email"
            isDarkMode={isDarkMode}
            placeholder="Email"
            minLength="2"
            maxLength="40"
            handleChange={handleChange}
            values={values}
            errors={errors}
            isValid={isValid}
          />
          <Input
            type="password"
            name="password"
            isDarkMode={isDarkMode}
            placeholder="Пароль"
            minLength="8"
            maxLength="20"
            handleChange={handleChange}
            values={values}
            errors={errors}
            isValid={isValid}
          />
        </Form>
        <p className="auth__span">{span}</p>
      </div>
    </div>
  );
}
