import React, { useState } from "react";
import Calendar2 from "../svg/Calendar2";
import SearchSvg from "../svg/SearchSvg";
import TransferSvg from "../svg/TransferSvg";
import NewsSvg from "../svg/NewsSvg";
import { Link } from "react-router-dom";

const BottomNavBar = ({setShowCalendar, calendarRef, setFocus,handleSearchToggleClick}) => {
    const [active,setActive] = useState()
  return (
    <div className={` flex justify-between px-4 w-full`}>
      <div>
        <Calendar2
          setShowCalendar={setShowCalendar}
          calendarRef={calendarRef}
          
        />
      </div>
      <div>
        <SearchSvg
          handleSearchToggleClick={handleSearchToggleClick}
          setFocus={setFocus}
        />
      </div>
      <Link to={`/transfers`}>
        <TransferSvg />
      </Link>
      {/* <div>
            <Star2 />
          </div> */}
      <Link to={'/news'}>
        <NewsSvg />
      </Link>
    </div>
  );
};

export default BottomNavBar;
