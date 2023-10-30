import React from "react";

function FileInputComponent({ label, onChangeValue, inputError }) {
  return (
    <div className="mx-2">
      <h2 className="mb-1 text-sm">{label}</h2>
      <input
        className={`p-2 w-full rounded-sm border border-slate-500 focus:outline-blue-600 ${
          inputError && "border-red-600 focus:outline-red-600"
        }`}
        onChange={(e) => onChangeValue(e.target.files[0])}
        type="file"
        accept=".pdf"
      />
      <h2 className="text-xs text-[#ff0000]">{inputError}</h2>
    </div>
  );
}

export default FileInputComponent;
