import React from "react";
import { Link } from "react-router-dom";

const LineUp = ({ statToggle, lineUp, windowWidth, toggleMode }) => {
  return (
    <div
      className={`${
        windowWidth < 1024 &&
        (statToggle.includes("Line-Up") ? "block" : "hidden")
      } ${toggleMode ? "text-darkText" : "text-lightText"}`}
    >
      <div className=" text-xl font-bold text-customBg bg-customBg2 mb-4 p-2 rounded ">
        Line Up
      </div>
      <div
        className={` flex justify-between flex-col sm:flex-row lg:animate-zoom animate-swipe bg-customBg2 p-2 rounded `}
      >
        <div className=" sm:w-[48%] w-full  ">
          <div className="  divide-y divide-black">
            {lineUp &&
              lineUp.map((coach) =>
                coach.home_team.coaches.map((coache, index) => (
                  <div key={index} className=" text-base">
                    {coache.coache}
                    <div className=" opacity-60">(coach)</div>
                  </div>
                ))
              )}
            <div className=" hover:">
              {lineUp &&
                lineUp.map((lineUp, index) => (
                  <div key={index} className="divide-y divide-black">
                    <div className=" text-base sm:text-lg font-semibold text-customBg text-center sm:text-left">
                      Home Line-Up
                    </div>
                    {lineUp.home_team.starting_lineups
                      .sort(
                        (a, b) =>
                          parseInt(a.player_position) -
                          parseInt(b.player_position)
                      )
                      .map((startingLineUp, index) => (
                        <div
                          key={index}
                          className="py-2 flex gap-2 px-2 text-xs sm:text-base "
                        >
                          <Link
                            to={`/player/${startingLineUp.player.replace(
                              / +/g,
                              "-"
                            )}/${startingLineUp.player_key}`}
                            className=" flex gap-4 items-center"
                          >
                            <div className="  opacity-60 border-2 border-solid border-white h-7 w-7 flex justify-center items-center rounded-full">
                              {startingLineUp.player_number}
                            </div>
                            {startingLineUp.player}
                          </Link>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
          <div className="divide-y divide-black">
            <div className=" text-base sm:text-lg text-center sm:text-left font-semibold mt-4 text-customBg">
              Home Sub
            </div>
            {lineUp &&
              lineUp.map((lineUp) =>
                lineUp.home_team.substitutes.map((sub, index) => (
                  <div
                    key={index}
                    className="py-2 flex gap-2 px-2 text-xs sm:text-base "
                  >
                    <Link
                      to={`/player/${sub.player.replace(/ +/g, "-")}/${
                        sub.player_key
                      }`}
                      className=" flex gap-4 items-center"
                    >
                      <div className="opacity-60 border-2 border-solid border-white h-7 w-7 flex justify-center items-center rounded-full">
                        {sub.player_number}
                      </div>
                      {sub.player}
                    </Link>
                  </div>
                ))
              )}
          </div>
        </div>
        <div className=" sm:w-[48%] ">
          <div className="divide-y divide-black">
            {lineUp &&
              lineUp.map((coach) =>
                coach.away_team.coaches.map((coache, index) => (
                  <div key={index} className=" sm:text-right text-base">
                    {coache.coache}
                    <div className=" opacity-60">(coach)</div>
                  </div>
                ))
              )}
            <div className=" text-base sm:text-lg font-semibold sm:text-right text-customBg text-center">
              Away Line-Up
            </div>
            {lineUp &&
              lineUp.map((lineUp, index) => (
                <div key={index} className="divide-y divide-black ">
                  {lineUp.away_team.starting_lineups
                    .sort(
                      (a, b) =>
                        parseInt(a.player_position) -
                        parseInt(b.player_position)
                    )
                    .map((startingLineUp, index) => (
                      <div
                        key={index}
                        className=" py-2 flex sm:justify-end px-2 text-xs sm:text-base"
                      >
                        <div className=" flex sm:flex-row flex-row-reverse gap-2">
                          <Link
                            to={`/player/${startingLineUp.player.replace(
                              / +/g,
                              "-"
                            )}/${startingLineUp.player_key}`}
                            className=" flex gap-4 items-center"
                          >
                            {startingLineUp.player}
                          <div className="opacity-60 border-2 border-solid border-white h-7 w-7 flex justify-center items-center rounded-full">
                            {startingLineUp.player_number}
                          </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
          <div className="divide-y divide-black ">
            <div className=" text-base sm:text-lg font-semibold mt-4 sm:text-right text-customBg text-center">
              Away Sub
            </div>
            {lineUp &&
              lineUp.map((lineUp) =>
                lineUp.away_team.substitutes.map((sub, index) => (
                  <div
                    key={index}
                    className="py-2 flex sm:justify-end px-2 text-xs sm:text-base "
                  >
                    <div className=" flex sm:flex-row flex-row-reverse gap-2">
                      <Link
                        to={`/player/${sub.player.replace(/ +/g, "-")}/${
                            sub.player_key
                        }`}
                        className=" flex gap-4 items-center"
                      >
                        {sub.player}
                        <div className="opacity-60 border-2 border-solid border-white h-7 w-7 flex justify-center items-center rounded-full">{sub.player_number}</div>
                      </Link>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineUp;
