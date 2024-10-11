import { MethodFormProps } from "@types";

export const MailboxForm: React.FC<
  Pick<MethodFormProps, "register" | "t" | "errors">
> = ({ register, t, errors }) => (
  <div className="flex flex-col gap-4 p-4">
    <label> {t("comments")}</label>
    <textarea
      {...register("N1")}
      className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
    />
  </div>
);
