"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  PasswordLoginFormSchema,
  PasswordLoginFormValues,
} from "@schemas/login-schema";
import InputField from "@components/shared/InputField";
import PasswordInput from "@components/shared/PasswordInput";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useState } from "react";

const PasswordLoginForm = ({ redirect }: { redirect: string }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordLoginFormValues>({
    resolver: zodResolver(PasswordLoginFormSchema),
  });

  const onSubmit = async (data: PasswordLoginFormValues) => {
    setErrorMessage(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: redirect || "/",
    });
    if (result?.error) {
      setErrorMessage(t("invalidCredentials"));
    } else if (result?.ok && result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
      {errorMessage && <p className="text-red text-sm">{errorMessage}</p>}
      <div className="text-center">
        <button
          type="submit"
          className="mt-4 md:mt-8 px-4 md:px-8 py-2 md:py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {t("loginButton")}
        </button>
      </div>
    </form>
  );
};

export default PasswordLoginForm;
