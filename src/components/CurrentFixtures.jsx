import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ball } from "..";
import Event from "../events/Event";
import Statistics from "./Statistics";
import HeadToHead from "./HeadToHead";
import Odds from "./Odds";
import LineUp from "./LineUp";
import CurrentFixtureInfo from "./CurrentFixtureInfo";
import MatchInfo from "./MatchInfo";
import Standing from "./Standing";
import useWebSocket from "react-use-websocket";
import { getMatchUpdate } from "../polling/polling";

const CurrentFixtures = ({
  toggleMode,
  windowWidth,
  alert,
  setAlert,
  alertMessage,
  setAlertMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState([]);
  const [hToH, setHToH] = useState([]);
  const [odds, setOdds] = useState([]);
  const [bookie, setBookie] = useState("1xBet");
  const [seeMore, setSeeMore] = useState(false);
  const [stats, setStats] = useState([]);
  const [cards, setCards] = useState([]);
  const [goalscorers, setGoalscorers] = useState([]);
  const [events, setEvents] = useState([]);
  const [half, setHalf] = useState([]);
  const [statToggle, setStatToggle] = useState("Events");
  const [lineUp, setLineUp] = useState([]);
  const [sub, setSub] = useState([]);
  const [playerStat, setPlayerStat] = useState([]);
  const [getLeagueId, setGetLeagueId] = useState(null);
  const [table, setTable] = useState([]);
  const [homeTable, setHomeTable] = useState([]);
  const [awayTable, setAwayTable] = useState([]);
  const [mappedTable, setMappedTable] = useState(table);
  const [changeTable, setChangeTable] = useState("all");
  const [getHomeTeamId, setGetHomeTeamId] = useState(null);
  const [getAwayTeamId, setGetAwayTeamId] = useState(null);
  const [h2hHomeStat, setH2hHomeStat] = useState([]);
  const [h2hDrawStat, setH2hDrawStat] = useState([]);
  const [h2hAwayStat, setH2hAwayStat] = useState([]);

  const { id } = useParams();
  const api_key = import.meta.env.VITE_api_key;

  // const socketUrl = `wss://wss.allsportsapi.com/live_events?APIkey=${api_key}&matchId=${id}`;
  // const {
  //   sendMessage,
  //   sendJsonMessage,
  //   lastMessage,
  //   lastJsonMessage,
  //   readyState,
  //   getWebSocket,
  // } = useWebSocket(socketUrl, {
  //   // onOpen: () => console.log(lastJsonMessage, lastMessage),
  //   //Will attempt to reconnect on all close events, such as server shutting down
  // });

  // useEffect(() => {
  //   // console.log(lastJsonMessage);
  //   if (lastJsonMessage !== null) {
  //     setMatch(lastJsonMessage);
  //     // console.log(lastJsonMessage?.map((s) => s.statistics));
  //     setStats(lastJsonMessage.map((s) => s.statistics));
  //     // setPlayerStat(lastJsonMessage.map((s) => s.player_stats));
  //     setEvents(
  //       lastJsonMessage
  //         .map((c) => c.cards)
  //         .concat(lastJsonMessage.map((g) => g.goalscorers))
  //         .concat(lastJsonMessage.map((s) => s.substitutes))
  //         .reduce((a, c) => {
  //           return a.concat(c);
  //         }, [])
  //     );
  //   }
  // }, [lastJsonMessage]);

  
  const handleClick = (e) => {
    let book = e.target.innerHTML;
    setBookie(book);
  };
  const handleSeeMore = () => {
    setSeeMore((prev) => !prev);
  };
  const handleStatToggle = (e) => {
    let current = e.target.innerHTML;
    setStatToggle(current);

  
  };
  const home = () => {
    setChangeTable("home");
    setMappedTable(homeTable);
  };
  const away = () => {
    setChangeTable("away");
    setMappedTable(awayTable);
  };
  const all = () => {
    setChangeTable("all");
    setMappedTable(table);
  };

  // for (let i = 0; i < 101; i++) {
  //   setStatPercent([i])
  // }
  let test = [
    "w-[0%]",
    "w-[1%]",
    "w-[2%]",
    "w-[3%]",
    "w-[4%]",
    "w-[5%]",
    "w-[6%]",
    "w-[7%]",
    "w-[8%]",
    "w-[9%]",
    "w-[10%]",
    "w-[11%]",
    "w-[12%]",
    "w-[13%]",
    "w-[14%]",
    "w-[15%]",
    "w-[16%]",
    "w-[17%]",
    "w-[18%]",
    "w-[19%]",
    "w-[20%]",
    "w-[21%]",
    "w-[22%]",
    "w-[23%]",
    "w-[24%]",
    "w-[25%]",
    "w-[26%]",
    "w-[27%]",
    "w-[28%]",
    "w-[29%]",
    "w-[30%]",
    "w-[31%]",
    "w-[32%]",
    "w-[33%]",
    "w-[34%]",
    "w-[35%]",
    "w-[36%]",
    "w-[37%]",
    "w-[38%]",
    "w-[39%]",
    "w-[40%]",
    "w-[41%]",
    "w-[42%]",
    "w-[43%]",
    "w-[44%]",
    "w-[45%]",
    "w-[46%]",
    "w-[47%]",
    "w-[48%]",
    "w-[49%]",
    "w-[50%]",
    "w-[51%]",
    "w-[52%]",
    "w-[53%]",
    "w-[54%]",
    "w-[55%]",
    "w-[56%]",
    "w-[57%]",
    "w-[58%]",
    "w-[59%]",
    "w-[60%]",
    "w-[61%]",
    "w-[62%]",
    "w-[63%]",
    "w-[64%]",
    "w-[65%]",
    "w-[66%]",
    "w-[67%]",
    "w-[68%]",
    "w-[69%]",
    "w-[70%]",
    "w-[71%]",
    "w-[72%]",
    "w-[73%]",
    "w-[74%]",
    "w-[75%]",
    "w-[76%]",
    "w-[77%]",
    "w-[78%]",
    "w-[79%]",
    "w-[80%]",
    "w-[81%]",
    "w-[82%]",
    "w-[83%]",
    "w-[84%]",
    "w-[85%]",
    "w-[86%]",
    "w-[87%]",
    "w-[88%]",
    "w-[89%]",
    "w-[90%]",
    "w-[91%]",
    "w-[92%]",
    "w-[93%]",
    "w-[94%]",
    "w-[95%]",
    "w-[96%]",
    "w-[97%]",
    "w-[98%]",
    "w-[99%]",
    "w-[100%]",
  ];

  let per = "w-[53%]";

  useEffect(() => {
    setLoading(true);
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Fixtures&withPlayerStats=1&matchId=${id}&timezone=Africa/Lagos&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setMatch(json.result);
          setGetLeagueId(parseFloat(json.result.map((id) => id.league_key)));
          setGetHomeTeamId(
            parseFloat(json.result.map((id) => id.home_team_key))
          );
          setGetAwayTeamId(
            parseFloat(json.result.map((id) => id.away_team_key))
          );
          setStats(json.result.map((s) => s.statistics));
          setLineUp(json.result.map((s) => s.lineups));
          setPlayerStat(json.result.map((s) => s.player_stats));
          setEvents(
            json.result
              .map((c) => c.cards)
              .concat(json.result.map((g) => g.goalscorers))
              .concat(json.result.map((s) => s.substitutes))
              .reduce((a, c) => {
                return a.concat(c);
              }, [])
          );
          setLoading(false);
        })
        .catch((err) => {});
    }
    getData();
  }, [id]);
  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=H2H&APIkey=${api_key}&${match.map(
          (match) =>
            `firstTeamId=${match.home_team_key}&secondTeamId=${match.away_team_key}`
        )}`
      )
      .then((res) => res.json())
        .then((json) => {
          setHToH(json.result.H2H);
          setH2hDrawStat(
            parseFloat(
              json.result.H2H.filter((h) => eval(h.event_final_result) == 0)
                .length
            )
          );
          setH2hHomeStat(
            parseFloat(
              json.result.H2H.filter(
                (h) =>
                  (getHomeTeamId == h.home_team_key &&
                    eval(h.event_final_result) > 0) ||
                  (getHomeTeamId == h.away_team_key &&
                    eval(h.event_final_result) < 0)
                  ).length
            )
          );
          setH2hAwayStat(
            parseFloat(
              json.result.H2H.filter(
                (h) =>
                  (getAwayTeamId == h.away_team_key &&
                    eval(h.event_final_result) < 0) ||
                  (getAwayTeamId == h.home_team_key &&
                    eval(h.event_final_result) > 0)
                  ).length
            )
          );
        })
        .catch((err) => {});
    }
    getData();
  }, [match]);
  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?&met=Odds&matchId=${id}&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setOdds(json.result[id]);
        });
    }
    getData();
  }, [match]);

  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${getLeagueId}&APIkey=${api_key}`
      )
      .then((res) => res.json())
      .then((json) => {
          setTable(json.result.total);
          setHomeTable(json.result.home);
          setAwayTable(json.result.away);
          setMappedTable(json.result.total);
        });
      }
    getData();
  }, [getLeagueId]);

  useEffect(() => {
    const fetchData = () => {
      getMatchUpdate(id,setMatch, setEvents, setStats);
    };
    fetchData();
    const interval = setInterval(() => {
      getMatchUpdate(id,setMatch, setEvents, setStats);
    }, 20000);
    return () => clearInterval(interval);
  },[]);

  
  return (
    <div className=" gap-4">
      {windowWidth > 1024 ? (
        <div className=" grid grid-cols-5 gap-4">
          <div className=" col-span-2">
            <CurrentFixtureInfo
              match={match}
              toggleMode={toggleMode}
              loading={loading}
              alert={alert}
              setAlert={setAlert}
              setAlertMessage={setAlertMessage}
              alertMessage={alertMessage}
            />
            <MatchInfo
              match={match}
              statToggle={statToggle}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
            <Odds
              statToggle={statToggle}
              odds={odds}
              handleClick={handleClick}
              bookie={bookie}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
            <Event
              events={events}
              statToggle={statToggle}
              toggleMode={toggleMode}
            />
          </div>
          <div className=" col-span-3">
            <Statistics
              statToggle={statToggle}
              stats={stats}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
            <LineUp
              statToggle={statToggle}
              lineUp={lineUp}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
              playerStat={playerStat}
            />
            <div className="  my-4 px-1 shadow-sm max-h-96 overflow-y-scroll scroll_bar">
              <span className=" text-center text-white text-xl block">H2H</span>
              <HeadToHead
                statToggle={statToggle}
                hToH={hToH}
                windowWidth={windowWidth}
                toggleMode={toggleMode}
                h2hAwayStat={h2hAwayStat}
                h2hDrawStat={h2hDrawStat}
                h2hHomeStat={h2hHomeStat}
              />
            </div>
            <Standing
              table={table}
              changeTable={changeTable}
              mappedTable={mappedTable}
              toggleMode={toggleMode}
              all={all}
              home={home}
              away={away}
              getAwayTeamId={getAwayTeamId}
              getHomeTeamId={getHomeTeamId}
              match={match}
            />
          </div>
        </div>
      ) : (
        <div className=" w-full">
          <div className=" w-full  mx-auto mb-4">
            <CurrentFixtureInfo
              match={match}
              odds={odds}
              handleClick={handleClick}
              handleSeeMore={handleSeeMore}
              bookie={bookie}
              seeMore={seeMore}
              toggleMode={toggleMode}
              alert={alert}
              setAlert={setAlert}
              setAlertMessage={setAlertMessage}
              alertMessage={alertMessage}
            />
          </div>
          <div
            className={`${
              toggleMode
                ? "text-darkText bg-customBgLight"
                : "text-lightText bg-customBg2"
            } fixtures_scroll flex gap-4 overflow-x-scroll m-auto w-[98%] lg:w-full justify-between mb-3 py-2 px-3 rounded text-base sm:text-lg   `}
          >
            {match && (
              <button
                onClick={handleStatToggle}
                className={`${
                  statToggle.includes("Match Info")
                    ? "text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2   "
                    : ""
                } px-2 sm:px-3  cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30`}
              >
                {" "}
                Match Info
              </button>
            )}
            {events && (
              <button
                onClick={handleStatToggle}
                className={`${
                  statToggle.includes("Events")
                    ? "  text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2  "
                    : ""
                }  sm:px-3 px-2 cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30 `}
              >
                {" "}
                Events
              </button>
            )}
            {hToH && hToH.length !== 0 && (
              <button
                onClick={handleStatToggle}
                className={`${
                  statToggle.includes("H2H")
                    ? "   text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2  "
                    : ""
                }  px-2 sm:px-3  cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30`}
              >
                {" "}
                H2H
              </button>
            )}
            {stats && stats.length !== 0 && (
              <button
                onClick={handleStatToggle}
                className={`${
                  statToggle.includes("Stats")
                    ? "   text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2  "
                    : ""
                } px-2 sm:px-3  cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30`}
              >
                Stats
              </button>
            )}
            <button
              onClick={handleStatToggle}
              className={`${
                statToggle.includes("Line-Up")
                  ? "  text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2   "
                  : ""
              } px-2 sm:px-3  cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30`}
            >
              Line-Up
            </button>
            {odds && (
              <button
                onClick={handleStatToggle}
                className={`${
                  statToggle.includes("Odds")
                    ? "  text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2   "
                    : ""
                } px-2 sm:px-3  cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30`}
              >
                {" "}
                Odds
              </button>
            )}
            {table && (
              <button
                onClick={handleStatToggle}
                className={`${
                  statToggle.includes("Table")
                    ? "  text-customBg after:block after:bg-customBg after:w-[100%] after:scale-[120%] after:h-[2px] after:animate-sel2   "
                    : ""
                } px-2 sm:px-3  cursor-pointer flex flex-col items-center flex-shrink-0 font-medium sm:font-semibold active:bg-gray-700 active:bg-opacity-30`}
              >
                {" "}
                Table
              </button>
            )}
          </div>
          <div>
            <MatchInfo
              match={match}
              statToggle={statToggle}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
          </div>
          <div>
            <Event
              events={events}
              statToggle={statToggle}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
          </div>
          <div>
            <HeadToHead
              statToggle={statToggle}
              hToH={hToH}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
              h2hAwayStat={h2hAwayStat}
              h2hDrawStat={h2hDrawStat}
              h2hHomeStat={h2hHomeStat}
            />
          </div>
          <div>
            <Odds
              statToggle={statToggle}
              odds={odds}
              handleClick={handleClick}
              bookie={bookie}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
          </div>

          <div>
            <Statistics
              statToggle={statToggle}
              stats={stats}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
            />
          </div>
          <div>
            <LineUp
              statToggle={statToggle}
              lineUp={lineUp}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
              playerStat={playerStat}
            />
          </div>
          <div>
            <Standing
              table={table}
              changeTable={changeTable}
              mappedTable={mappedTable}
              toggleMode={toggleMode}
              all={all}
              home={home}
              away={away}
              statToggle={statToggle}
              windowWidth={windowWidth}
              getAwayTeamId={getAwayTeamId}
              getHomeTeamId={getHomeTeamId}
              match={match}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentFixtures;
