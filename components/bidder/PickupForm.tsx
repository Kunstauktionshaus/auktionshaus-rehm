import { MethodFormProps } from "@types";
import DatePickerField from "./DatePickerField";

export const PickupForm: React.FC<MethodFormProps> = ({
  register,
  setValue,
  watch,
  errors,
  t,
}) => {
  const pickupDate = watch("L") ?? null;

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full flex flex-col gap-4">
        <label className="font-semibold">{t("pickupDate")}*</label>
        <DatePickerField
          selectedDate={pickupDate}
          onChange={(date) => setValue("L", date ?? undefined)}
          placeholderText={t("placeholderPickupDate")}
        />
        <div className="flex flex-col gap-2">
          <label className="font-semibold"> {t("pickupInfo")}</label>
          <input
            type="text"
            {...register("M")}
            className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold"> {t("comments")}</label>
          <textarea
            {...register("N1")}
            className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="block text-sm font-bold">{t("map")}</label>
        <div className="text-xs text-gray-400">
          <p>Provinostraße 52, Gebäude B1_12, 86153 Augsburg</p>
          <p> Tel: +49 (821) 55 10 01</p>
          <p>Fax: +49 (821) 55 67 58</p>
        </div>
        <div className="w-full h-52">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d662.704325338063!2d10.917945099999999!3d48.3640342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e97f9c9703f9d%3A0xe6512afa674c6503!2sSchmuck-%20und%20Kunstauktionshaus%20Georg%20Rehm!5e0!3m2!1sen!2spl!4v1724684736891!5m2!1sen!2spl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
