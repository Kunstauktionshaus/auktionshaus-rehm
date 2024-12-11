"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="w-full">
      <div className="inline-box" ref={selectRef}>
        <div className="flex flex-col gap-2">
          {label && (
            <label className="text-lg font-semibold font-montserrat">
              {label}:
            </label>
          )}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="w-full flex justify-between items-center bg-white border border-gray-300  px-4 py-2 text-left cursor-pointer focus:outline-none"
            >
              {selectedOption ? selectedOption.label : placeholder}
              <span className="w-4 h-full flex items-center">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-gray-500"
                />
              </span>
            </div>
            {isOpen && (
              <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 max-h-60 overflow-auto">
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${
                      value === option.value ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
