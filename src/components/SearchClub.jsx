import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchLogo, back } from "..";
import ClickAwayListener from "react-click-away-listener";

const SearchClub = ({
  setSearchClub,
  windowWidth,
  showSearch,
  handleSearchChange,
  searchClub,
  clubs,
  setShowSearch,
  handleSearchToggleClick,
  toggleSearch,
  setToggleSearch,
  toggleMode,
  focus,
  setFocus,
}) => {
  const handleClickAway = () => {
    if (focus == true) {
      // setToggleSearch(false)
    }
  };
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!refOne.current.contains(e.target) && windowWidth > 1024) {
        // setShowSearch(false);
        // setFocus(false);
        // console.log(e.target);
      }
    });
  }, []);

  // window.onclick = myFunction;

  // function myFunction(e) {
  //   console.log(e.target.id);
  //   console.log(document.getElementById('clickaway2').id);
  //   if ((e.target != document.getElementById('clickaway')) || (e.target != document.getElementById('clickaway2')) ) {
  //     console.log('yes');
  //   } else {
  //     console.log('no');
  //   }
  // }
  // console.log(refOne);

  return (
    <div
      className={`${
        toggleMode ? "text-darkText" : "text-lightText"
      } w-full relative `}
      ref={refOne}
    >
      <input
        onFocus={() => setFocus(true)}
        className={` bg-transparent outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 transition-colors duration-200 rounded-lg hidden lg:block  p-2 `}
        onChange={handleSearchChange}
        value={searchClub}
        id=""
        ref={refOne}
        placeholder="Search Teams..."
      />

      <div className="">
        <div className={`flex gap-4 items-center px-2 pt-2`}>
          <img
            src={back}
            alt=""
            className=" h-6 lg:hidden block"
            onClick={() => setToggleSearch(false)}
          />
          <input
            onFocus={() => setFocus(true)}
            className={` w-full bg-transparent block lg:hidden outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 transition-colors duration-200 rounded-lg  p-2 `}
            onChange={handleSearchChange}
            value={searchClub}
            id=""
            ref={refOne}
            placeholder="Search Teams..."
          />
        </div>
        <div className="">
          <div
            className={`${focus ? "block lg:hidden" : "hidden"} ${
              !toggleSearch && windowWidth < 1024 ? "hidden" : ""
            } ${
              toggleMode ? "bg-white" : " bg-darkCustomBg3"
            }  overflow-y-scroll scroll_bar h-[100vh] lg:h-[80vh] shadow-lg   left-[0] mt-4  lg:min-w-[350px] px-2 py-1 divide-y divide-black lg:absolute animate-dis  `}
            id="clickaway"
            ref={refOne}
          >
            {clubs &&
              clubs
                .filter((club) => club.league_name && club)
                .filter((club) =>
                  searchClub?.trim().toLowerCase() === ""
                    ? club
                    : club.league_name.toLowerCase().includes(searchClub) ||
                      club.country_name
                        .toLowerCase()
                        .includes(searchClub.toLowerCase())
                )
                .slice(6, 16)
                .map((club, index) => (
                  <div
                    key={club.league_key}
                    className=" p-2"
                    onClick={() => {
                      setFocus(false);
                      setToggleSearch(false);
                    }}
                    ref={refOne}
                  >
                    <Link
                      className="flex gap-4 items-center text-xs "
                      to={`/table/${club.league_name}/${club.league_key}`}
                    >
                      <img src={club.league_logo} alt="" className=" w-7 " />
                      <div className="flex flex-col">
                        <div>{club.league_name}</div>
                        <div className="flex items-center gap-1">
                          <img
                            src={club.country_logo}
                            className=" w-2 h-2 rounded-full"
                            alt=""
                          />
                          <span className=" opacity-70">
                            {club.country_name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            {clubs &&
              clubs
                .filter((club) => club.country_iso2 && club)
                .filter((club) =>
                  searchClub?.trim().toLowerCase() === ""
                    ? club
                    : club.country_name
                        .toLowerCase()
                        .includes(searchClub.toLowerCase())
                )
                .map((club) => (
                  <div
                    key={club.country_key}
                    className="flex gap-4 items-center p-2 last:mb-10"
                    onClick={() => {
                      setFocus(false);
                      setToggleSearch(false);
                    }}
                    id="clickaway2"
                    ref={refOne}
                  >
                    <img
                      src={club.country_logo}
                      alt=""
                      className=" w-7 h-7 rounded-full"
                    />
                    <Link
                      className=" text-xs "
                      to={`/leagues/${club.country_name}/${club.country_key}`}
                    >
                      {club.country_name}
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchClub;
