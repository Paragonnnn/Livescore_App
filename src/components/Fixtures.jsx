import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "./Error";
import Countries from "./Countries";
import { Link } from "react-router-dom";
import { fix, max } from "mathjs";
import LoadingFixtures from "./LoadingFixtures";

const Fixtures = ({
  leagues,
  fixtures,
  check,
  fixturesError,
  loadingFixtures,
  currentFixture,
  setCurrentFixture,
  liveCheck,
  windowWidth,
  toggleMode,
  toggleSearch,
  showCalendar,
  lastJsonMessage,
  reCheck,
  readyState,
}) => {
  const [isLive, setIsLive] = useState(true);
  const [checkCheck, setCheckCheck] = useState([])
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    if (check != []) {
      setCheckCheck([])
      setCheckCheck(check)
      console.log('checkkkkk');
    } else(check == []); {
      setCheckCheck([])
      setCheckCheck(reCheck)
      console.log('not checkkkk');
    }
  },[check])

  

  const all = () => {
    setIsLive(true);
  };
  const live = () => {
    setIsLive(false);
  };

  const handleClick = (id) => {
    if (!currentFixture.includes(id)) {
      setCurrentFixture(fixtures.filter((fixture) => fixture === id));
    } else {
      setCurrentFixture([id]);
    }
    // console.log(currentFixture);
    // console.log("hi");

  };

  const yellowCard = (fixture, isHome) => {
    // Filter the cards once and store them
    const yellowCards = fixture.cards.filter(
      (c) => c.card === "yellow card" && (isHome ? c.home_fault : c.away_fault)
    );
  
    // Get the number of yellow cards
    const yellowCardsCount = yellowCards.length;
  
    return yellowCards.map((c, i) => (
      <div
        key={`${c.player}-${i}`} // Ensure a unique key, assuming each card has a unique player property
        className={`${showCards ? "block" : "hidden"} ${
          i === 0
            ? "bg-yellow-500 w-2 h-[10px] sm:w-3 sm:h-4 rounded-[2px] flex justify-center items-center text-[7px] sm:text-xxs text-black"
            : "hidden"
        } `}
      >
        {yellowCardsCount}
      </div>
    ));
  };

  const redCard = (fixture, isHome) => {
    // Filter the cards once and store them
    const redCards = fixture.cards.filter(
      (c) => c.card === "red card" && (isHome ? c.home_fault : c.away_fault)
    );
  
    // Get the number of yellow cards
    const redCardsCount = redCards.length;
  
    return redCards.map((c, i) => (
      <div
        key={`${c.player}-${i}`} // Ensure a unique key, assuming each card has a unique player property
        className={`${showCards ? "block" : "hidden"} ${
          i === 0
            ? "bg-red-500 w-2 h-[10px] sm:w-3 sm:h-4 rounded-[2px] flex justify-center items-center text-[7px] sm:text-xxs text-black"
            : "hidden"
        } `}
      >
        {redCardsCount}
      </div>
    ));
  };
  
  
  
  
  
  
  
  
  
  const handleShowCards = () => {
    setShowCards((prev) => !prev);
    console.log(showCards);
  };

  // const buttonClick = () => {
  //   addNotification({
  //     title: `${notificationMessage?.map((f) => f.event_final_result)}`,
  //     subtitle: "This is a subtitle",
  //     message: `${notificationMessage?.map((f) => `${f.event_home_team} - ${f.event_away_team}`)}`,
  //     theme: "darkblue",
  //     native: true, // when using native, your OS will handle theming.
  //   });
  // };

  // useEffect(() => {
  //   console.log("new fixtures");
  //   setNotificationMessage(lastJsonMessage?.filter(l => l.event_key == '1226019'))
  //   if (lastJsonMessage?.map((f) => f.event_key == "1226019")) {
  //     buttonClick();
  //   }
  // }, [lastJsonMessage]);

  return (
    <div
      className={`${
        toggleSearch ? "hidden lg:block" : ""
      }   rounded-xl sm:px-4 relative ${showCalendar ? " blur-sm" : " "} `}
    >
      <div
        className={`${
          toggleMode ? "bg-customBgLight" : "bg-customBg2"
        } text-gray-400 p-2 mb-4 text-lg  rounded-xl`}
      >
        <div className=" flex items-center w-full  rounded-full p-1 justify-between">
          <div className=" flex">
            <button
              onClick={all}
              className={`${
                isLive ? " outline outline-1 outline-customBg" : " "
              } ${
                toggleMode ? "text-darkText" : "text-lightText"
              } px-3 rounded-lg  transition duration-200 ease-in-out`}
            >
              All
            </button>
            <button
              onClick={live}
              className={`${
                !isLive ? " outline outline-1 outline-customBg" : ""
              } ${
                toggleMode ? "text-darkText" : "text-lightText"
              } transition duration-200 ease-in px-3 rounded-lg flex items-center gap-1`}
            >
              Live{" "}
              <div className="text-xs text-live font-bold mb-[-4px]">
                (
                {
                  fixtures?.filter(
                    (fixture) =>
                      fixture.event_live === "1" &&
                      fixture.event_status !== "Finished"
                  ).length
                }
                )
              </div>
            </button>
            <div className="flex items-center">
              <div
                className={`${
                  readyState === 1
                    ? "bg-green-500"
                    : readyState === 0
                    ? "bg-gray-400"
                    : "bg-red-500"
                } h-1 w-1  rounded-full`}
              ></div>
            </div>
          </div>
          {/* <button onClick={buttonClick} className="button">
            Hello world.
          </button> */}
          <div className=" flex items-center gap-2">
            <div className=" text-xxs">Show Cards</div>
            <div
              className={`${
                showCards ? "" : ""
              }  h-[18px] w-8  rounded-[18px] cursor-pointer relative flex items-center`}
              onClick={handleShowCards}
            >
              <div
                className={`${
                  showCards ? "bg-customBg translate-x-[16px]" : " bg-gray-400 "
                }  h-4 w-4 rounded-full transition-transform duration-700 transform z-10`}
              ></div>
              <div
                className={`h-[10px] w-full bg-gray-300 opacity-30 absolute rounded-xl`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {loadingFixtures && <LoadingFixtures toggleMode={toggleMode} />}

      {fixturesError && (
        <div className=" relative h-[50vh]">
          <Error />
        </div>
      )}
      {console.log(fixtures.filter((f) => f.event_live === '1' && f.event_status != 'Finished').length)}
      {
        (fixtures.filter((f) => f.event_live === '1' && f.event_status != 'Finished').length) == '0' && !isLive && 
        <div>no live games</div>
      }
      {(!fixturesError ) && (
        <div
          className={`${
            !loadingFixtures &&
            (toggleMode ? "bg-customBgLight" : "bg-customBg2")
          }  mb-14 p-2 md:p-4 rounded-xl `}
        >
          {
            // !(loading && error) &&
            fixtures &&
              leagues &&
              !loadingFixtures &&
              !fixturesError &&
              
              leagues.map(
                (league, index) =>
                  (!isLive
                    ? checkCheck?.includes(league.league_key) &&
                      liveCheck?.includes(league.league_key)
                    : checkCheck?.includes(league.league_key)) && (
                    <div
                      key={league.league_key}
                      className={` border border-solid border-gray-400 mb-4 first:rounded-t-lg last:rounded-b-lg divide-y divide-gray-400 border-opacity-20 divide-opacity-20`}
                    >
                      {checkCheck?.includes(league.league_key) && (
                        <div
                          className={` text-customBg py-2 px-3 text-xs  flex gap-1 items-center `}
                        >
                          <img
                            src={league.country_logo}
                            alt=""
                            className="w-4 h-4 rounded-[100%] mr-2"
                          />
                          <div className="flex flex-col">
                            <Link
                              className={` opacity-90`}
                              to={`/table/${league.league_name.replace(
                                / +/g,
                                "-"
                              )}/${league.league_key}`}
                            >
                              {league.country_name}
                            </Link>
                            <Link
                              to={`/table/${league.league_name.replace(
                                / +/g,
                                "-"
                              )}/${league.league_key}`}
                            >
                              {league.league_name}
                            </Link>
                          </div>
                        </div>
                      )}
                      {fixtures
                        ?.filter((fixture) => {
                          // fixture.event_live === isLive
                          if (isLive) {
                            return fixture;
                          } else {
                            return (
                              fixture.event_live === "1" &&
                              fixture.event_status !== "Finished"
                            );
                          }
                        })
                        .sort(
                          (a, b) =>
                            a.event_time.replace(":", ".") -
                            b.event_time.replace(":", ".")
                        ).sort((a, b) => a.event_key - b.event_key)
                        .map(
                          (fixture, index) =>
                            // leagues.map(league => (

                            // ))
                            league.league_key == fixture.league_key && (
                              <div
                                key={fixture.event_key}
                                className={`${
                                  windowWidth > 1024
                                    ? "hover:bg-opacity-70 transition "
                                    : ""
                                }${
                                  toggleMode
                                    ? "text-darkText "
                                    : " text-lightText "
                                } text-xs p-2 flex gap-2 relative `}
                                onClick={() => handleClick(fixture)}
                              >
                                {/* <div>{fixture.country_name}</div> */}
                                {/* <h1>{fixture.league_name}</h1> */}
                                {windowWidth < 1024 && (
                                  <Link
                                    className="absolute h-full w-full z-[1] bg-transparent top-[-2px] left-[-2px]"
                                    to={`/fixture/${fixture.league_name.replace(
                                      / +/g,
                                      "-"
                                    )}/${fixture.event_home_team.replace(
                                      / +/g,
                                      "-"
                                    )}-${fixture.event_away_team.replace(
                                      / +/g,
                                      "-"
                                    )}/${fixture.event_key}`}
                                  ></Link>
                                )}
                                <div
                                  className={`${
                                    toggleMode
                                      ? " text-darkText"
                                      : "text-lightText"
                                  } text-xxs  flex flex-col justify-center items-center overflow-hidden `}
                                >
                                  <div
                                    className={`${
                                      fixture.event_live == 1 ||
                                      fixture.event_status == "Finished" ||
                                      fixture.event_status === "After Pen." ||
                                      fixture.event_status === "After ET" ||
                                      fixture.event_status === "Postponed"
                                        ? "hidden"
                                        : ""
                                    }`}
                                  >
                                    {fixture.event_time}
                                  </div>
                                  <div
                                    className={`${
                                      fixture.event_status !== "Finished" &&
                                      fixture.event_live === "1"
                                        ? " text-live font-bold  text-[.75rem] animate-pulse"
                                        : ""
                                    } ' text-[.5rem] text-center font-semibold w-[40px] text-ellipsis overflow-hidden  '`}
                                  >
                                    {fixture.event_status === "Finished"
                                      ? "FT"
                                      : fixture.event_status === "Half Time"
                                      ? "HT"
                                      : fixture.event_status === "After Pen."
                                      ? "AP"
                                      : fixture.event_status === "After ET"
                                      ? "AET"
                                      : fixture.event_status === "Postponed" ||
                                        fixture.event_status === "Cancelled"
                                      ? `${fixture.event_status.slice(0, 4)}..`
                                      : fixture.event_status === ""
                                      ? "-"
                                      : !isNaN(
                                          +fixture.event_status ||
                                            fixture.event_status.includes("+")
                                        )
                                      ? `${fixture.event_status}'`
                                      : `${fixture.event_status.slice(0, 4)}.`}
                                  </div>
                                </div>
                                <button className=" cursor-pointer w-full ">
                                  <div className="flex gap-1 items-center">
                                    <img
                                      src={fixture.home_team_logo}
                                      alt=""
                                      className="w-3 h-3"
                                    />
                                    <div className="flex justify-between items-center  w-full">
                                      <div className=" text-xs sm:text-base flex items-center gap-[1px] sm:gap-[2px]">
                                        <span className=" mr-1 sm:mr-2 ">
                                          {fixture.event_home_team}
                                        </span>
                                        {yellowCard(fixture, true)}
                                        {redCard(fixture, true)}
                                      </div>
                                      <div
                                        className={`${
                                          fixture.event_live == "1" &&
                                          fixture.event_status !== "Finished"
                                            ? "text-live"
                                            : ""
                                        } text-xs`}
                                      >
                                        {fixture.event_final_result.slice(
                                          0,
                                          fixture.event_final_result.indexOf(
                                            "-"
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-1 items-center">
                                    <img
                                      src={fixture.away_team_logo}
                                      alt=""
                                      className="h-3 w-3 "
                                    />
                                    <div className="flex justify-between items-center w-full">
                                      <div className=" text-xs sm:text-base flex items-center gap-[1px] sm:gap-[2px] ">
                                        <span className=" mr-1 sm:mr-2">
                                          {fixture.event_away_team}
                                        </span>
                                        {yellowCard(fixture, false)}
                                        {redCard(fixture, false)}
                                      </div>
                                      <div
                                        className={`${
                                          fixture.event_live == "1" &&
                                          fixture.event_status !== "Finished"
                                            ? "text-live"
                                            : ""
                                        } text-xs`}
                                      >
                                        {fixture.event_final_result.slice(
                                          fixture.event_final_result.indexOf(
                                            "-"
                                          ) + 1,
                                          fixture.event_final_result.length + 1
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {/* {fixture.event_ft_result.slice(0,fixture.event_ft_result.indexOf('-'))} vs  {fixture.event_ft_result.slice(fixture.event_ft_result.indexOf('-') + 1, fixture.event_ft_result.length + 1)} */}
                                </button>
                              </div>
                            )
                        )}
                    </div>
                  )
              )
          }
        </div>
      )}
    </div>
  );
};

export default Fixtures;
