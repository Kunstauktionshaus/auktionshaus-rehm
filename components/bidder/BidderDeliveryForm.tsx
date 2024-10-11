"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConditionalFormSchema, ConditionalFormValues } from "@schemas/zod";
import { useTranslations } from "next-intl";
import { PickupForm } from "./PickupForm";
import { MailboxForm } from "./MailboxesForm";
import { ShippingForm } from "./ShippingForm";
import DatePickerField from "./DatePickerField";

const BidderDeliveryForm = ({
  bidderID,
  shippingCase,
}: {
  bidderID: number;
  shippingCase?: number;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<ConditionalFormValues>({
    resolver: zodResolver(ConditionalFormSchema),
    mode: "all",
  });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("ShippingForm");

  const [pickupDate, setPickupDate] = useState<Date | null>(null);

  const method = watch("N");

  const onSubmit: SubmitHandler<ConditionalFormValues> = (
    formData: ConditionalFormValues,
  ) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/bidder/update", {
          method: "PUT",
          body: JSON.stringify({ bidderID, formData }),
        });
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    });
  };

  const handleMethodChange = (newMethod: "1" | "2" | "4") => {
    reset({ N: newMethod });
  };

  return (
    <div className="font-montserrat">
      <div className="p-4 font-semibold">{t("chooseMethod")}</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 "
      >
        <div className="flex flex-col gap-4 p-4">
          {shippingCase !== 3 && (
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="2"
                {...register("N", { required: true })}
                onChange={() => handleMethodChange("2")}
                className="cursor-pointer"
              />
              {t("shipping")}
            </label>
          )}

          <label className="flex gap-2">
            <input
              type="radio"
              value="1"
              {...register("N", { required: true })}
              onChange={() => handleMethodChange("1")}
              className="cursor-pointer"
            />
            {t("pickup")}
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              value="4"
              {...register("N", { required: true })}
              onChange={() => handleMethodChange("4")}
              className="cursor-pointer"
            />
            {t("mailboxes")}
          </label>
        </div>

        {method === "1" && (
          <PickupForm
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            t={t}
          />
        )}
        {method === "2" && (
          <>
            {shippingCase === 2 && (
              <div className="flex flex-col gap-6 text-orange-600 bg-orange-100  p-4 mx-4">
                <div className="flex flex-col gap-2 items-center text-center">
                  <p>{t("shippingWarning1")}</p>
                  <p>{t("shippingWarning2")}</p>
                </div>

                <div className="w-full flex gap-4 items-center text-black">
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold"> {t("pickupDate")}*</label>
                    <DatePickerField
                      selectedDate={pickupDate}
                      onChange={(date) => {
                        setPickupDate(date);
                        setValue("L", date ?? undefined);
                      }}
                      placeholderText={t("placeholderPickupDate")}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold"> {t("pickupInfo")}</label>
                    <input
                      type="text"
                      {...register("M")}
                      className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>
            )}
            <ShippingForm
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              t={t}
            />
          </>
        )}
        {method === "4" && (
          <MailboxForm register={register} t={t} errors={errors} />
        )}

        <div className=" px-4">
          {method && (
            <button
              type="submit"
              className="px-8 py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isPending ? t("loading") : t("submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BidderDeliveryForm;
