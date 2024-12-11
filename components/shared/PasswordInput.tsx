import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface PasswordInputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  register,
  error,
}) => {
  const t = useTranslations("Auth");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <div className="relative w-full">
        <input
          {...register}
          name={name}
          id={name}
          type={showPassword ? "text" : "password"}
          className="w-full text-sm md:text-base border border-sky-blue rounded bg-white disabled:bg-sky-blue-back disabled:text-teal p-2 focus:outline-teal focus:shadow-outline
          placeholder:text-teal"
          placeholder={label}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4 text-teal" />
          ) : (
            <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-teal" />
          )}
        </button>
      </div>
      {error && (
        <span className="text-xs text-red">
          {name === "password" ? t("passwordError") : t("confirmPasswordError")}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
