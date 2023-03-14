import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {useEffect} from "react";
import AuthForm from "./AuthForm";

export default function Register({isLoading, isDarkMode, onSubmit}) {
  const {values, handleChange, errors, isValid, resetForm} =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  }
  useEffect(() => {
    resetForm({}, {}, false);
  }, []);

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      buttonLoadingText="Регистрация..."
      buttonText="Зарегистрироваться"
      isValid={isValid}
      isLoading={isLoading}
      isDarkMode={isDarkMode}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      values={values}
      errors={errors}
      span="Уже зарегистрированы?"
      singin="Войти"
    />
  );
}
