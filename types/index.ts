import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { ConditionalFormValues } from "@schemas/zod";

export interface MethodFormProps {
  register: UseFormRegister<ConditionalFormValues>;
  setValue: UseFormSetValue<ConditionalFormValues>;
  watch: UseFormWatch<ConditionalFormValues>;
  errors: FieldErrors<ConditionalFormValues>;
  t: (key: string) => string;
}
