import React from "react";
import { useState } from "react";

export default function TextInputComponent({
  label,
  placeholder,
  value,
  onChangeValue,
  type,
  errorMsg,
  minLength,
  maxLength,
  mandatory,
  validationType = "text",
}) {
  const [displayError, setDisplayError] = useState(false);

  // Validate Text Input
  const validateTextInput = (e) => {
    onChangeValue(e.target.value);
    if (
      e.target.value?.trim()?.length < minLength ||
      e.target.value?.trim()?.length > maxLength
    ) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  };

  // Validate Email Input
  const validateEmailInput = (e) => {
    onChangeValue(e.target.value);
    if (
      e.target.value &&
      (e.target.value?.trim()?.length < minLength ||
        !e.target.value?.includes("@") ||
        e.target.value?.includes(" ") ||
        !e.target.value?.includes("."))
    ) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  };

  // Validate Alternate Mobile No.
  const validateAlternateMobileInput = (e) => {
    onChangeValue(e.target.value);
    if (
      e.target.value &&
      (e.target.value?.trim()?.length < minLength ||
        e.target.value?.trim()?.length > maxLength)
    ) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  };

  return (
    <div className={`mx-2 mt-4`}>
      <div
        className={`shadow-sm shadow-gray-400 rounded-sm ${
          displayError && "border-red-400"
        }`}
      >
        <h2 className="mb-1 text-sm">
          {label}
          {mandatory && (
            <sup className="ml-0.5 text-[#ff0000] ">{'\u2605'}</sup>
          )}
        </h2>

        {validationType === "text" && (
          <input
            className="p-2 w-full rounded-sm border border-slate-500 focus:outline-sky-600"
            placeholder={placeholder}
            value={value}
            onChange={(e) => validateTextInput(e)}
            type={type}
          />
        )}

        {validationType === "alternateMobile" && (
          <input
            className="p-2 w-full rounded-sm border border-slate-500 focus:outline-sky-600"
            placeholder={placeholder}
            value={value}
            onChange={(e) => validateAlternateMobileInput(e)}
            type={type}
          />
        )}

        {validationType === "email" && (
          <input
            className="p-2 w-full rounded-sm border border-slate-500 focus:outline-sky-600"
            placeholder={placeholder}
            value={value}
            onChange={(e) => validateEmailInput(e)}
            type={type}
          />
        )}
      </div>

      {displayError && errorMsg && (
        <h2 className="mt-1 w-full text-xs text-red-600">
          <i className="mr-1 bi-exclamation-circle-fill" />
          {errorMsg}
        </h2>
      )}
    </div>
  );
}
