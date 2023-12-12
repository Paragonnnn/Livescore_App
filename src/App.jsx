import React, { useState, useEffect, useRef } from "react";
import Countries from "./components/Countries";
import Leagues from "./components/Leagues";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Teams from "./team/Teams";
import Table from "./components/Table";
import Fixtures from "./components/Fixtures";
import Players from "./components/Players";
import CurrentFixtures from "./components/CurrentFixtures";
import SearchClub from "./components/SearchClub";
import parseISO from "date-fns/parseISO";
import { addDays, format, addMonths } from "date-fns";
import Calendar from "react-calendar";
import { calendar, darkMode, lightMode, searchLogo } from ".";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingFixtures, setLoadingFixtures] = useState(false);
  const [error, setError] = useState(false);
  const [fixturesError, setFixturesError] = useState();
  const [leagues, setLeagues] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [check, setCheck] = useState([]);
  const [liveCheck, setLiveCheck] = useState([]);
  const [currentFixture, setCurrentFixture] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchClub, setSearchClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);

  const focus = useRef();

  document.querySelector("body").style.backgroundColor = `${
    toggleMode ? "#F7F7FF" : "#101419"
  }`;
  console.log(document.querySelector("body"));
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
  console.log(windowWidth);

  const handleDateChange = (date) => {
    console.log(date);
    setCalenderDate(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    console.log(date.toISOString().split("T")[0]);
    console.log(
      `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    );
    setShowCalendar(false);
    setCheck([])
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
  };
  const api_key = import.meta.env.VITE_api_key;

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
          console.log(json.result);
        })
        .catch((err) => {
          setLoadingCountries(false);
          setError(true);
          console.log(err);
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
          console.log(json.result);
        })
        .catch((err) => {
          console.log(err);
          console.log("errors");
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
          console.log(json.result);
          setLoadingFixtures(false);
          setCurrentFixture(json.result.slice(0, 1));
          setCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) && fixture.league_key
            )
          );
          setLiveCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) &&
                fixture.event_live === "1" &&
                fixture.event_status !== "Finished" &&
                fixture.league_key
            )
          );
          console.log(json.result);
          console.log(liveCheck);
          console.log(json.result.map(
            (fixture) =>
              !check.includes(fixture.league_key) && fixture.league_key
          ));
        })
        .catch((err) => {
          setLoadingFixtures(false);
          setFixturesError(true);
          console.log(err);
        });
    }
    // const timeoutId = setTimeout(getData(), 2000);

    // Clean up the timer when the component unmounts
    // return () => {
    //   clearTimeout(timeoutId);
    // };
    getData();
  }, [calenderDate]);

  // useEffect(() => {
  //   async function getData() {
  //     await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=&APIkey=${api_key}`)
  //   }
  // })

  return (
    <div className={`${toggleMode ? "bg-customBg3" : "bg-darkCustomBg3"} `}>
      <div
        className={`${
          toggleMode
            ? "bg-customBg3 shadow-light"
            : "bg-darkCustomBg3 shadow-sm"
        }   w-full  sticky top-[-2px] rounded-b-xl z-10`}
      >
        <div className="m-auto  max-w-[1440px]  flex items-center justify-between relative">
          <Link to={"/"}>
            <h3 className="text-[25px] md:text-[40px] px-2 md:px-4 py-1 sm:py-2 mb-2 text-customBg font-bold">
              Paragon :)
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
                />
              </div>
            )}
          </div>
          <button
            className={`${
              toggleMode
                ? " rotate-0 transition-transform"
                : "-rotate-180 transition-transform"
            } px-2 md:px-4 cursor-pointer animate-mode`}
            onClick={() => setToggleMode((prev) => !prev)}
          >
            <img
              src={`${toggleMode ? darkMode : lightMode}`}
              alt=""
              className={`  h-7 w-7`}
            />
          </button>
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
            />
          </div>
        )}
      </div>

      <div className=" max-w-[1440px] m-auto  lg:p-4 p-1">
        <Routes>
          <Route
            path="/:date"
            
            element={
              <Home
                countries={countries}
                loadingCountries={loadingCountries}
                error={error}
                leagues={leagues}
                check={check}
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
          <Route path="/table/:leaguename/:id" element={<Table />} />
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
            element={<Teams leagues={leagues} />}
          />
          <Route
            path="/player/:playername/:id"
            element={<Players countries={countries} leagues={leagues} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
