import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import ShowIcon from "@public/assets/icons/show.png";
import HideIcon from "@public/assets/icons/hide.png";
import { useTranslations } from "next-intl";

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
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <div className="relative w-full">
        <input
          {...register}
          name={name}
          id={name}
          type={showPassword ? "text" : "password"}
          className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? (
            <Image src={HideIcon} alt="hide" width={20} height={20} />
          ) : (
            <Image src={ShowIcon} alt="show" width={20} height={20} />
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
