import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import ParaScoreLogo from "../svg/ParaScoreLogo";
import ClickAwayListener from "react-click-away-listener";
import { signOut } from "firebase/auth";
import Person from "../svg/Person";
import Light from "../svg/Light";
import Dark from "../svg/Dark";
import Logout from "../svg/Logout";


const navbar = ({
  toggleMode,
  setToggleMode,
  profileToggle,
  windowWidth,
  setProfileToggle,
  ham,
}) => {
  const hamRef = useRef();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  return (
    <div>
      <div className="m-auto  max-w-[1440px]  flex items-center justify-between relative px-3 py-2 sm:py-3">
        {/* <Link  className="  outline outline-blue-600"> */}
        <Link
          to={"/"}
          className=" text-[34px] md:text-[40px] text-customBg font-bold flex items-center "
        >
          {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Santa_hat.svg"
                alt=""
                className=" h-5 md:h-8 absolute left-[-4px] md:left-[-10px] top-2 rotate-[-15deg]"
              /> */}
          <span>ParaSc</span> <ParaScoreLogo /> <span>re</span>
          {/* <button onClick={() => {sendJsonMessage({type: 'close_connection'}); console.log(readyState);}}>close</button> */}
        </Link>
        {/* </Link> */}
        <div className="px-2 ">
          {/* <img src={searchLogo} alt="" className=' h-6 w-6 block lg:hidden' onClick={handleSearchToggleClick}/> */}
          {windowWidth > 1024 && (
            <div className="">
              {/* <SearchClub
                  handleSearchToggleClick={handleSearchToggleClick}
                  toggleSearch={toggleSearch}
                  setToggleSearch={setToggleSearch}
                  searchClub={searchClub}
                  handleSearchChange={handleSearchChange}
                  setSearchClub={setSearchClub}
                  clubs={leagues.concat(countries)}
                  windowWidth={windowWidth}
                  toggleMode={toggleMode}
                  focus={focus}
                  setFocus={setFocus}
                /> */}
              {/* <SearchClub2 /> */}
              {/* <SearchPlayers /> */}
            </div>
          )}
        </div>
        <div className="flex items-center relative gap-2">
          <div className=" flex gap-2 items-center">
            <Link
              to={"/signin"}
              className={`${
                auth?.currentUser ? "hidden" : "block"
              } border border-solid text-base px-2 md:px-3 md:py-1 py-[4px] rounded-md hover:bg-customBg hover:text-lightText transition-colors duration-200 flex items-center md:gap-2 gap-1 hover:fill-white ${
                toggleMode
                  ? "text-darkText bg-customBgLight border-gray-400  fill-black"
                  : "text-lightText bg-customBg2 fill-white border-gray-700"
              }`}
            >
              <Person toggleMode={toggleMode} />
              Log in
            </Link>
            {/* <Link
                to={"/signup"}
                className={`${
                  auth?.currentUser ? "hidden" : "block"
                } bg-customBg text-xxs md:text-base px-1 md:px-2 md:py-1 py-[2px] rounded-md text-lightText`}
              >
                Sign Up
              </Link> */}
          </div>
          {auth.currentUser && (
            <button
              className={`${
                toggleMode
                  ? "sm:bg-customBgLight"
                  : "sm:bg-customBg2 text-lightText"
              } flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer hover:opacity-90 active:opacity-70 bg-none`}
              onClick={() => setProfileToggle((toggle) => !toggle)}
              id={`${profileToggle ? "profile-pic" : ""}`}
            >
              {/* <div className="hidden sm:block">
                {auth?.currentUser?.displayName
                  ? auth?.currentUser?.displayName.split(" ")[0]
                  : auth?.currentUser?.email}
              </div> */}
              {
                auth?.currentUser?.photoURL ? (
                  <img
                    src={auth.currentUser.photoURL}
                    className=" sm:h-9 sm:w-9 h-8 w-8 rounded-full cursor-pointer"
                    id="profile-pic"
                  />
                ) : auth?.currentUser?.email ? (
                  <div className=" h-7 w-7 bg-customBg flex items-center justify-center text-lg font-bold rounded-full text-lightText cursor-pointer">
                    {auth.currentUser.email.slice(0, 1).toUpperCase()}
                  </div>
                ) : (
                  <></>
                )
                // <div>{auth.currentUser.photoURL}</div>
              }
            </button>
          )}
          <ClickAwayListener
            onClickAway={(e) => {
              if (profileToggle === true && e.target.id !== "profile-pic")
                setProfileToggle(false);
              else if (profileToggle === false && e.target.id === "profile-pic")
                setProfileToggle(true);
            }}
          >
            <nav
              className={`${
                profileToggle ? "block" : "hidden"
              } absolute -bottom-24 right-2 bg-darkCustomBg3 px-3 py-5 text-white rounded-lg z-10 w-48 `}
            >
              <ul className=" divide-y divide-gray-400 divide-opacity-20">
                <li className=" px-1 py-2">
                  <Link to={"/favourites"} >
                    Favourites
                  </Link>
                </li>
                <li onClick={handleSignOut} className=" px-1 py-2 flex gap-1">
                  <Logout />
                  Logout
                </li>
              </ul>
            </nav>
          </ClickAwayListener>
          <div className=" relative pr-2 hidden">
            {/* <HamburgerMenu ham={ham} setHam={setHam} toggleMode={toggleMode}/> */}
            <div
              className={`${
                ham ? "block" : "hidden"
              } absolute right-0 -bottom-14 md:-bottom-20  w-48 flex flex-col items-start p-2 gap-2 backdrop-blur-sm rounded-lg divide-y ${
                toggleMode
                  ? "border border-solid border-customBgLight text-darkText divide-customBgLight"
                  : "border border-solid border-customBg2 text-lightText divide-customBg2"
              }`}
              ref={hamRef}
            >
              <button
                className={`
                  cursor-pointer w-full`}
                onClick={() => setToggleMode((prev) => !prev)}
                ref={hamRef}
              >
                {/* <img
              src={`${toggleMode ? darkMode : lightMode}`}
              alt=""
              className={`  h-7 w-7`}
            /> */}
                {toggleMode ? (
                  <div
                    className=" flex items-center justify-between"
                    ref={hamRef}
                  >
                    <div>Dark Mode </div>
                    <Dark />
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-between"
                    ref={hamRef}
                  >
                    <div ref={hamRef}>Light Mode </div>
                    <Light />
                  </div>
                )}
              </button>
              {auth.currentUser && (
                <button
                  onClick={handleSignOut}
                  className=" w-full flex justify-start"
                  ref={hamRef}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
