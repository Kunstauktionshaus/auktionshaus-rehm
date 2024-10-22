"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  PasswordLoginFormSchema,
  PasswordLoginFormValues,
} from "@schemas/login-schema";
import InputField from "@components/InputField";
import PasswordInput from "@components/PasswordInput";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";

const PasswordLoginPage = () => {
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordLoginFormValues>({
    resolver: zodResolver(PasswordLoginFormSchema),
  });

  const onSubmit = async (data: PasswordLoginFormValues) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    // try {
    //   const response = await fetch(`/api/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const result = await response.json();

    //   console.log(result);
    // } catch (error: any) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={t("email")}
          name="email"
          type="email"
          register={register("email")}
          error={errors.email}
        />
        <PasswordInput
          label={t("password")}
          name="password"
          register={register("password")}
          error={errors.password}
        />
        <div className="text-center">
          <button
            type="submit"
            className=" mt-4 px-8 py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("loginButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordLoginPage;
