"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BidderFiltersSchema } from "@schemas";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type BidderVerifyFormValues = z.infer<typeof BidderFiltersSchema>;

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
  } = useForm<BidderVerifyFormValues>({
    resolver: zodResolver(BidderFiltersSchema),
  });

  const onSubmit = async (data: BidderVerifyFormValues) => {
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

        if (response.ok) {
          const result = await response.json();
          setSuccessMessage(result.message || "Bidder found!");
          router.push("dashboard");
        } else {
          const result = await response.json();
          setError(result.error || "An error occurred.");
        }
      } catch (error: any) {
        console.error(error);
      }
    });
  };

  return (
    <div className="mt-6 mx-auto w-full max-w-md p-4  font-display">
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="block text-grafit text-sm font-bold mb-1"
            htmlFor="auctionNumber"
          >
            {t("auctionNumber")}
          </label>
          <input
            {...register("A")}
            defaultValue={auctionNumber ?? ""}
            type="string"
            className="w-full border-b border-gray-500 focus:border-green-500 outline-none text-gray-500 p-2"
          />
          {errors.A && <span className="text-red-500">{errors.A.message}</span>}
        </div>
        <div>
          <label
            className="block text-grafit text-sm font-bold mb-1"
            htmlFor="bidderNumber"
          >
            {t("bidderNumber")}
          </label>
          <input
            {...register("B")}
            defaultValue={bidderNumber ?? ""}
            type="string"
            className="w-full border-b border-gray-500 focus:border-green-500 outline-none text-gray-500 p-2"
          />
          {errors.B && <span className="text-red-500">{errors.B.message}</span>}
        </div>
        <div>
          <label
            className="block text-grafit text-sm font-bold mb-1"
            htmlFor="email"
          >
            {t("email")}
          </label>
          <input
            {...register("E")}
            type="email"
            className="w-full border-b border-gray-500 focus:border-green-500 outline-none text-gray-500 p-2"
          />
          {errors.E && <span className="text-red-500">{errors.E.message}</span>}
        </div>
        <div className="text-center">
          <button
            disabled={isPending}
            type="submit"
            className="border-b-2 border-gray-500 text-gray-500
                hover:border-b-2 hover:border-green-500
                transition-border duration-300 ease-in-out
                hover:text-green-500  py-2 px-6 focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BidderVerifyForm;
