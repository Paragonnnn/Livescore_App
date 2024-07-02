import React from "react";

const Alert = ({ alert, setAlert, alertMessage, setAlertMessage }) => {
  return (
    <div
      className={`${
        alert ? "visible translate-y-[0]" : " invisible -translate-y-[100%]"
      } text-lightText text-lg bg-customBg2 transition-all duration-500 px-5 py-3 rounded-lg absolute bottom-10 left-[50%] -translate-x-[50%]`}
    >
      {alertMessage}
    </div>
  );
};

export default Alert;
