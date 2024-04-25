import React from "react";

const Header = ({ setSearch, search, toggleMode }) => {
  return (
    <div className="mb-1 pt-2 px-1 sticky top-[0]  w-full ">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Country..."
        className={` ${
          toggleMode
            ? " bg-customBgLight text-darkText"
            : " bg-customBg2 text-lightText"
        } outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 transition-colors duration-200 p-2 w-full rounded-lg `}
      />
    </div>
  );
};

export default Header;
