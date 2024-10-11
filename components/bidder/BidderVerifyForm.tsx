"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BidderFiltersSchema, BidderFiltersValues } from "@schemas/zod";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const BidderVerifyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const auctionNumber: string | null = searchParams.get("auction");
  const bidderNumber: string | null = searchParams.get("bidder");

  const t = useTranslations("verifyForm");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BidderFiltersValues>({
    resolver: zodResolver(BidderFiltersSchema),
  });

  const onSubmit = async (data: BidderFiltersValues) => {
    setError(null);
    setSuccessMessage(null);
    startTransition(async () => {
      try {
        const response = await fetch(
          `/api/bidder/find?auction=${data.A}&bidder=${data.B}&email=${data.E}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();

        if (result.status === 200) {
          setSuccessMessage(t("responseSuccess"));
          router.push("dashboard");
        } else if (result.status === 404) {
          setError(t("responseError"));
        } else if (result.status === 500) {
          setError(t("serverError"));
        }
      } catch (error: any) {
        setError(t("serverError"));
        console.error(error);
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-4 font-montserrat">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label className="" htmlFor="auctionNumber">
            {t("auctionNumber")}
          </label>
          <input
            {...register("A")}
            defaultValue={auctionNumber ?? ""}
            type="string"
            className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
          />
          {errors.A && (
            <span className="text-xs text-red-500"> {t("numberError")}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="" htmlFor="bidderNumber">
            {t("bidderNumber")}
          </label>
          <input
            {...register("B")}
            defaultValue={bidderNumber ?? ""}
            type="string"
            className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
          />
          {errors.B && (
            <span className="text-xs text-red-500"> {t("numberError")}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="">{t("email")}</label>
          <input
            {...register("E")}
            type="email"
            className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
          />
          {errors.E && (
            <span className="text-xs text-red-500"> {t("emailError")}</span>
          )}
        </div>
        <div className="text-center">
          <button
            disabled={isPending}
            type="submit"
            className=" mt-4 px-8 py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isPending ? t("loading") : t("submit")}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {successMessage && (
            <p className="mt-4 text-green-500">{successMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default BidderVerifyForm;
