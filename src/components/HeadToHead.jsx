import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeadToHead = ({
  statToggle,
  hToH,
  windowWidth,
  toggleMode,
  h2hAwayStat,
  h2hDrawStat,
  h2hHomeStat,
}) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="">
      <div
        className={`${
          windowWidth < 1024 &&
          (statToggle.includes("H2H") ? "block" : "hidden")
        }   animate-zoom`}
      >
        <div className=" w-full flex">
          {h2hHomeStat > 0 && (
            <div
              className={` w-[${Math.round(
                (h2hHomeStat / (h2hAwayStat + h2hDrawStat + h2hHomeStat)) * 100
              )}%] rounded-l-sm bg-green-600 px-1`}
            >
              {h2hHomeStat}
            </div>
          )}
          {h2hDrawStat > 0 && (
            <div
              className={` w-[${Math.round(
                (h2hDrawStat / (h2hAwayStat + h2hDrawStat + h2hHomeStat)) * 100
              )}%] bg-gray-400 px-1`}
            >
              {h2hDrawStat}
            </div>
          )}
          {h2hAwayStat > 0 && (
            <div
              className={` w-[${Math.round(
                (h2hAwayStat / (h2hAwayStat + h2hDrawStat + h2hHomeStat)) * 100
              )}%] rounded-r-sm bg-red-600 px-1`}
            >
              {h2hAwayStat}
            </div>
          )}
        </div>
        <div className=" flex gap-4 my-1">
          <div
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } flex gap-1 items-center`}
          >
            <div className=" h-2 w-2 rounded-full bg-green-600"></div>Home
          </div>
          <div
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } flex gap-1 items-center`}
          >
            <div className=" h-2 w-2 rounded-full bg-gray-400"></div>Draw
          </div>
          <div
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } flex gap-1 items-center`}
          >
            <div className=" h-2 w-2 rounded-full bg-red-600"></div>Away
          </div>
        </div>
        {hToH &&
          hToH.map((h) => (
            <div key={h.event_key} className=" py-4  divide-y divide-black ">
              <div
                className={`${
                  toggleMode ? "bg-customBgLight" : "bg-customBg2"
                } mb-2 text-lg font-semibold rounded  text-customBg p-2`}
              >
                <div>{h.league_name}</div>
              </div>
              <div
                className={`${
                  toggleMode ? "text-darkText" : "text-lightText"
                } `}
              >
                <div className="flex  items-center">
                  <div className="flex flex-col items-center w-16 mt-2 border-r border-solid border-black opacity-70 text-xs">
                    <div>
                      {h.event_date.slice(0, h.event_date.indexOf("-")) ===
                      year.toString()
                        ? h.event_date.slice(
                            h.event_date.indexOf("-") + 1,
                            h.event_date.lenght
                          )
                        : h.event_date.slice(0, h.event_date.indexOf("-"))}
                    </div>
                    <div>{h.event_status === "Finished" && "FT"}</div>
                  </div>
                  <Link
                    to={`/fixture/${h.league_name.replace(
                      / +/g,
                      "-"
                    )}/${h.event_home_team.replace(
                      / +/g,
                      "-"
                    )}-${h.event_away_team.replace(/ +/g, "-")}/${h.event_key}`}
                    className="w-full mt-2 px-2"
                  >
                    <div className="flex justify-between ">
                      <div className="flex gap-1 items-center">
                        <img
                          src={h.home_team_logo}
                          className=" h-3 w-3"
                          alt=""
                        />
                        <div>{h.event_home_team}</div>
                      </div>
                      <div className=" pr-1">
                        {h.event_final_result.slice(
                          0,
                          h.event_final_result.indexOf("-")
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="flex gap-1 items-center">
                        <img
                          src={h.away_team_logo}
                          className=" h-3 w-3"
                          alt=""
                        />
                        <div>{h.event_away_team}</div>
                      </div>
                      <div className=" pr-1">
                        {h.event_final_result.slice(
                          h.event_final_result.indexOf("-") + 1,
                          h.event_final_result.lenght
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HeadToHead;
