import React from "react";

function TextAreaComponent({
  label,
  rows,
  inputError,
  inputPlaceHolder,
  inputValue,
  onChangeValue,
}) {
  return (
    <div className="mx-2">
      <h2 className="mb-1 text-sm">{label}</h2>
      <textarea
        className={`p-2 w-full rounded-sm border border-slate-500 focus:outline-neutral-700 ${
          inputError && "border-red-600 focus:outline-red-600"
        }`}
        placeholder={inputPlaceHolder}
        value={inputValue}
        onChange={(e) => onChangeValue(e.target.value)}
        rows={rows}
      />
      <h2 className="text-xs text-[#ff0000]">{inputError}</h2>
    </div>
  );
}

export default TextAreaComponent;
