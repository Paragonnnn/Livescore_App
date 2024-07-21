import React from "react";

const Statistics = ({ statToggle, stats, windowWidth, toggleMode }) => {
  console.log(stats);
  return (
    <div>
      <div
        className={`${
          windowWidth < 1024 &&
          (statToggle.includes("Stats") ? "block" : "hidden")
        }   px-4 py-1 lg:animate-zoom animate-swipe`}
      >
        {stats.length == 0 ? (
          <div>no stats yet</div>
        ) : (
          <>
            {stats &&
              stats.map((stat) =>
                stat.map((s,index) => (
                  s.home === "0" && s.away === "0" ? null :
                  <div
                    key={index}
                    className={`${
                      toggleMode ? "text-darkText" : "text-lightText"
                    } `}
                  >
                    <div
                      className={`${
                        toggleMode ? "bg-customBgLight" : "bg-customBg2"
                      } text-center  text-lg my-2  py-2 rounded-lg`}
                    >
                      {s.type}
                    </div>
                    <div
                      className={` flex items-center justify-center gap-2  w-full py-[2px] rounded px-2`}
                    >
                      <div className="w-[45%]  h-[6px] rounded-l-full overflow-hidden flex justify-end  ">
                        <div
                          className={
                            s.type === "Ball Possession"
                              ? `w-[${s.home}] ${
                                  s.type === "Ball Possession" &&
                                  +s.home.slice(0, s.home.indexOf("%")) >
                                    +s.away.slice(0, s.away.indexOf("%"))
                                    ? "bg-green-600"
                                    : "bg-red-600"
                                }  h-[6px]`
                              : `w-[${Math.round(
                                  ((s.home).includes(',') ? +(s.home).split(',')[0] : +s.home * 100) / (((s.home).includes(',') ? +(s.home).split(',')[0] : +s.home) + ((s.away).includes(',') ? +(s.away).split(',')[0] : +s.away))
                                )}%] ${
                                  ((s.home).includes(',') ? +(s.home).split(',')[0] : +s.home) === ((s.away).includes(',') ? +(s.away).split(',')[0] : +s.away)
                                    ? "bg-gray-400"
                                    : ((s.home).includes(',') ? parseFloat((s.home).split(',')[0]) : +s.home) > ((s.away).includes(',') ? +(s.away).split(',')[0] : +s.away)
                                    ? " bg-green-500"
                                    : "bg-red-500"
                                }  h-[6px]`
                          }
                        ></div>
                      </div>
                      <div className="flex  w-[100px] justify-center  opacity-50">
                        {(s.home).includes(',') ? (s.home).split(',')[0] : s.home} - {(s.away).includes(',') ? (s.away).split(',')[0] : s.away}
                      </div>
                      <div className="w-[45%]  h-[6px] overflow-hidden  rounded-r-full  ">
                        <div
                          className={
                            s.type === "Ball Possession"
                              ? `w-[${s.away}] ${
                                  s.type === "Ball Possession" &&
                                  +s.home.slice(0, s.home.indexOf("%")) >
                                    +s.away.slice(0, s.away.indexOf("%"))
                                    ? "bg-red-600"
                                    : "bg-green-600"
                                }   h-[6px]`
                              : `w-[${Math.round(
                                  (+s.away * 100) / (+s.home + +s.away)
                                )}%]  ${
                                  +s.home === +s.away
                                    ? "bg-gray-400"
                                    : +s.home > +s.away
                                    ? " bg-red-500"
                                    : "bg-green-600"
                                }  h-[6px] `
                          }
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </>
        )}

      </div>
    </div>
  );
};

export default Statistics;
