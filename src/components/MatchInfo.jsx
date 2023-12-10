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
        } lg:animate-zoom animate-swipe `}
      >
        {match &&
          match.map((match, index) => (
            <div key={index} className=" flex flex-col gap-2">
              <div className="border-2 border-solid border-customBg2 px-3 py-2 rounded">
                <img
                  src={toggleMode ? lightStadium : stadium}
                  alt=""
                  className=" h-5 w-5 opacity-60"
                />
                {match.event_stadium}
              </div>
              <div className="border-2 border-solid border-customBg2 px-3 py-2 rounded">
                <img
                  src={toggleMode ? darkWhistle : whistle}
                  alt=""
                  className=" h-5 w-5 opacity-60"
                />
                {match.event_referee}
              </div>
              <div className=" border-2 border-solid border-customBg2 px-3 py-2 rounded ">
                <Calendar toggleMode={toggleMode} />
                {/* <img src={toggleMode? darkCalendar: calendar2} alt="" /> */}
                {match.event_date}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MatchInfo;
