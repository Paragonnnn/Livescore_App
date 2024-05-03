import React, { useState } from "react";

const HamburgerMenu = ({ham,setHam,toggleMode}) => {
  

  const openHam = () => {
    setHam((prev) => !prev);
  };
  return (
    <div
      className={` h-6 w-6 flex flex-col justify-between cursor-pointer p-1 rounded-md ${toggleMode ? 'bg-customBgLight' : 'bg-customBg2'}`}
      onClick={openHam}
    >
      <div
        className={`${
          ham ? "rotate-45 origin-left w-[30px]" : ""
        } w-full h-[2px] bg-gray-400 transition-transform duration-500 origin-left`}
      ></div>
      <div
        className={`${
          ham ? "opacity-0" : " opacity-100"
        } w-full h-[2px] bg-gray-400 transition-opacity duration-500`}
      ></div>
      <div
        className={`${
          ham ? "-rotate-45 origin-left w-[30px]" : ""
        } w-full h-[2px] bg-gray-400 transition-transform duration-500 origin-left`}
      ></div>
    </div>
  );
};

export default HamburgerMenu;
