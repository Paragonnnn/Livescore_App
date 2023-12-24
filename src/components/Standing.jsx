import React from "react";
import { Link } from "react-router-dom";

const Standing = ({ table, changeTable, mappedTable, toggleMode,all,home,away,statToggle,windowWidth,getAwayTeamId,getHomeTeamId }) => {
  return (
    <div className={`${
        windowWidth < 1024 &&
        (statToggle.includes("Table") ? "block" : "hidden")
      } ${toggleMode ? 'text-darkText' : 'text-lightText'} col-span-2`}>
      {table.length != 0 && (
        <div className="bg-customBg2  divide-y divide-black shadow-sm rounded-md px-1 mb-5 ">
          <div className="px-4 py-2">
            <button
              className={`${
                changeTable === "all" ? "border-customBg text-customBg" : " "
              } text-base sm:text-[20px] py-[2px] sm:py-1 p-3 sm:px-6 rounded-full border border-solid ${
                toggleMode ? "border-darkText" : "border-lightText"
              } mr-4 hover:opacity-80`}
              onClick={all}
            >
              All
            </button>
            <button
              className={`${
                changeTable === "home" ? "border-customBg text-customBg" : " "
              } text-base sm:text-[20px] py-[2px] sm:py-1 p-3 sm:px-6 rounded-full border border-solid ${
                toggleMode ? "border-darkText" : "border-lightText"
              } mr-4 hover:opacity-80`}
              onClick={home}
            >
              Home
            </button>
            <button
              className={`${
                changeTable === "away" ? "border-customBg text-customBg" : " "
              } text-base sm:text-[20px] py-[2px] sm:py-1 p-3 sm:px-6 rounded-full border border-solid ${
                toggleMode ? "border-darkText" : "border-lightText"
              } hover:opacity-80`}
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
                  className={`  flex justify-between items-center gap-4 md:px-4 p-1 `}
                >
                  <div className={`${getAwayTeamId == table.team_key ? 'border-l-4 border-solid border-customBg' : ''} ${getHomeTeamId == table.team_key ? 'border-l-4 border-solid border-customBg' : ''}  md:p-2 p-1 flex items-center gap-2 `}>
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
    </div>
  );
};

export default Standing;
