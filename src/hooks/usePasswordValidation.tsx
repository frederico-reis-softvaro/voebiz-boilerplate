import { useState, useEffect } from "react";

export const usePasswordValidation = (password: string, minLength: number, maxLength: number): boolean[] => {
  const [hasValidLength, setHasValidLength] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasLowerCase, setHasLowerCase] = useState<boolean>(false);
  const [hasUpperCase, setHasUpperCase] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [hasNotBarra, setHasNotBarra] = useState<boolean>(false);

  useEffect(() => {
    setHasValidLength(password.length >= minLength && password.length <= maxLength);
    setHasUpperCase(password.toLowerCase() !== password);
    setHasLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
    setHasNotBarra(!password.includes("/"));
  }, [password, minLength, maxLength]);

  return [hasValidLength, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar, hasNotBarra];
};
