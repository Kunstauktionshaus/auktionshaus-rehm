"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  CodeLoginFormSchema,
  CodeLoginFormValues,
} from "@schemas/login-schema";
import InputField from "@components/InputField";
import PasswordInput from "@components/PasswordInput";
import { useTranslations } from "next-intl";

const CodeLoginPage = () => {
  const t = useTranslations("Auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeLoginFormValues>({
    resolver: zodResolver(CodeLoginFormSchema),
  });

  const onSubmit = async (data: CodeLoginFormValues) => {
    try {
      const response = await fetch(`/api/customer/loginWithCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      console.log(result);
    } catch (error: any) {
      console.error(error);
    }
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
        <InputField
          label={t("code")}
          name="code"
          type="text"
          register={register("code")}
          error={errors.code}
        />
        <PasswordInput
          label={t("createPassword")}
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

export default CodeLoginPage;
