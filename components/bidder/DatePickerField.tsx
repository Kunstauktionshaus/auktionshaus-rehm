import React from "react";
import DatePicker from "react-datepicker";
import { isMonday, isWeekend, startOfToday } from "date-fns";
import { de, enGB } from "date-fns/locale";
import { useLocale } from "next-intl";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFieldProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  selectedDate,
  onChange,
  placeholderText,
}) => {
  const currentLocale = useLocale();
  const locale = currentLocale === "de" ? de : enGB;

  const filterDates = (date: Date) => {
    const today = startOfToday();
    return date >= today && !isWeekend(date) && !isMonday(date);
  };

  return (
    <DatePicker
      required
      selected={selectedDate}
      onChange={onChange}
      locale={locale}
      filterDate={filterDates}
      placeholderText={placeholderText}
      className="w-full border border-sky-blue rounded bg-sky-blue-back p-2"
    />
  );
};

export default DatePickerField;
