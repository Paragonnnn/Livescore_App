import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Countries from "./Countries";
import Fixtures from "./Fixtures";
import { ball, ogball, calendar, searchLogo } from "..";
import CurrentFixtures from "./CurrentFixtures";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { teamLogo } from "..";
import ClickAwayListener from "react-click-away-listener";
import SearchTeamAndPlayer from "./SearchTeamAndPlayer";
import Calendar2 from "../svg/Calendar2";
import SearchSvg from "../svg/SearchSvg";

const Home = ({
  countries,
  loadingCountries,
  error,
  leagues,
  check,
  fixtures,
  loadingFixtures,
  fixturesError,
  currentFixture,
  setCurrentFixture,
  liveCheck,
  windowWidth,
  calenderDate,
  setCalenderDate,
  handleDateChange,
  handleDateFocus,
  maxDate,
  showCalendar,
  setShowCalendar,
  handleSearchToggleClick,
  toggleMode,
  setCheck,
  focus,
  toggleSearch,
  setFocus,
}) => {
  const [picker, setPicker] = useState(null);
  const date = new Date();
  const calendarRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
        console.log(e.target);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 h-[100%] gap-4">
      {/* <h1>Livescore</h1>
      <Link to={`/countries`}>
        <button>show</button>

      </Link>
      <Link to={`/fixtures`}>
        <button>fixtures</button>
      </Link> */}
      <div className="hidden lg:block col-span-3">
        {/* <SearchTeamAndPlayer /> */}
        <div className=" bg-customBg2 rounded-t">
          <Calendar
            value={calenderDate}
            onChange={handleDateChange}
            className={` text-customBg mb-2 bg-transparent border-none  bg-opacity-50 w-full`}
            minDetail="year"
            maxDetail="month"
          />
          <div
            onClick={() => {
              setCalenderDate(
                `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              );
              setCheck([]);
            }}
            className="  px-3 py-2 rounded-full text-customBg  w-fit mb-4 cursor-pointer hover:opacity-80 active:opacity-60"
          >
            Today
          </div>
        </div>
        {/* <DatePicker selected={calenderDate} onChange={date => setCalenderDate(date)} onKeyDown={handleDateFocus} /> */}
        {/* <input type="date" name="" pattern='' onKeyDown={handleDateFocus} onChange={handleDateChange} max={maxDate} value={calenderDate} className=' w-full outline-none bg-customBg2 mb-4 text-customBg p-2'/> */}
        <div className=" bg-customBg2 px-2 mb-4 divide-y divide-black ">
          <div className=" text-xl text-customBg py-2">Top Leagues</div>
          <div className=" divide-y divide-gray-400 divide-opacity-20 ">
            {leagues &&
              leagues.slice(6, 16).map((top) => (
                <div key={top.league_key} className=" px-1 py-2">
                  <Link
                    to={`/table/${top.league_name.replace(/ +/g, "-")}/${
                      top.league_key
                    }`}
                    className={` ${
                      toggleMode ? "text-darkText" : "text-lightText"
                    } flex justify-between `}
                  >
                    {top.league_name}
                    <img src={top.league_logo} className=" h-5" alt="" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <Countries
          countries={countries}
          loadingCountries={loadingCountries}
          error={error}
          leagues={leagues}
          toggleMode={toggleMode}
        />
      </div>
      <div
        className={`${
          showCalendar ? "block" : "hidden"
        }  backdrop-blur-xl fixed top-0 left-0 w-full h-full bg-white opacity-10`}
      ></div>
      <div
        className={`${
          toggleMode ? "bg-customBg3" : "bg-darkCustomBg3"
        } block fixed lg:hidden bottom-[0px] w-full  z-10 p-3 left-0 `}
      >
        <div>
          <div
            className={`${showCalendar ? "block" : "hidden"}  ${
              toggleMode ? "bg-customBg3" : "bg-darkCustomBg3"
            } rounded-t-xl absolute bottom-[50px] animate-dis left-0 w-full `}
            tabIndex={-1}
            onFocus={console.log("yii")}
            ref={calendarRef}
          >
            <Calendar
              value={calenderDate}
              onChange={handleDateChange}
              className={` text-customBg bg-transparent border-none w-full bg-opacity-50 `}
              minDetail="year"
              maxDetail="month"
            />
            <div
              onClick={() => {
                setCalenderDate(
                  `${date.getFullYear()}-${
                    date.getMonth() + 1
                  }-${date.getDate()}`
                );
                setShowCalendar(false);
                setCheck([]);
              }}
              className="  px-3 py-2 rounded-full text-customBg  w-fit mb-4 cursor-pointer hover:opacity-80 active:opacity-60"
            >
              Today
            </div>
          </div>
        </div>
        <div className={` flex justify-between w-full`}>
          <div >
            <Calendar2
              setShowCalendar={setShowCalendar}
              calendarRef={calendarRef}
            />
          </div>
          <div>
            <SearchSvg
              handleSearchToggleClick={handleSearchToggleClick}
              setFocus={setFocus}
            />
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <Fixtures
          check={check}
          fixtures={fixtures}
          leagues={leagues}
          loadingFixtures={loadingFixtures}
          fixturesError={fixturesError}
          currentFixture={currentFixture}
          setCurrentFixture={setCurrentFixture}
          liveCheck={liveCheck}
          windowWidth={windowWidth}
          toggleMode={toggleMode}
          toggleSearch={toggleSearch}
        />
      </div>

      <div className="hidden lg:block col-span-3 sticky top-[90px] text-black bg-customBg2 p-4 h-fit">
        {loadingFixtures && (
          <div>
            <div className="p-2 flex justify-between">
              <div className=" flex flex-col justify-center gap-2 items-center">
                <div className=" h-12 w-12  bg-[#ffffff10] animate-pulse rounded-xl"></div>
                <div className="bg-[#ffffff10] w-16 h-4"></div>
              </div>
              <div className=" flex flex-col justify-center gap-2 items-center">
                <div className=" h-12 w-12  bg-[#ffffff10] animate-pulse rounded-xl"></div>
                <div className=" w-16 bg-[#ffffff10] h-4"></div>
              </div>
            </div>
            <div className="flex justify-center ">
              <div className=" h-10 w-36 bg-[#ffffff10] mt-6 rounded"></div>
            </div>
          </div>
        )}
        {!loadingFixtures &&
          currentFixture?.map((fixture) => (
            <div key={fixture.event_key} className="">
              <div>{fixture.event_date}</div>
              <div className=" w-full border border-solid border-gray-400 border-opacity-20 p-2 flex  items-center rounded">
                <Link
                  to={`/team/${fixture.event_home_team.replace(/ +/g, "-")}/${
                    fixture.home_team_key
                  }`}
                  className="text-center w-1/3 justify-self-start flex flex-col gap-1 justify-center items-center"
                >
                  <img
                    src={fixture.home_team_logo}
                    alt=""
                    className="w-[50px]"
                  />
                  <div
                    className={` ${
                      toggleMode ? "text-darkText" : "text-lightText"
                    } text-xxs xl:text-xs `}
                  >
                    {fixture.event_home_team}
                  </div>
                </Link>
                <div
                  className={`${
                    fixture.event_live === "1" &&
                    fixture.event_status != "Finished"
                      ? "text-live animate-pulse"
                      : "text-black "
                  } text-center w-1/3 ${
                    toggleMode ? "text-darkText" : "text-lightText"
                  } `}
                >
                  <div className=" lg:text-base xl:text-xl">
                    {fixture.event_final_result}
                  </div>
                  <div className="text-base">
                    {fixture.event_status === "Finished"
                      ? "FT"
                      : fixture.event_status === "Half Time"
                      ? "HT"
                      : fixture.event_status}
                    {fixture.event_live == 1 &&
                    fixture.event_status != "Finished" ? (
                      <span>'</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <Link
                  to={`/team/${fixture.event_away_team.replace(/ +/g, "-")}/${
                    fixture.away_team_key
                  }`}
                  className="text-center w-1/3 justify-self-end flex flex-col gap-1 justify-center items-center"
                >
                  <img
                    src={fixture.away_team_logo}
                    alt=""
                    className="w-[50px]"
                  />
                  <div
                    className={` ${
                      toggleMode ? "text-darkText" : "text-lightText"
                    } text-xxs xl:text-xs `}
                  >
                    {fixture.event_away_team}
                  </div>
                </Link>
              </div>
              <div
                className={` ${
                  toggleMode ? "text-darkText" : "text-lightText"
                } flex justify-between lg:text-xxs xl:text-xs  mt-2`}
              >
                <div className=" w-1/2">
                  {fixture &&
                    fixture.goalscorers.map(
                      (scorer, index) =>
                        scorer.home_scorer && (
                          <div key={index}>
                            <div className="flex items-center py-1 gap-1 ">
                              <div className=" relative">
                                <div className=" text-xxs opacity-70 absolute top-[-5px] right-0">
                                  {scorer.info === "Penalty" ||
                                  scorer.home_scorer.includes("PG")
                                    ? "p"
                                    : ""}
                                </div>

                                <img
                                  src={
                                    scorer.home_scorer.includes("OG") ||
                                    scorer.home_scorer.includes("o.g.")
                                      ? ogball
                                      : ball
                                  }
                                  className="lg:h-3 lg:w-3 xl:h-4 xl:w-4"
                                  alt=""
                                />
                              </div>
                              <div className=" ">
                                {scorer.home_scorer}
                                <span
                                  className={`${
                                    toggleMode
                                      ? "text-darkText"
                                      : "text-lightText"
                                  }  opacity-40 ml-1`}
                                >
                                  ({scorer.time}')
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                </div>
                <div className=" w-1/2">
                  {fixture &&
                    fixture.goalscorers.map(
                      (scorer, index) =>
                        scorer.away_scorer && (
                          <div key={index}>
                            <div className="flex items-center justify-end py-1 gap-1 ">
                              <div>
                                <span
                                  className={`${
                                    toggleMode
                                      ? "text-darkText"
                                      : "text-lightText"
                                  }  opacity-40 mr-1`}
                                >
                                  ({scorer.time}')
                                </span>
                                <span className=" text-right">
                                  {scorer.away_scorer}
                                </span>
                              </div>
                              <div className=" relative">
                                <img
                                  src={
                                    scorer.away_scorer.includes("OG") ||
                                    scorer.away_scorer.includes("o.g.")
                                      ? ogball
                                      : ball
                                  }
                                  className="lg:h-3 lg:w-3 xl:h-4 xl:w-4"
                                  alt=""
                                />
                                <div className=" text-xxs absolute top-[-5px] right-[0px]">
                                  {scorer.info === "Penalty" ||
                                  scorer.away_scorer.includes("PG")
                                    ? "p"
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  to={`/fixture/${fixture.league_name.replace(
                    / +/g,
                    "-"
                  )}/${fixture.event_home_team.replace(
                    / +/g,
                    "-"
                  )}-${fixture.event_away_team.replace(/ +/g, "-")}/${
                    fixture.event_key
                  }`}
                  className={` text-lightText px-4 bg-customBg py-1 text-lg rounded hover:opacity-80 mt-3`}
                >
                  show more
                </Link>
              </div>
              <div></div>
            </div>
          ))}
      </div>

      {/* {
        // <CurrentFixtures month={month} currentYear={currentYear} day={day} leagues={leagues} />

      } */}
    </div>
  );
};

export default Home;
