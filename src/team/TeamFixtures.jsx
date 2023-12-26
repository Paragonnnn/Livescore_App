import { evaluate } from "mathjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeamFixtures = ({ teamFixtures, teamResults, toggleMode, id }) => {
  const [filterFixtures, setFilterFixtures] = useState("Fixtures");

 
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <div
        className={` divide-y divide-black ${
          toggleMode ? "text-darkText" : "text-lightText"
        }`}
      >
        <div className="flex gap-4 bg-customBg2 text-customBg p-2">
          <div
            className={`${
              filterFixtures === "Fixtures" ? "bg-customBg text-white" : ""
            } cursor-pointer px-3 py-1 font-bold text-lg border border-solid border-customBg rounded-full hover:bg-opacity-90 active:bg-opacity-80`}
            onClick={() => setFilterFixtures("Fixtures")}
          >
            Fixtures
          </div>
          <div
            className={`${
              filterFixtures === "Results" ? "bg-customBg text-white" : ""
            } cursor-pointer px-3 py-1 font-bold text-lg border border-solid border-customBg rounded-full hover:bg-opacity-90 active:bg-opacity-80`}
            onClick={() => setFilterFixtures("Results")}
          >
            results
          </div>
        </div>
        {teamFixtures &&
          teamResults &&
          (filterFixtures == "Fixtures" ? teamFixtures : teamResults).map(
            (h) => (
              <div key={h.event_key} className=" py-4  divide-y divide-black ">
                <div className=" mb-2 text-lg font-semibold rounded bg-customBg2 text-customBg p-2">
                  <div>{h.league_name}</div>
                </div>
                <div className="">
                  <div className="flex gap-8 items-center relative">
                    <div className="flex flex-col items-center w-14 mt-2">
                      <div>
                        {h.event_date.slice(0, h.event_date.indexOf("-")) ===
                        year.toString()
                          ? h.event_date.slice(
                              h.event_date.indexOf("-") + 1,
                              h.event_date.lenght
                            )
                          : h.event_date.slice(0, h.event_date.indexOf("-"))}
                      </div>
                      <div className={`text-xs`}>
                        {h.event_status === "Finished" ? "FT" : h.event_time}
                      </div>
                    </div>
                    <Link
                      to={`/fixture/${h.league_name.replace(
                        / +/g,
                        "-"
                      )}/${h.event_home_team.replace(
                        / +/g,
                        "-"
                      )}-${h.event_away_team.replace(/ +/g, "-")}/${
                        h.event_key
                      }`}
                      className="w-full mt-2 "
                    >
                      <div className="flex justify-between ">
                        <div>{h.event_home_team}</div>
                        <div className=" pr-1">
                          {h.event_final_result.slice(
                            0,
                            h.event_final_result.indexOf("-")
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>{h.event_away_team}</div>
                        <div className=" pr-1">
                          {h.event_final_result.slice(
                            h.event_final_result.indexOf("-") + 1,
                            h.event_final_result.lenght
                          )}
                        </div>
                      </div>
                      <div
                        className={`${
                          filterFixtures == "Results" ? "block" : "hidden"
                        } absolute right-0 top-[65%] translate-y-[-50%] mr-6`}
                      >
                        {/* {(eval(h.event_final_result) == 0) && <div className=" flex items-center justify-center text-lg font-semibold h-6 w-6 rounded-full bg-gray-500">D</div>}
                        {((h.home_team_key == id) &&
                          eval(h.event_final_result) > 0) && <div className=" flex items-center justify-center text-lg font-semibold h-6 w-6 rounded-full bg-green-600">W</div>}
                        {((h.away_team_key == id) &&
                          eval(h.event_final_result) < 0) && <div className=" flex items-center justify-center text-lg font-semibold h-6 w-6 rounded-full bg-green-600">W</div>}
                        {((h.home_team_key != id) &&
                          eval(h.event_final_result) > 0) && <div className=" flex items-center justify-center text-lg font-semibold h-6 w-6 rounded-full bg-red-600">L</div>}
                        {((h.away_team_key != id) &&
                          eval(h.event_final_result) < 0) && <div className=" flex items-center justify-center text-lg font-semibold h-6 w-6 rounded-full bg-red-600">L</div>} */}
                        
                        {/* {
                          evaluate(h.event_final_result)} */}
                        {/* {new Function('return ' + h.event_final_result)} */}
                        {/* <div>hii</div> */}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default TeamFixtures;
