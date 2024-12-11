"use client";

import InputField from "@components/shared/InputField";
import PasswordInput from "@components/shared/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  RegisterFormValues,
} from "@schemas/register-schema";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Country } from "country-state-city";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({ redirect }: { redirect: string }) => {
  const [isCompany, setIsCompany] = useState(false);
  const [showAddress2, setShowAddress2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const countryData = Country.getAllCountries();

  const t = useTranslations("Auth");
  const {
    control,
    register,
    handleSubmit,
    setValue,
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
        document.body.style.overflow = "";
        router.push(
          `/verify-email?email=${encodeURIComponent(
            data.email,
          )}&redirect=${encodeURIComponent(redirect)}`,
        );
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
    <>
      {error && <p className="text-red">{error}</p>}
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col sm:flex-row gap-2">
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
              onChange={() => {
                setIsCompany(false);
                setValue("company", "");
                setValue("iban", "");
              }}
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
              name="company"
              type="text"
              register={register("company")}
              error={errors.company}
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
        <div className="w-full relative">
          <InputField
            label={t("address")}
            name="address"
            type="text"
            register={register("address")}
            error={errors.address}
          />
          <button
            type="button"
            onClick={() => setShowAddress2(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {!showAddress2 && (
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-teal" />
            )}
          </button>
        </div>
        {showAddress2 && (
          <InputField
            label={`${t("address")} 2`}
            name="address2"
            type="text"
            register={register("address2")}
            error={errors.address2}
          />
        )}

        <div className="w-full flex gap-4">
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
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <div className="w-full flex flex-col gap-2">
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                  name="country"
                  instanceId="country-select"
                  options={countryData.map((country) => ({
                    value: `${country.isoCode}-${country.name}`,
                    label: `${country.flag} ${country.name}`,
                  }))}
                  onChange={(option) => {
                    field.onChange(option?.value);
                  }}
                  getOptionLabel={(e) => e.label}
                  placeholder={t("country")}
                  isSearchable
                  isClearable
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isDisabled ? "#C7D9E526" : "white",
                      borderColor: state.isFocused ? "#567c8d" : "#C7D9E5",
                      borderWidth: "1px",
                      padding: "2px",
                      outline: state.isFocused ? "1px solid #567c8d" : "none",
                      "&:hover": {
                        borderColor: "#C7D9E5",
                      },
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      color: "#567c8d",
                    }),
                  }}
                />
              )}
            />
          </div>
          {errors.country && (
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 items-center">
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
          <div className="flex gap-1 items-center">
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
                href="/terms"
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
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 md:mt-8 px-4 md:px-8 py-2 md:py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t("registerButton")}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
