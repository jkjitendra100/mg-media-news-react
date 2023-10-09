import React from "react";

function DataComponent({ label, data, dataType, docUrl }) {
  return (
    <div className="m-2">
      <h2 className="p-1 pb-0 mt-0.5 text-slate-500 text-xs">{label}</h2>
      {!dataType && (
        <h2 className="p-1 pb-0 capitalize border-b border-gray-300 text-base">
          {data ? data : "N/A"}
        </h2>
      )}

      {dataType === "amount" && (
        <h2 className="p-1 pb-0 capitalize border-b border-gray-300 text-base">
          {"Rs: " + parseFloat(data)?.toLocaleString("en-IN")}
        </h2>
      )}

      {dataType === "days" && (
        <h2 className="p-1 pb-0 capitalize border-b border-gray-300 text-base">
          {parseFloat(data)?.toLocaleString("en-IN") + " Days"}
        </h2>
      )}

      {dataType === "file" && (
        <a href={docUrl} target="_blank">
          <h2 className="p-1 pb-0 w-full border-b border-gray-300 text-base text-blue-600 hover:bg-blue-100 rounded-t-md duration-500">
            {data ? (
              data
            ) : (
              <span className="text-slate-500">No Document Uploaded</span>
            )}
          </h2>
        </a>
      )}
    </div>
  );
}

export default DataComponent;
