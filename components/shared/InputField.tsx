import { useTranslations } from "next-intl";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  register,
  error,
  disabled,
}) => {
  const t = useTranslations("Auth");
  return (
    <div className="w-full flex flex-col gap-1 md:gap-2">
      <input
        {...register}
        type={type}
        name={name}
        id={name}
        className="w-full text-black text-sm md:text-base border border-sky-blue rounded bg-white disabled:bg-sky-blue-back
        disabled:text-teal p-2 focus:outline-teal focus:shadow-outline
        placeholder:text-teal"
        placeholder={label}
        disabled={disabled}
      />
      {error && (
        <span className="text-xs text-red">
          {type === "email" ? t("emailError") : t("required")}
        </span>
      )}
    </div>
  );
};

export default InputField;
