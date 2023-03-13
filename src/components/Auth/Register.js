import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {useEffect} from "react";
import AuthForm from "./AuthForm";

export default function Register({isLoading, isDarkMode}) {
  const {values, handleChange, errors, isValid, resetForm} =
    useFormAndValidation();

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
      handleChange={handleChange}
      values={values}
      errors={errors}
      span="Уже зарегистрированы? Войти"
    />
  );
}
