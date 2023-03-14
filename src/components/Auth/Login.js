import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {useEffect} from "react";
import AuthForm from "./AuthForm";

export default function Login({isLoading, isDarkMode, onSubmit}) {
  const {values, handleChange, errors, isValid, resetForm} =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [onSubmit]);

  return (
    <AuthForm
      name="login"
      title="Вход"
      buttonLoadingText="Вход..."
      buttonText="Войти"
      isValid={isValid}
      isLoading={isLoading}
      isDarkMode={isDarkMode}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      errors={errors}
      span="Еще не зарегистрированы?"
      singup="Регистрация"
    />
  );
}
