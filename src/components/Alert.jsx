import React from "react";

const Alert = ({ alert, setAlert, alertMessage, setAlertMessage }) => {
  return (
    <div
      className={`${
        alert ? "visible opacity-100" : " invisible opacity-0"
      } text-lightText text-sm sm:min-w-0 min-w-[80%] sm:text-lg bg-darkCustomBg3 outline outline-customBg2 transition-all duration-500 px-5 py-3 rounded-lg fixed bottom-6 text-center sm:bottom-10 left-[50%] -translate-x-[50%]`}
    >
      {alertMessage}
    </div>
  );
};

export default Alert;
