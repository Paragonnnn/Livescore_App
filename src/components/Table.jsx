import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const Table = ({toggleMode}) => {
  const [table, setTable] = useState([]);
  const [homeTable, setHomeTable] = useState([]);
  const [awayTable, setAwayTable] = useState([]);
  const [mappedTable, setMappedTable] = useState(table);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topScorers, setTopScorers] = useState([]);
  const [changeTable, setChangeTable] = useState("all");

  const { id } = useParams();
  const home = () => {
    setChangeTable("home");
    setMappedTable(homeTable);
    console.log(changeTable);
  };
  const away = () => {
    setChangeTable("away");
    setMappedTable(awayTable);
    console.log(changeTable);
  };
  const all = () => {
    setChangeTable("all");
    setMappedTable(table);
    console.log(changeTable);
  };

  const api_key = import.meta.env.VITE_api_key;

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await fetch(
        `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${id}&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setTable(json.result.total);
          setMappedTable(json.result.total);
          console.log(json.result.total);
          setHomeTable(json.result.home);
          setAwayTable(json.result.away);
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
    getData();
  }, [id]);
  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?&met=Topscorers&leagueId=${id}&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((scorers) => {
          setTopScorers(scorers.result);
          console.log(scorers.result);
        })
        .catch((err) => {});
    }
    getData();
  }, [id]);

  return (
    <div className="">
      {error && <Error />}
      {loading && <Loading />}
      {table && table.length == 0 && <h3>No data found</h3>}
      <div className={`${toggleMode ? 'text-darkText' : 'text-lightText'} gap-4 w-full lg:grid grid-cols-3 `}>
        {table.length != 0 && (
          <div className="bg-customBg2  divide-y divide-black shadow-sm rounded-md px-1 mb-5 col-span-2">
            <div className="px-4 py-2">
              <button
                className={`${
                  changeTable === "all"
                    ? "border-customBg text-customBg"
                    : " "
                } text-base sm:text-[20px] py-[2px] sm:py-1 p-3 sm:px-6 rounded-full border border-solid ${toggleMode ? 'border-darkText': 'border-lightText'} mr-4 hover:opacity-80`}
                onClick={all}
              >
                All
              </button>
              <button
                className={`${
                  changeTable === "home"
                    ? "border-customBg text-customBg"
                    : " "
                } text-base sm:text-[20px] py-[2px] sm:py-1 p-3 sm:px-6 rounded-full border border-solid ${toggleMode ? 'border-darkText': 'border-lightText'} mr-4 hover:opacity-80`}
                onClick={home}
              >
                Home
              </button>
              <button 
                className={`${
                  changeTable === "away"
                    ? "border-customBg text-customBg"
                    : " "
                } text-base sm:text-[20px] py-[2px] sm:py-1 p-3 sm:px-6 rounded-full border border-solid ${toggleMode ? 'border-darkText': 'border-lightText'} hover:opacity-80`}
                onClick={away}
              >
                Away
              </button>
            </div>

            <section className="">
              <section className=" flex justify-between md:p-4 p-1 text-xxs md:text-base">
                {/* <div className='p-2 w-fit border border-solid border-lighterOrange'>S/P</div> */}
                <div className="md:p-2 p-1 w-fit ">Club</div>
                <section className="flex justify-between md:w-[350px] w-[150px] ">
                  <div className="md:p-2 p-1 ">MP</div>
                  <div className="md:p-2 p-1 ">W</div>
                  <div className="md:p-2 p-1 ">D</div>
                  <div className="md:p-2 p-1 ">L</div>
                  <div className="md:p-2 p-1 hidden sm:block">GF</div>
                  <div className="md:p-2 p-1 hidden sm:block">GA</div>
                  <div className="md:p-2 p-1 ">GD</div>
                  <div className="md:p-2 p-1 ">Pts</div>
                </section>
              </section>
            </section>
            <section className="divide-y divide-black">
              {mappedTable &&
                mappedTable.map((table, index) => (
                  <section
                    key={index}
                    className="flex justify-between items-center gap-4 md:px-4 p-1   "
                  >
                    <div className="md:p-2 p-1 flex items-center gap-2">
                      <div className="md:p-2 p-1 ">{table.standing_place}.</div>
                      <img
                        className="w-4 rounded-full h-4 sm:w-6 sm:h-6"
                        src={table.team_logo}
                        alt=""
                      />
                      <Link
                        className="text-xs sm:text-sm md:text-lg"
                        to={`/team/${table.standing_team.replace(/ +/g, "-")}/${
                          table.team_key
                        }`}
                      >
                        {table.standing_team}
                      </Link>
                    </div>
                    <section className="flex justify-between md:w-[350px] w-[150px] text-xxs md:text-base ">
                      <div className="md:p-2 p-1">{table.standing_P}</div>
                      <div className="md:p-2 p-1">{table.standing_W}</div>
                      <div className="md:p-2 p-1">{table.standing_D}</div>
                      <div className="md:p-2 p-1">{table.standing_L}</div>
                      <div className="md:p-2 p-1 hidden sm:block">
                        {table.standing_F}
                      </div>
                      <div className="md:p-2 p-1 hidden sm:block">
                        {table.standing_A}
                      </div>
                      <div className="md:p-2 p-1">{table.standing_GD}</div>
                      <div className="md:p-2 p-1">{table.standing_PTS}</div>
                    </section>
                  </section>
                ))}
            </section>
          </div>
        )}

        <div className=" col-span-1 ">
          {topScorers && table.length != 0 && (
            <div className="  h-fit w-full bg-customBg2 divide-y divide-black px-4 sticky top-[80px] ">
              <div className=" text-2xl md:text-[40px] text-center py-2">
                League Top Scorers
              </div>
              <div className=" text-[20px] sm:text-[24px]  flex justify-between p-2">
                <div>Player</div>
                <div>Goals</div>
              </div>
              {
                <div className=" divide-y divide-black sm:text-base text-xs">
                  {topScorers &&
                    topScorers.map((top, index) => (
                      <div
                        className="flex justify-between p-2 py-2"
                        key={index}
                      >
                        <div>
                          {index + 1}. {top.player_name}
                        </div>
                        <div>{top.goals}</div>
                      </div>
                    ))}
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
