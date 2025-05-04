import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ball, ogball } from "..";
import useWebSocket from "react-use-websocket";

const HomeCurrentFixtureInfo = ({
  loadingFixtures,
  toggleMode,
  currentFixture,
  setCurrentFixture,
}) => {
  //   const [newCurrentFixture, setNewCurrentFixture] = useState(currentFixture);
  const [currentFixtureId, setCurrentFixtureId] = useState(
    currentFixture.map((c) => {
      return c.event_key;
    })
  );
  const [homeScorers, setHomeScorers] = useState([]);
  const [awayScorers, setAwayScorers] = useState([]);
  const [isPulsing, setIsPulsing] = useState(false);
  const showMoreRef = useRef(null);

  useEffect(() => {
    if (currentFixture) {
      setCurrentFixtureId(
        currentFixture.map((c) => {
          return c.event_key;
        })
      );
      setHomeScorers(
        currentFixture.map((c) => {
          return c.goalscorers;
        })
      );
    }
  }, [currentFixture]);

  const api_key = import.meta.env.VITE_api_key;

  const socketUrl = `wss://wss.allsportsapi.com/live_events?APIkey=${api_key}&matchId=${currentFixtureId}`;
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

  useEffect(() => {
    // console.log(lastJsonMessage);
    if (lastJsonMessage !== null && currentFixture) {
      lastJsonMessage.map((l) => {
        if (l.event_key == currentFixtureId) {
          setCurrentFixture(lastJsonMessage);
        }
      });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (currentFixture && !loadingFixtures) {
      // Trigger pulse animation
      setIsPulsing(true);

      // Reset after 3 seconds
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [currentFixture, loadingFixtures]);

  return (
    <div>
      <div>
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
            <div key={fixture.event_key}>
              <div
                className={`${
                  toggleMode ? "text-darkText" : "text-lightText"
                } flex mb-1 `}
              >
                <Link
                  to={`/leagues/${fixture.country_name.replace(/ +/g, "-")}/${
                    fixture.league_key
                  }`}
                >
                  {/* {fixture.country_name}  */}
                </Link>

                <Link
                  to={`/table/${fixture.league_name.replace(/ +/g, "-")}/${
                    fixture.league_key
                  }`}
                  className=" mb-[4px] text-gray-200"
                >
                  {fixture.league_name}
                </Link>
              </div>
              <div className=" w-full border border-solid border-gray-400 border-opacity-20 p-2 flex  items-center rounded-lg">
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
                  )}/${fixture.event_home_team
                    .replace(/ +/g, "-")
                    .replace("/", "-")}-${fixture.event_away_team
                    .replace(/ +/g, "-")
                    .replace("/", "-")}/${fixture.event_key}`}
                  className={`${isPulsing? "animate-bounce" : ''} text-lightText px-4 bg-customBg py-1 text-lg rounded hover:bg-opacity-80 mt-3`}
                  ref={showMoreRef}
                >
                  show more
                </Link>
              </div>
              <div></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeCurrentFixtureInfo;
