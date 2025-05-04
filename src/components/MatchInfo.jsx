import React from "react";
import {
  calendar2,
  darkCalendar,
  darkWhistle,
  lightStadium,
  stadium,
  whistle,
} from "..";
import Calendar from "../svg/Calendar";

const MatchInfo = ({ statToggle, match, windowWidth, toggleMode }) => {
  return (
    <div>
      <div
        className={`${
          windowWidth < 1024 &&
          (statToggle.includes("Match Info") ? "block" : "hidden")
        } ${
          toggleMode ? "text-darkText" : "text-lightText"
        } lg:animate-zoom animate-swipe mb-4 `}
      >
        <div className=" hidden lg:block text-center mb-2 text-gray-200 text-lg">
          Match Info
        </div>
        {match &&
          match.map((match, index) => (
            <div key={index} className=" flex flex-col gap-2">
              {match.event_stadium && (
                <div className="border-2 border-solid border-customBg2 px-3 py-2 rounded w-full flex flex-col items-center gap-1">
                  <div className=" flex gap-1 items-center">
                    <img
                      src={toggleMode ? lightStadium : stadium}
                      alt=""
                      className=" h-5 w-5 opacity-60"
                    />
                    <div className=" opacity-70">(Stadium)</div>
                  </div>
                  <div className=" text-center">{match.event_stadium}</div>
                </div>
              )}
              <div className=" flex gap-3">
                {match.event_referee && (
                  <div className="border-2 border-solid border-customBg2 px-3 py-2 rounded flex-auto flex flex-col items-center gap-1">
                    <div className=" flex gap-1 items-center">
                      <img
                        src={toggleMode ? darkWhistle : whistle}
                        alt=""
                        className=" h-5 w-5 opacity-60"
                      />
                      <div className=" opacity-70">(Refree)</div>
                    </div>
                    <div className=" text-center">{match.event_referee}</div>
                  </div>
                )}
                {match.event_date && (
                  <div className=" border-2 border-solid border-customBg2 px-3 py-2 rounded flex-auto flex flex-col items-center gap-1">
                    <div className=" flex gap-1 items-center">
                      <Calendar toggleMode={toggleMode} />
                      <div className=" opacity-70">(Date)</div>
                    </div>
                    {/* <img src={toggleMode? darkCalendar: calendar2} alt="" /> */}
                    <div className=" text-center">{match.event_date}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MatchInfo;
