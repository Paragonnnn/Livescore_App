// import React from "react";

// const Alert = ({ alert, setAlert, alertMessage, setAlertMessage }) => {
//   return (
//     <div className={` fixed bottom-6 sm:bottom-10 left-[50%] -translate-x-[50%]`}>
//       {Object.keys(alertMessage).map((message, index) => (
//         <div
//         key={index}
//           className={`${
//            alertMessage[message] ? "visible opacity-100" : " invisible opacity-0"
//           } text-lightText text-sm sm:min-w-0 min-w-[80%] sm:text-lg bg-darkCustomBg3 z-10 outline outline-customBg2 transition-all duration-500 px-5 py-3 rounded-lg  text-center  `}
//         >
//           {message.keys}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Alert;

import React from "react";

const Alert = ({ alert, setAlert, alertMessage, setAlertMessage }) => {
  return (
    <div
      className={`fixed bottom-6 sm:bottom-10 left-[0%]  min-h-fit`}
    >
      {Object.entries(alertMessage).reverse().map(
        ([key, value], index) =>
          value &&
          (
            <div
              key={index}
              className={`${value ? ' visible opacity-100 animate-swipe' : ' opacity-0 invisible'}  
           text-lightText text-sm sm:min-w-0 min-w-[80%] sm:text-lg bg-darkCustomBg3 z-auto outline outline-customBg2 transition-all duration-500 px-5 py-3 rounded-lg text-left mt-2`}
            >
              {key}
            </div>
          ) 
      )}
    </div>
  );
};

export default Alert;
