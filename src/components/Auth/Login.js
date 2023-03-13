import {useFormAndValidation} from "../../hooks/useFormAndValidation";
import {useEffect} from "react";
import AuthForm from "./AuthForm";

export default function Login({isLoading, isDarkMode}) {
  const {values, handleChange, errors, isValid, resetForm} =
    useFormAndValidation();

  useEffect(() => {
    resetForm({}, {}, false);
  }, []);

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
      values={values}
      errors={errors}
      span=""
    />
  );
}
