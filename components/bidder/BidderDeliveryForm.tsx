"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CombinedFormSchema } from "@schemas";
import { useTranslations, useLocale } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWeekend, isMonday, startOfToday } from "date-fns";
import { de, enGB } from "date-fns/locale";
import ReactFlagsSelect from "react-flags-select";

type CombinedFormValues = z.infer<typeof CombinedFormSchema>;

const BidderDeliveryForm = ({
  bidderID,
  isBidderNotEU,
  shippingCase,
}: {
  bidderID: number;
  isBidderNotEU: boolean;
  shippingCase?: number;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CombinedFormValues>({
    resolver: zodResolver(CombinedFormSchema),
  });
  const currentLocale = useLocale();
  const locale = currentLocale === "de" ? de : enGB;
  const t = useTranslations("ShippingForm");

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const method = watch("method");

  const filterDates = (date: Date) => {
    const today = startOfToday();
    return date >= today && !isWeekend(date) && !isMonday(date);
  };

  const onSubmit = async (data: CombinedFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <div className="p-4">Choose delivery method</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 font-montserrat"
      >
        <div className="flex flex-col gap-4 p-4">
          {shippingCase !== 3 && (
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="2"
                {...register("method", { required: true })}
                onChange={() => setValue("method", "2")}
                className="cursor-pointer"
              />
              {t("shipping")}
            </label>
          )}

          <label className="flex gap-2">
            <input
              type="radio"
              value="1"
              {...register("method", { required: true })}
              onChange={() => setValue("method", "1")}
              className="cursor-pointer"
            />
            {t("pickup")}
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              value="4"
              {...register("method", { required: true })}
              onChange={() => setValue("method", "4")}
              className="cursor-pointer"
            />
            {t("mailboxes")}
          </label>
        </div>

        {errors.method && (
          <span className="text-red-500">{errors.method.message}</span>
        )}

        {method === "1" && (
          <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold"> {t("pickupDate")}</label>
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => {
                    setPickupDate(date);
                    if (date) setValue("pickupDate", date);
                  }}
                  required
                  locale={locale}
                  filterDate={filterDates}
                  placeholderText={t("placeholderPickupDate")}
                  className="w-full border border-neutral-300 rounded py-2 px-3 text-gray-700 focus:outline-beige focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold"> {t("pickupInfo")}</label>
                <input
                  type="text"
                  {...register("pickupInfo")}
                  className="border border-neutral-300 p-2 rounded focus:outline-beige focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col gap-2">
                {" "}
                <label className="font-semibold"> {t("comments")}</label>
                <textarea
                  {...register("comments")}
                  className="border border-neutral-300 p-2 rounded focus:outline-beige focus:shadow-outline"
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
        )}

        {method === "2" && (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold"> {t("address")}</label>
              <input
                type="text"
                {...register("address")}
                className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold"> {t("postalCode")}</label>
              <input
                type="text"
                {...register("postalCode")}
                className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold"> {t("city")}</label>
              <input
                type="text"
                {...register("city")}
                className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold"> {t("country")}</label>
              <ReactFlagsSelect
                selected={selectedCountry}
                onSelect={(code) => {
                  setSelectedCountry(code);
                  if (code) setValue("country", code);
                }}
                placeholder={t("selectCountry")}
                searchable
                searchPlaceholder={t("searchCountry")}
                selectedSize={14}
                className="w-full rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold"> {t("comments")}</label>
              <textarea
                {...register("comments")}
                className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
              />
            </div>
          </div>
        )}

        {method === "4" && (
          <div className="flex flex-col gap-4 p-4">
            <label> {t("comments")}</label>
            <textarea
              {...register("comments")}
              className="border border-neutral-300 p-2 rounded focus:outline-beige focus:shadow-outline"
            />
          </div>
        )}
        <div className="mt-4 p-4">
          {method && (
            <button
              type="submit"
              className="mt-4 px-8 py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BidderDeliveryForm;
