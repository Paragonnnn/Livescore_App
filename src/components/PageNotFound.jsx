import React from "react";
import PNFSvg from "../svg/PNFSvg";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white ">
      <PNFSvg />
      <h1 className="text-3xl font-bold text-center">Page Not Found</h1>
    </div>
  );
};

export default PageNotFound;
