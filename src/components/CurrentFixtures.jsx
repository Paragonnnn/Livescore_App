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

const CurrentFixtures = ({ toggleMode, windowWidth }) => {
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
  const { id } = useParams();

  const handleClick = (e) => {
    let book = e.target.innerHTML;
    setBookie(book);
    console.log(book);
  };
  const handleSeeMore = () => {
    setSeeMore((prev) => !prev);
  };
  const handleStatToggle = (e) => {
    let current = e.target.innerHTML;
    setStatToggle(current);

    console.log(statToggle, current);
    // if (!statToggle.includes(current)) {
    //   setStatToggle([current])
    // }
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

  const api_key = import.meta.env.VITE_api_key;
  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Fixtures&matchId=${id}&timezone=Africa/Lagos&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setMatch(json.result);
          console.log(json.result);
          setStats(json.result.map((s) => s.statistics));
          setLineUp(json.result.map((s) => s.lineups));
          console.log(json.result.map((s) => s.lineups));
          console.log(json.result.map((s) => s.statistics));
          // setEvents((json.result.cards).concat(json.result.goalscorers))
          // setCards(json.result.map(c => (c.cards)))
          // setGoalscorers(json.result.map(g => (g.goalscorers)))
          setEvents(
            json.result
              .map((c) => c.cards)
              .concat(json.result.map((g) => g.goalscorers))
              .concat(json.result.map((s) => s.substitutes))
              .reduce((a, c) => {
                return a.concat(c);
              }, [])
          );
          console.log(
            json.result
              .map((c) => c.cards)
              .concat(json.result.map((g) => g.goalscorers))
              .concat(json.result.map((s) => s.substitutes))
              .reduce((a, c) => {
                return a.concat(c);
              }, [])
          );
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
          console.log(json.result.H2H);
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
          console.log(json.result[id]);
        });
    }
    getData();
  }, [match]);

  return (
    <div className=" gap-4">
      {windowWidth > 1024 ? (
        <div className=" grid grid-cols-5 gap-4">
          <div className=" col-span-2">
            <CurrentFixtureInfo match={match} toggleMode={toggleMode} />
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
            />
          </div>
        </div>
      ) : (
        <div className="">
          <div className=" w-full  mx-auto mb-4">
            <CurrentFixtureInfo
              match={match}
              odds={odds}
              handleClick={handleClick}
              handleSeeMore={handleSeeMore}
              bookie={bookie}
              seeMore={seeMore}
              toggleMode={toggleMode}
            />
          </div>
          <div
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } fixtures_scroll flex gap-4 overflow-x-scroll m-auto w-[95vw] sm:w-full justify-between mb-3 py-2 px-3 rounded text-base sm:text-lg  bg-customBg2 `}
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentFixtures;
