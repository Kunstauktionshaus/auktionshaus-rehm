"use client";

import InputField from "@components/InputField";
import PasswordInput from "@components/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  RegisterFormValues,
} from "@schemas/register-schema";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactFlagsSelect from "react-flags-select";
import { useForm, Controller } from "react-hook-form";

const RegisterForm = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const t = useTranslations("Auth");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        const resp = await res.json();
        setError(resp.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.message || "Server error");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-16 p-4 font-montserrat">
      {error && <p className="text-red">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={t("name")}
          name="name"
          type="text"
          register={register("name")}
          error={errors.name}
        />
        <InputField
          label={t("surname")}
          name="surname"
          type="text"
          register={register("surname")}
          error={errors.surname}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="birthday">{t("birthday")}</label>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => (
              <DatePicker
                id="birthday"
                className="w-full border border-sky-blue rounded bg-sky-blue-back p-2"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd.MM.yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="DD.MM.YYYY"
              />
            )}
          />
        </div>
        <InputField
          label={t("email")}
          name="email"
          type="email"
          register={register("email")}
          error={errors.email}
        />
        <InputField
          label={t("phone")}
          name="phone"
          type="text"
          register={register("phone")}
          error={errors.phone}
        />

        <div className="w-full flex gap-4 items-center justify-center">
          <label htmlFor="privat" className="flex items-center gap-2">
            <input
              name="type"
              id="privat"
              type="radio"
              value="privat"
              onChange={() => setIsCompany(false)}
              defaultChecked={!isCompany}
            />
            {t("privateUser")}
          </label>
          <label htmlFor="company" className="flex items-center gap-2">
            <input
              name="type"
              id="company"
              type="radio"
              value="company"
              onChange={() => setIsCompany(true)}
            />
            {t("company")}
          </label>
        </div>

        {isCompany && (
          <>
            <InputField
              label={t("company")}
              name="firma"
              type="text"
              register={register("firma")}
              error={errors.firma}
            />
            <InputField
              label={t("iban")}
              name="iban"
              type="text"
              register={register("iban")}
              error={errors.iban}
            />
          </>
        )}

        <InputField
          label={t("address")}
          name="street"
          type="text"
          register={register("street")}
          error={errors.street}
        />
        <InputField
          label={t("postalCode")}
          name="plz"
          type="text"
          register={register("plz")}
          error={errors.plz}
        />
        <InputField
          label={t("city")}
          name="city"
          type="text"
          register={register("city")}
          error={errors.city}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="countryCode">{t("country")}</label>
          <Controller
            control={control}
            name="countryCode"
            render={({ field }) => (
              <ReactFlagsSelect
                id="countryCode"
                selected={field.value}
                onSelect={(code) => field.onChange(code)}
                placeholder={t("selectCountry")}
                searchable
                searchPlaceholder={t("searchCountry")}
                selectedSize={14}
                className="w-full rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
              />
            )}
          />
          {errors.countryCode && (
            <span className="text-xs text-red">{t("required")}</span>
          )}
        </div>

        <PasswordInput
          label={t("createPassword")}
          name="password"
          register={register("password")}
          error={errors.password}
        />
        <PasswordInput
          label={t("confirmPassword")}
          name="confirmPassword"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />
        <div className="flex items-center mb-4">
          <input
            {...register("privacyPolicy")}
            type="checkbox"
            name="privacyPolicy"
            id="privacyPolicy"
            className="w-4 h-4 text-black border-teal focus:ring-teal dark:focus:ring-teal dark:ring-offset-black dark:bg-teal dark:border-teal"
          />
          <label htmlFor="privacyPolicy" className="ml-3 text-sm">
            {t("iHaveRead")}{" "}
            <Link
              href="#"
              className="text-teal text-sm border-b border-transparent hover:border-teal transition-border duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("privacyPolicy")}
            </Link>{" "}
            {t("agreePrivacyPolicy")}
          </label>
        </div>
        {errors.privacyPolicy && (
          <span className="text-xs text-red">{t("required")}</span>
        )}
        <div className="flex items-center mb-4">
          <input
            {...register("terms")}
            type="checkbox"
            name="terms"
            id="terms"
            className="w-4 h-4 text-black border-teal focus:ring-teal dark:focus:ring-teal dark:ring-offset-black dark:bg-teal dark:border-teal"
          />
          <label htmlFor="terms" className="ml-3 text-sm">
            {t("iHaveRead")}{" "}
            <Link
              href="#"
              className="text-teal text-sm border-b border-transparent hover:border-teal transition-border duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("terms")}
            </Link>{" "}
            {t("agreeTerms")}
          </label>
        </div>
        {errors.terms && (
          <span className="text-xs text-red">{t("required")}</span>
        )}

        <div className="text-center">
          <button
            type="submit"
            className=" mt-4 px-8 py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("registerButton")}
          </button>
          <div className="text-center">
            <p className="text-sm mt-10">{t("haveAccount")}</p>
            <Link
              href="/login"
              className="text-teal text-sm border-b border-transparent hover:border-teal transition-border duration-300 ease-in-out"
            >
              {t("clickHere")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
