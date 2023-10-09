import React from "react";

function AlertComponent({
  title,
  message,
  instruction,
  handleOnCloseModal,
  buttonBackground = "green-600",
  background = "bg-red-600",
}) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-300">
      <div className="relative w-1/2 h-1/3 mx-auto mt-28 bg-white shadow-xl rounded-md">
        <h2
          className={`p-2 underline text-center font-bold font-serif text-xl text-white ${background}`}
        >
          {title}
        </h2>

        <h2 className="p-4 mt-6 text-center">{message}</h2>
        <h2 className="p-4 text-center text-orange-600 font-semibold font-serif">
          {instruction}
        </h2>
        <div className="">
          <button
            className={`px-12 py-1 absolute bottom-0 right-0 m-4 border-2 font-bold font-serif text-lg text-white ${
              "bg-" + buttonBackground
            } rounded-full ${"border-" + buttonBackground} hover:bg-white ${
              "hover:text-" + buttonBackground
            } duration-500 focus:outline-none`}
            onClick={handleOnCloseModal}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertComponent;
