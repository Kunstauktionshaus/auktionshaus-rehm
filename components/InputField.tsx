import { useTranslations } from "next-intl";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  register,
  error,
}) => {
  const t = useTranslations("Auth");
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        {...register}
        type={type}
        name={name}
        id={name}
        className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
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
