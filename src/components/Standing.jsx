import React from "react";
import { Link } from "react-router-dom";

const Standing = ({
  table,
  changeTable,
  mappedTable,
  toggleMode,
  all,
  home,
  away,
  statToggle,
  windowWidth,
  getAwayTeamId,
  getHomeTeamId,
}) => {
  
  // for (let i = 0; i < table.length; i++) {
  //   const element = table[i]
  //   console.log(element.team_key)
  // }
  return (
    <div
      className={`${
        windowWidth < 1024 &&
        (statToggle.includes("Table") ? "block" : "hidden")
      } ${toggleMode ? "text-darkText" : "text-lightText"} col-span-2`}
    >
      {table.length != 0 && (
        <div className={`${
          toggleMode ? "bg-customBgLight" : "bg-customBg2"
        }  divide-y divide-black shadow-sm rounded-md px-1 mb-2 xs:mb-5`}>
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
              <section className="flex justify-between md:w-[350px] xs:w-[150px] w-[80px] ">
                <div className="md:p-2 p-1 ">MP</div>
                <div className="md:p-2 p-1 hidden xs:block">W</div>
                <div className="md:p-2 p-1 hidden xs:block">D</div>
                <div className="md:p-2 p-1 hidden xs:block">L</div>
                <div className="md:p-2 p-1 hidden sm:block ">GF</div>
                <div className="md:p-2 p-1 hidden sm:block">GA</div>
                <div className="md:p-2 p-1 ">GD</div>
                <div className="md:p-2 p-1 ">Pts</div>
                <div className="md:p-2 p-1 ">Form</div>
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
                  <div
                    className={`${
                      getAwayTeamId == table.team_key
                        ? "border-l-4 border-solid border-customBg"
                        : ""
                    } ${
                      getHomeTeamId == table.team_key
                        ? "border-l-4 border-solid border-customBg"
                        : ""
                    }  md:p-2 p-1 flex items-center gap-2 `}
                  >
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
                  <section className="flex justify-between md:w-[350px] xs:w-[150px] w-[80px] text-xxs md:text-base ">
                    <div className="md:p-2 p-1">{table.standing_P}</div>
                    <div className="md:p-2 p-1 hidden xs:block">
                      {table.standing_W}
                    </div>
                    <div className="md:p-2 p-1 hidden xs:block">
                      {table.standing_D}
                    </div>
                    <div className="md:p-2 p-1 hidden xs:block">
                      {table.standing_L}
                    </div>
                    <div className="md:p-2 p-1 hidden sm:block">
                      {table.standing_F}
                    </div>
                    <div className="md:p-2 p-1 hidden sm:block">
                      {table.standing_A}
                    </div>
                    <div className="md:p-2 p-1">{table.standing_GD}</div>
                    <div className="md:p-2 p-1">{table.standing_PTS}</div>
                    <div className="md:p-2 p-1">{table.standing_PTS}</div>
                  </section>
                </section>
              ))}
          </section>
        </div>
      )}
      <div className=" xs:hidden flex gap-2 text-xxs items-center mb-4">
        {" "}
        <svg
          fill=""
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className=" h-3 w-3 fill-customBg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              d="M4.98313549,11.0001422 C5.49589839,10.9914935 5.92501998,11.3703506 5.99116425,11.8666444 L5.99985778,11.9831355 L6.00348884,12.2068855 C6.11245031,15.4321748 8.76323537,17.9999971 11.9999971,17.9999971 C12.1869612,17.9999971 12.3726725,17.9914753 12.5567465,17.9745765 L12.2928932,17.7071068 C11.9023689,17.3165825 11.9023689,16.6834175 12.2928932,16.2928932 C12.6834175,15.9023689 13.3165825,15.9023689 13.7071068,16.2928932 L15.7071068,18.2928932 C16.0976311,18.6834175 16.0976311,19.3165825 15.7071068,19.7071068 L13.7071068,21.7071068 C13.3165825,22.0976311 12.6834175,22.0976311 12.2928932,21.7071068 C11.9023689,21.3165825 11.9023689,20.6834175 12.2928932,20.2928932 L12.6111505,19.9769552 C12.4086045,19.9922816 12.2047796,19.9999971 11.9999971,19.9999971 C7.7687005,19.9999971 4.28886152,16.7094374 4.01666425,12.5105203 L4.00420123,12.2575143 L4.00014222,12.0168645 C3.9908282,11.4646583 4.43092928,11.0094562 4.98313549,11.0001422 Z M11.7071068,2.29289322 C12.0675907,2.65337718 12.0953203,3.22060824 11.7902954,3.61289944 L11.7071068,3.70710678 L11.3891629,4.0230186 C11.5916051,4.00770767 11.7953244,4 12,4 C16.418278,4 20,7.581722 20,12 C20,12.5522847 19.5522847,13 19,13 C18.4477153,13 18,12.5522847 18,12 C18,8.6862915 15.3137085,6 12,6 C11.8129339,6 11.6271216,6.00853145 11.4429483,6.02544919 L11.7071068,6.29289322 C12.0976311,6.68341751 12.0976311,7.31658249 11.7071068,7.70710678 C11.3466228,8.06759074 10.7793918,8.09532028 10.3871006,7.79029539 L10.2928932,7.70710678 L8.29289322,5.70710678 C7.93240926,5.34662282 7.90467972,4.77939176 8.20970461,4.38710056 L8.29289322,4.29289322 L10.2928932,2.29289322 C10.6834175,1.90236893 11.3165825,1.90236893 11.7071068,2.29289322 Z"
            ></path>{" "}
          </g>
        </svg>{" "}
        Rotate your phone for more info.
      </div>
    </div>
  );
};

export default Standing;
