import React, { useState, useEffect, useRef } from "react";
import Countries from "./components/Countries";
import Leagues from "./components/Leagues";
import {
  Link,
  useRoutes,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Teams from "./team/Teams";
import Table from "./components/Table";
import Fixtures from "./components/Fixtures";
import Players from "./components/Players";
import CurrentFixtures from "./components/CurrentFixtures";
import SearchClub from "./components/SearchClub";
import parseISO from "date-fns/parseISO";
import { addDays, format, addMonths, set } from "date-fns";
import Calendar from "react-calendar";
import { calendar, darkMode, lightMode, searchLogo } from ".";
import ParaScoreLogo from "./svg/ParaScoreLogo";
import Dark from "./svg/Dark";
import Light from "./svg/Light";
import useWebSocket from "react-use-websocket";
import { inject } from "@vercel/analytics";
import SignIn from "./components/Authentication/SignIn";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import SignUp from "./components/Authentication/SignUp";
import ClickAwayListener from "react-click-away-listener";
import HamburgerMenu from "./components/HamburgerMenu";

inject();

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingFixtures, setLoadingFixtures] = useState(false);
  const [error, setError] = useState(false);
  const [fixturesError, setFixturesError] = useState();
  const [leagues, setLeagues] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [newFixtures, setNewFixtures] = useState([]);
  const [check, setCheck] = useState([]);
  const [reCheck, setReCheck] = useState([]);
  const [liveCheck, setLiveCheck] = useState([]);
  const [currentFixture, setCurrentFixture] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchClub, setSearchClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);
  const [focus, setFocus] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [ham, setHam] = useState(false);

  const api_key = import.meta.env.VITE_api_key;
  const socketUrl = `wss://wss.allsportsapi.com/live_events?APIkey=${api_key}`;
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    // onOpen: () => console.log(lastJsonMessage, lastMessage),
    //Will attempt to reconnect on all close events, such as server shutting down
  });

  //sign out
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

  useEffect(() => {
    if (lastJsonMessage !== null && fixtures) {
      // console.log(lastJsonMessage);

      // console.log([lastJsonMessage.map((l) => l.event_key)]);
      fixtures.map((f) => {
        // console.log(lastJsonMessage.find(l => l.event_key === f.event_key))
        function replaceItems(fixtures, lastJsonMessage) {
          return fixtures.map((f) => {
            // Check if there is a matching ID in the lastJsonMessage
            let replacementItem = lastJsonMessage.find(
              (l) => l.event_key === f.event_key
            );

            // If there is a match, use the replacement item, otherwise use the original item
            return replacementItem ? replacementItem : f;
          });
        }

        // Use the function to get the updated array
        let updatedArray = replaceItems(fixtures, lastJsonMessage);

        // console.log(updatedArray);
        return setFixtures(updatedArray);
      });
    }
    // setNewFixtures([lastJsonMessage.map((l) => l.event_key)]);
  }, [lastJsonMessage]);

  useEffect(() => {
    setLiveCheck(
      fixtures?.map(
        (fixture) =>
          // !check.includes(fixture.league_key) &&
          fixture.event_live === "1" &&
          fixture.event_status !== "Finished" &&
          fixture.league_key
      )
    );
    console.log(fixtures);
    console.log(check);
    console.log(
      fixtures?.map(
        (fixture) =>
          // !check.includes(fixture.league_key) &&
          fixture.event_live === "1" &&
          fixture.event_status !== "Finished" &&
          fixture.league_key
      )
    );
  }, [lastJsonMessage]);

  const { id } = useParams();
  // const history = useNavigate()
  // const {pathname} = useLocation()
  document.querySelector("body").style.backgroundColor = `${
    toggleMode ? "#F7F7FF" : "#031525"
  }`;
  // console.log(document.querySelector("body"));
  const date = new Date();
  // const newDate = format(date, 'MM-dd-yyyy')
  // console.log(date);
  // const newDate2 = newDate
  const [calenderDate, setCalenderDate] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(windowWidth);
  // console.log(focus);

  const handleDateChange = (date) => {
    // console.log(date);
    setCalenderDate(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    // console.log(date.toISOString().split("T")[0]);
    // console.log(
    //   `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    // );
    setShowCalendar(false);
    if (new Date() == new Date(calenderDate)) {
    }
    // history(`/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    // console.log(new Date(calenderDate));

    setCheck([]);
    // console.log("hi");
    // console.log(fixtures);
  };
  const handleDateFocus = (e) => {
    // e.key && e.code === "Backspace" && e.preventDefault();
    !isNaN(e.key) && e.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchClub(e.target.value);
  };

  const handleSearchToggleClick = () => {
    setToggleSearch((prev) => !prev);
    if (!toggleSearch) {
      setSearchClub("");
    }
    setFocus(true);
  };

  useEffect(() => {
    setLoadingCountries(true);
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setError(false);
          setCountries(json.result);
          setClubs(json.result);
          setLoadingCountries(false);
          // console.log(json.result);
        })
        .catch((err) => {
          setLoadingCountries(false);
          setError(true);
          // console.log(err);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    setLoadingLeagues(true);
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setError(false);
          setLoadingLeagues(false);
          setLeagues(json.result);
          // console.log(json.result);
        })
        .catch((err) => {
          // console.log(err);
          // console.log("errors");
          setError(true);
          setLoadingLeagues(false);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      setLoadingFixtures(true);
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Fixtures&timezone=Africa/Lagos&APIkey=${api_key}&from=${calenderDate}&to=${calenderDate}`
      )
        .then((res) => res.json())
        .then((json) => {
          setFixtures(json.result);
          // console.log(json.result);
          setLoadingFixtures(false);
          setCurrentFixture(json.result.slice(0, 1));
          setCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) && fixture.league_key
            )
          );
          // setReCheck(
          //   json.result.map(
          //     (fixture) =>
          //       !check.includes(fixture.league_key) && fixture.league_key
          //   )
          // )
          setLiveCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) &&
                fixture.event_live === "1" &&
                fixture.event_status !== "Finished" &&
                fixture.league_key
            )
          );

          // console.log(
          //   json.result.map(
          //     (fixture) =>
          //       !check.includes(fixture.league_key) &&
          //       fixture.event_live === "1" &&
          //       fixture.event_status !== "Finished" &&
          //       fixture.league_key
          //   )
          // );
          // console.log(liveCheck);
          //   console.log(
          //     json.result.map(
          //       (fixture) =>
          //         !check.includes(fixture.league_key) && fixture.league_key
          //     )
          //   );
        })
        .catch((err) => {
          setLoadingFixtures(false);
          setFixturesError(true);
          // console.log(err);
        });
    }
    // const timeoutId = setTimeout(getData(), 2000);

    // Clean up the timer when the component unmounts
    // return () => {
    //   clearTimeout(timeoutId);
    // };
    getData();
    // setCheck([])
  }, [calenderDate, history]);

  // useEffect(() => {
  //   async function getData() {
  //     await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=&APIkey=${api_key}`)
  //   }
  // })

  return (
    <div className={`${toggleMode ? "bg-customBg3" : "bg-darkCustomBg3"} `}>
      {/* <Notifications /> */}
      <div
        className={`${
          toggleMode
            ? "bg-customBg3 shadow-light"
            : "bg-darkCustomBg3 shadow-sm"
        }   w-full  sticky top-[-2px] rounded-b-xl z-50`}
      >
        <div className="m-auto  max-w-[1440px]  flex items-center justify-between relative">
          <Link to={"/"}>
            <h3 className="text-[25px] md:text-[40px] px-2 md:px-4 py-1 sm:py-2 mb-2 text-customBg font-bold flex items-center">
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Santa_hat.svg"
                alt=""
                className=" h-5 md:h-8 absolute left-[-4px] md:left-[-10px] top-2 rotate-[-15deg]"
              /> */}
              <span>ParaSc</span> <ParaScoreLogo /> <span>re</span>
            </h3>
          </Link>
          <div className="px-2 ">
            {/* <img src={searchLogo} alt="" className=' h-6 w-6 block lg:hidden' onClick={handleSearchToggleClick}/> */}
            {windowWidth > 1024 && (
              <div className="">
                <SearchClub
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
                />
              </div>
            )}
          </div>
          <div className="flex items-center relative gap-2">
            <div className=" flex gap-2 items-center">
              <Link
                to={"/signin"}
                className={`${
                  auth?.currentUser ? "hidden" : "block"
                } border border-solid border-customBg px-2 py-1 rounded-lg hover:bg-customBg hover:text-lightText transition-colors duration-200 ${
                  toggleMode ? "text-darkText" : "text-lightText"
                }`}
              >
                Log in
              </Link>
              <Link
                to={"/signup"}
                className={`${
                  auth?.currentUser ? "hidden" : "block"
                } bg-customBg px-2 py-1 rounded-lg text-lightText`}
              >
                Sign Up
              </Link>
            </div>
            {auth.currentUser && (
              <button
                className={`${
                  toggleMode
                    ? "bg-customBgLight"
                    : "bg-customBg2 text-lightText"
                } flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer hover:opacity-90 active:opacity-70`}
                onClick={() => setProfileToggle((toggle) => !toggle)}
              >
                <div>
                  {auth?.currentUser?.displayName
                    ? auth?.currentUser?.displayName.split(" ")[0]
                    : auth?.currentUser?.email}
                </div>
                {
                  auth?.currentUser?.photoURL ? (
                    <img
                      src={auth.currentUser.photoURL}
                      className=" h-7 w-7 rounded-full cursor-pointer"
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
              onClickAway={() => {
                if (profileToggle === false) setProfileToggle(false);
              }}
            >
              <div
                className={`${
                  profileToggle ? "block" : "hidden"
                } absolute -bottom-10 right-0`}
              >
                drop
              </div>
            </ClickAwayListener>
            <div className=" relative ">
              <HamburgerMenu ham={ham} setHam={setHam} />
              <div
                className={`${
                  ham ? "block" : "hidden"
                } absolute right-0 -bottom-20  w-48 flex flex-col items-start p-2 gap-2 backdrop-blur-sm rounded-lg divide-y ${toggleMode ? 'border border-solid border-customBgLight text-darkText divide-customBgLight' : 'border border-solid border-customBg2 text-lightText divide-customBg2'}`}
              >
                <button
                  className={`
                  cursor-pointer w-full`}
                  onClick={() => setToggleMode((prev) => !prev)}
                >
                  {/* <img
              src={`${toggleMode ? darkMode : lightMode}`}
              alt=""
              className={`  h-7 w-7`}
            /> */}
                  {toggleMode ? (
                    <div className=" flex items-center justify-between">
                      <div>Dark Mode </div>
                      <Dark />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>Light Mode </div>
                      <Light />
                    </div>
                  )}
                </button>
                {auth.currentUser && (
                  <button onClick={handleSignOut} className=" w-full flex justify-start">Log out</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          toggleSearch ? "block animate-dis" : "hidden animate-dat"
        } h-full static  w-full `}
      >
        {windowWidth < 1024 && (
          <div className=" ">
            <SearchClub
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
            />
          </div>
        )}
      </div>

      <div className=" max-w-[1440px] m-auto  lg:p-4 p-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                countries={countries}
                loadingCountries={loadingCountries}
                error={error}
                leagues={leagues}
                check={check}
                reCheck={reCheck}
                fixtures={fixtures}
                loadingFixtures={loadingFixtures}
                fixturesError={fixturesError}
                currentFixture={currentFixture}
                setCurrentFixture={setCurrentFixture}
                liveCheck={liveCheck}
                windowWidth={windowWidth}
                calenderDate={calenderDate}
                setCalenderDate={setCalenderDate}
                handleDateChange={handleDateChange}
                handleDateFocus={handleDateFocus}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                handleSearchToggleClick={handleSearchToggleClick}
                toggleMode={toggleMode}
                setCheck={setCheck}
                toggleSearch={toggleSearch}
                setFocus={setFocus}
                lastJsonMessage={lastJsonMessage}
              />
            }
          />

          <Route
            path="/countries"
            element={
              <Countries
                countries={countries}
                loadingCountries={loadingCountries}
                error={error}
                leagues={leagues}
              />
            }
          />
          <Route path="/leagues/:countryname/:id" element={<Leagues />} />
          <Route
            path="/table/:leaguename/:id"
            element={<Table toggleMode={toggleMode} />}
          />
          <Route
            path="/fixture/:league/:teamsname/:id"
            element={
              <CurrentFixtures
                toggleMode={toggleMode}
                windowWidth={windowWidth}
              />
            }
          />
          {/* <Route path='/fixtures' element={<Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError}/>}/> */}
          <Route
            path="/team/:teamname/:id"
            element={<Teams leagues={leagues} toggleMode={toggleMode} />}
          />
          <Route
            path="/player/:playername/:id"
            element={
              <Players
                countries={countries}
                leagues={leagues}
                toggleMode={toggleMode}
              />
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
