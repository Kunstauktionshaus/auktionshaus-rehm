"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConditionalFormSchema, ConditionalFormValues } from "@schemas/zod";
import { useLocale, useTranslations } from "next-intl";
import { PickupForm } from "./PickupForm";
import { MailboxForm } from "./MailboxesForm";
import { ShippingForm } from "./ShippingForm";
import DatePickerField from "./DatePickerField";
import Link from "next/link";
import Image from "next/image";
import PDFIcon from "@public/assets/icons/pdf.png";

const BidderDeliveryForm = ({
  bidderID,
  method,
  shippingCase,
}: {
  bidderID: number;
  method: number;
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
  const [shippingMethod, setShippingMethod] = useState(method);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("ShippingForm");
  const locale = useLocale();

  const [pickupDate, setPickupDate] = useState<Date | null>(null);

  const chosenMethod = watch("N");

  const onSubmit: SubmitHandler<ConditionalFormValues> = (
    formData: ConditionalFormValues,
  ) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/bidder/update", {
          method: "PUT",
          body: JSON.stringify({ bidderID, formData }),
        });
        if (res) {
          setShippingMethod(+formData.N);
        }
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
    <div className="w-full font-montserrat p-4">
      {(shippingMethod === 0 || shippingMethod === 3) && (
        <div>
          <div className="font-semibold">{t("chooseMethod")}</div>
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

            {chosenMethod === "1" && (
              <PickupForm
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                t={t}
              />
            )}
            {chosenMethod === "2" && (
              <>
                {(() => {
                  const href =
                    locale === "en"
                      ? "https://www.auktionshaus-rehm.de/downloads/shippingNotes.pdf"
                      : "https://www.auktionshaus-rehm.de/downloads/VersandhinweiseInland.pdf";

                  return (
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                      <div className="flex gap-2 items-center p-4 hover:underline">
                        <Image
                          src={PDFIcon}
                          width={30}
                          height={30}
                          alt="pdf icon"
                        />
                        <p>{t("shippingConditions")}</p>
                      </div>
                    </Link>
                  );
                })()}

                {shippingCase === 2 && (
                  <div className="flex flex-col gap-6 text-orange-600 bg-orange-100  p-4 mx-4">
                    <div className="flex flex-col gap-2 items-center text-center">
                      <p>{t("shippingWarning1")}</p>
                      <p>{t("shippingWarning2")}</p>
                    </div>

                    <div className="w-full flex gap-4 items-center text-black">
                      <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold">
                          {" "}
                          {t("pickupDate")}*
                        </label>
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
                        <label className="font-semibold">
                          {" "}
                          {t("pickupInfo")}
                        </label>
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
            {chosenMethod === "4" && (
              <MailboxForm register={register} t={t} errors={errors} />
            )}

            <div className=" px-4">
              {chosenMethod && (
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
      )}

      {shippingMethod === 1 && (
        <div>
          You selected pickup method on DATE. You have chosen to pick up items
          from the auction house. We look forward to seeing you!
        </div>
      )}

      {shippingMethod === 2 && (
        <div className="font-montserrat px-4 py-20 text-center">
          You selected shipping method. Your shipment is currently being
          processed, and you will receive an email with updates.
        </div>
      )}

      {shippingMethod === 4 && (
        <div className="text-lg p-10 text-center">
          <span>Your selected method: </span>
          <span> contact mailboxes. </span>
          <p>
            Your request is being processed, and someone will get in touch with
            you shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default BidderDeliveryForm;
