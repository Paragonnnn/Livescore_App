import React from "react";
import FirstHalfEvent from "./FirstHalfEvent";
import SecondHalfEvent from "./SecondHalfEvent";
import ExtraTimeEvent from "./ExtraTimeEvent";
import PenaltyShootOutEvent from "./PenaltyShootOutEvent";

const Event = ({ events, statToggle, windowWidth, toggleMode }) => {
  return (
    <div className={``}>
      <div
        className={`${
          windowWidth < 1024 &&
          (statToggle.includes("Events") ? "block" : "hidden")
        } ${
          toggleMode ? "text-darkText" : "text-lightText"
        } p-2  shadow-sm rounded lg:animate-zoom animate-swipe`}
      >
        {events.length === 0 ? (
          <div>no event yet</div>
        ) : (
          <>
            {/* <div className=' bg-customBg  w-fit px-4 rounded-full mb-2'>Events</div> */}
            <FirstHalfEvent events={events} toggleMode={toggleMode} />
            <SecondHalfEvent events={events} toggleMode={toggleMode}/>
            <ExtraTimeEvent events={events} toggleMode={toggleMode}/>
            <PenaltyShootOutEvent events={events} toggleMode={toggleMode}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Event;
