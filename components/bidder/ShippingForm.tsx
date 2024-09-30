"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingFormSchema } from "@schemas";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";

type ShippingFormValues = z.infer<typeof ShippingFormSchema>;

const BidderDeliveryForm = () => {
  const t = useTranslations("ShippingForm");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(ShippingFormSchema),
  });

  const onSubmit = async (data: ShippingFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{t("address")}</label>
        <input type="text" {...register("address")} />

        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}
      </div>
    </form>
  );
};

export default BidderDeliveryForm;
