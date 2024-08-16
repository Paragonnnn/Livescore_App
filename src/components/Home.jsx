import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import HomeCurrentFixtureInfo from "./HomeCurrentFixtureInfo";
import SIgnIn from "./Authentication/SignIn";
import TransferSvg from "../svg/TransferSvg";
import Star2 from "../svg/Star2";
import TransferInfo from "./Transfers/TransferInfo";
import NewsInfo from "./News/NewsInfo";
// import Transfer from "./Transfers/Transfer";

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
  lastJsonMessage,
  reCheck,
  readyState,
  searchParam,
}) => {
  const [picker, setPicker] = useState(null);
  const date = new Date();
  const calendarRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      if (!calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
        // console.log(e.target);
      }
    });
  }, []);
  console.log(calenderDate);

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
        <div
          className={` ${
            toggleMode ? " bg-customBgLight" : " bg-customBg2"
          }  rounded-xl `}
        >
          <Calendar
            value={calenderDate}
            onChange={handleDateChange}
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } mb-2 bg-transparent border-none  bg-opacity-50 text-opacity-80 w-full px-1`}
            minDetail="year"
            maxDetail="month"
            tileClassName={({ date }) => {
              return date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
                ? "day_style"
                : "date_hover";
            }}
          />
          <button
            onClick={() => {
              setCalenderDate(
                `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              );
              setCheck([]);
            }}
            className="  px-3 py-1 rounded-full text-white bg-customBg w-fit ml-4 mb-4 cursor-pointer hover:opacity-80 active:opacity-60"
          >
            Today
          </button>
        </div>
        {/* <DatePicker selected={calenderDate} onChange={date => setCalenderDate(date)} onKeyDown={handleDateFocus} /> */}
        {/* <input type="date" name="" pattern='' onKeyDown={handleDateFocus} onChange={handleDateChange} max={maxDate} value={calenderDate} className=' w-full outline-none bg-customBg2 mb-4 text-customBg p-2'/> */}
        <div
          className={` ${
            toggleMode ? " bg-customBgLight" : " bg-customBg2"
          }  px-2 mb-4 divide-y divide-black rounded-xl mt-4`}
        >
          <div className=" text-xl text-customBg py-2">Top Leagues</div>
          <div className=" divide-y divide-gray-400 divide-opacity-20 ">
            {leagues &&
              leagues.slice(6, 13).map((top) => (
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
                    <img
                      src={
                        top.league_key === 302
                          ? "https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_logo_2023.svg"
                          : top.league_key === 152
                          ? "https://upload.wikimedia.org/wikipedia/az/f/f2/Premier_League_Logo.svg"
                          : top.league_key === 207
                          ? "https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg"
                          : top.league_key === 175
                          ? "https://upload.wikimedia.org/wikipedia/az/f/f6/Bundesliga_%28Official_logo%29.png"
                          : top.league_key === 168
                          ? "https://upload.wikimedia.org/wikipedia/commons/f/fb/Ligue1_logo.png"
                          : top.league_key === 344
                          ? "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Russian_Premier_League.svg/1024px-Russian_Premier_League.svg.png"
                          : top.league_key === 266
                          ? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Liga_NOS_logo.png"
                          : top.league_key === 4
                          ? "https://upload.wikimedia.org/wikipedia/fr/5/52/UEFA_Europa_League_logo.png"
                          : top.league_key === 3
                          ? "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/1024px-UEFA_Champions_League.svg.png"
                          : top.league_key === 683
                          ? "https://upload.wikimedia.org/wikipedia/sr/b/bf/UEFA_Europa_Conference_League_logo.png"
                          : top.league_logo
                      }
                      className=" h-5"
                      alt=""
                    />
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
            // onFocus={console.log("yii")}
            ref={calendarRef}
          >
            <Calendar
              value={calenderDate}
              onChange={handleDateChange}
              className={` text-customBg bg-transparent border-none w-full bg-opacity-50 `}
              minDetail="year"
              maxDetail="month"
              tileClassName={({ date }) => {
                return date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth() &&
                  date.getFullYear() === new Date().getFullYear()
                  ? "day_style"
                  : "date_hover";
              }}
            />
            <button
              onClick={() => {
                setCalenderDate(
                  `${date.getFullYear()}-${
                    date.getMonth() + 1
                  }-${date.getDate()}`
                );
                setShowCalendar(false);
                setCheck([]);
              }}
              className="  px-3 py-2 rounded-full text-white bg-customBg  w-fit ml-4 mb-4 cursor-pointer hover:opacity-80 active:opacity-60"
            >
              Today
            </button>
          </div>
        </div>
        <div className={` flex justify-between w-full`}>
          <div>
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
          <Link to={`/transfers`}>
            <TransferSvg />
          </Link>
          <div>
            <Star2 />
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <Fixtures
          check={check}
          reCheck={reCheck}
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
          lastJsonMessage={lastJsonMessage}
          showCalendar={showCalendar}
          readyState={readyState}
        />
      </div>
      <div
        className={` hidden lg:block col-span-3  text-black countries-scroll overflow-y-scroll`}
      >
        <div
          className={`${
            toggleMode ? " bg-customBgLight" : " bg-customBg2"
          } p-4 rounded-xl h-fit`}
        >
          <HomeCurrentFixtureInfo
            loadingFixtures={loadingFixtures}
            currentFixture={currentFixture}
            toggleMode={toggleMode}
            setCurrentFixture={setCurrentFixture}
          />
        </div>

        <div className=" p-4 bg-customBg2  mt-4 rounded-xl text-lightText ">
          <TransferInfo />
        </div>
        <div className=" mb-7 mt-5 bg-customBg2 text-lightText">
          <NewsInfo />
        </div>
      </div>

      {/* {
        // <CurrentFixtures month={month} currentYear={currentYear} day={day} leagues={leagues} />

      } */}
    </div>
  );
};

export default Home;
