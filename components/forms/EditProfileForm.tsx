"use client";

import InputField from "@components/shared/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";
import {
  EditProfileFormSchema,
  EditProfileFormValues,
} from "@schemas/edit-profile-schema";
import { Country } from "country-state-city";
import Select from "react-select";
import axios from "axios";

const EditProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { update } = useSession();
  const [initialData, setInitialData] = useState<EditProfileFormValues | null>(
    null,
  );

  const countryData = Country.getAllCountries();
  const t = useTranslations("Auth");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: initialData || undefined,
  });

  useEffect(() => {
    const loadSessionData = async () => {
      const session = await getSession();
      if (session?.user) {
        const country = countryData.find(
          (c) => c.name === session.user.mainAddress.country,
        );

        const userData = {
          name: session.user.name || "",
          surname: session.user.surname || "",
          email: session.user.email || "",
          phone: session.user.phone || "",
          company: session.user.company || "",
          iban: session.user.iban || "",
          mainAddress: {
            address: session.user.mainAddress.address || "",
            address2: session.user.mainAddress.address2 || "",
            plz: session.user.mainAddress.plz || "",
            city: session.user.mainAddress.city || "",
            country: `${country?.isoCode}-${country?.name}` || "",
          },
        };
        setInitialData(userData);
        reset(userData);
      }
    };

    loadSessionData();
  }, [reset, update, countryData]);

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      const response = await axios.put("/api/customer/update-address", {
        formData: data,
      });

      if (response.status === 200) {
        const [, countryName] = data.mainAddress.country.split("-");
        await update({
          company: { ...data.company },
          mainAddress: { ...data.mainAddress, country: countryName },
        });
        console.log("Profile updated:", data);
      } else {
        console.error("Update failed:", response.data);
      }
    } catch (error: any) {
      console.error("Error during update:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    reset(initialData || {});
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {error && <p className="text-red">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <p>Personal Info</p>
        <div className="w-full flex gap-4">
          <InputField
            label={t("name")}
            name="name"
            type="text"
            register={register("name")}
            error={errors.name}
            disabled
          />
          <InputField
            label={t("surname")}
            name="surname"
            type="text"
            register={register("surname")}
            error={errors.surname}
            disabled
          />
        </div>

        <InputField
          label={t("email")}
          name="email"
          type="email"
          register={register("email")}
          error={errors.email}
          disabled
        />
        <p>Company</p>
        <div className="flex gap-4">
          <InputField
            label={t("company")}
            name="company.companyName"
            type="text"
            register={register("company.companyName")}
            error={errors.company?.companyName}
            disabled={!isEditing}
          />
          <InputField
            label={t("iban")}
            name="company.iban"
            type="text"
            register={register("company.iban")}
            error={errors.company?.iban}
            disabled={!isEditing}
          />
        </div>

        <p>Main Address</p>
        <InputField
          label={t("address")}
          name="mainAddress.address"
          type="text"
          register={register("mainAddress.address")}
          error={errors.mainAddress?.address}
          disabled={!isEditing}
        />

        <InputField
          label={`${t("address")} 2`}
          name="mainAddress.address2"
          type="text"
          register={register("mainAddress.address2")}
          error={errors.mainAddress?.address2}
          disabled={!isEditing}
        />

        <div className="w-full flex gap-4">
          <InputField
            label={t("postalCode")}
            name="mainAddress.plz"
            type="text"
            register={register("mainAddress.plz")}
            error={errors.mainAddress?.plz}
            disabled={!isEditing}
          />
          <InputField
            label={t("city")}
            name="mainAddress.city"
            type="text"
            register={register("mainAddress.city")}
            error={errors.mainAddress?.city}
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <div className="w-full flex flex-col gap-2">
            <Controller
              control={control}
              name="mainAddress.country"
              render={({ field }) => (
                <Select
                  name="mainAddress.country"
                  instanceId="country-select"
                  options={countryData.map((country) => ({
                    value: `${country.isoCode}-${country.name}`,
                    label: `${country.flag} ${country.name}`,
                  }))}
                  value={
                    field.value
                      ? { value: field.value, label: field.value.split("-")[1] }
                      : null
                  }
                  onChange={(option) => {
                    field.onChange(option?.value);
                  }}
                  getOptionLabel={(e) => e.label}
                  placeholder={t("country")}
                  isSearchable
                  isClearable
                  isDisabled={!isEditing}
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
                    singleValue: (baseStyles, state) => ({
                      ...baseStyles,
                      color: state.isDisabled ? "#567c8d" : "black",
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
          {errors.mainAddress?.country && (
            <span className="text-xs text-red">{t("required")}</span>
          )}
        </div>

        <InputField
          label={t("phone")}
          name="phone"
          type="text"
          register={register("phone")}
          error={errors.phone}
          disabled={!isEditing}
        />

        <div className="text-center">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="mt-4 md:mt-8 px-4 md:px-8 py-2 md:py-4 text-white bg-teal uppercase rounded"
            >
              {/* {t("editButton")} */}Edit
            </button>
          ) : (
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 md:px-8 py-2 md:py-4 text-gray-700 bg-gray-200 uppercase rounded"
              >
                {/* {t("cancelButton")} */}Cancel
              </button>
              <button
                type="submit"
                className="px-4 md:px-8 py-2 md:py-4 text-white bg-teal uppercase rounded"
              >
                {/* {t("saveButton")} */}
                Save
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
