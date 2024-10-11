import { MethodFormProps } from "@types";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

export const ShippingForm: React.FC<MethodFormProps> = ({
  register,
  setValue,
  watch,
  errors,
  t,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold"> {t("address")}*</label>
        <input
          type="text"
          {...register("I", { required: true })}
          className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
        />
        {errors.I && <span className="text-red-500">{errors.I.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold"> {t("postalCode")}*</label>
        <input
          type="text"
          {...register("D2", { required: true })}
          className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
        />
        {errors.D2 && <span className="text-red-500">{errors.D2.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold"> {t("city")}*</label>
        <input
          type="text"
          {...register("C2", { required: true })}
          className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
        />
        {errors.C2 && <span className="text-red-500">{errors.C2.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold"> {t("country")}*</label>
        <ReactFlagsSelect
          selected={selectedCountry}
          onSelect={(code) => {
            setSelectedCountry(code);
            if (code) setValue("R4", code, { shouldValidate: true });
          }}
          placeholder={t("selectCountry")}
          searchable
          searchPlaceholder={t("searchCountry")}
          selectedSize={14}
          className="w-full rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
        />
        {errors.R4 && <span className="text-red-500">{errors.R4.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold"> {t("comments")}</label>
        <textarea
          {...register("N1")}
          className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
        />
      </div>
    </div>
  );
};
