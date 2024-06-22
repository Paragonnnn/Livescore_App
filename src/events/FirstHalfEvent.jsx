import React from "react";
import { ball, ogball, assist, sub, subIn, subOut } from "..";

const FirstHalfEvent = ({ events, toggleMode }) => {
  return (
    <div className=" 0">
      {events &&
        events
          .filter((eve) => eve.info_time === "1st Half")
          .sort((a, b) => eval(a.time) - eval(b.time))
          .map(
            (eve, index) =>
              (eve.home_scorer ||
                eve.away_scorer ||
                eve.home_fault ||
                eve.away_fault) && (
                <div key={index} className="py-2 divide-y-2 divide-customBg2 ">
                  {index === 0 && (
                    <div
                      className={`${
                        toggleMode ? "bg-customBgLight" : "bg-customBg2"
                      } text-center mt-[-10px] mb-2 text-lg p-2`}
                    >
                      First Half
                    </div>
                  )}
                  {
                    <div className="flex gap-4 sm:justify-between items-center py-2 ">
                      {/* <div className='w-fit sm:w-16 text-left sm:text-center text-xxs sm:text-xs opacity-60'>{eve.time}'</div> */}
                      <div className=" flex  w-full justify-between items-center">
                        <div className="w-[calc(50%-35px)] ">
                          {eve.card && eve.home_fault && (
                            <div className="flex gap-1 justify-end items-center text-base text-xxs">
                              {eve.home_fault}
                              <div
                                className={`${
                                  eve.card === "yellow card"
                                    ? "bg-yellow-500"
                                    : "bg-red-700"
                                } w-3 h-4 sm:w-4 sm:h-5 rounded-[2px]`}
                              ></div>
                            </div>
                          )}
                          {eve.home_scorer && !isNaN(eve.score.slice(0, 1)) && (
                            <div className="flex gap-1 justify-end items-center sm:text-xs text-xxs">
                              <div className="flex flex-col items-end">
                                <div className=" ">{eve.home_scorer}</div>
                                {eve.home_assist && (
                                  <div
                                    className={` flex gap-1 items-center font-semibold opacity-70 w-fit `}
                                  >
                                    <img
                                      src={assist}
                                      className=" w-[15px] h-[15px]"
                                    />
                                    {eve.home_assist}
                                  </div>
                                )}
                              </div>
                              <div className="relative">
                                <img
                                  src={
                                    eve.home_scorer.includes("(o.g.)") ||
                                    eve.home_scorer.includes("(OG)")
                                      ? ogball
                                      : ball
                                  }
                                  alt=""
                                  className="w-[16px] h-[16px]"
                                />
                                <div className=" opacity-70 absolute top-[-5px] right-0">
                                  {eve.info === "Penalty" ||
                                  eve.home_scorer.includes("PG")
                                    ? "p"
                                    : ""}
                                </div>
                              </div>
                            </div>
                          )}
                          {!Array.isArray(eve.home_scorer) &&
                            eve.score === "substitution" && (
                              <div className="flex gap-1 justify-end items-center ">
                                <div className=" flex items-end sm:text-xs text-xxs flex-col">
                                  <div className=" text-right">
                                    {" "}
                                    {eve.home_scorer.in}
                                  </div>
                                  <div className=" text-right opacity-70">
                                    {eve.home_scorer.out}
                                  </div>
                                </div>
                                <div className=" flex flex-col  ">
                                  <img
                                    src={subIn}
                                    className="opacity-70 w-4  "
                                    alt=""
                                  />
                                  <img
                                    src={subOut}
                                    className="opacity-70  w-4  "
                                    alt=""
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                        <div>

                        <div className={`${index === 0 ? ' before:hidden' : ''} w-[40px] h-[40px] text-xxs sm:text-xs opacity-60 flex items-center gap-1 justify-center border-[2px] border-solid relative bg-customBg2 border-gray-700 rounded-full before:w-[2px] before:h-[34px] before:bg-gray-700 before:absolute before:-z-20  before:bottom-[36px] before:block`}>
                          {eve.time}
                        </div>
                          {/* {(eve.home_scorer || eve.away_scorer) &&
                            !isNaN(eve.score.slice(0, 1)) && (
                              <div>({eve.score})</div>
                            )} */}
                        </div>
                        <div className="w-[calc(50%-35px)] ">
                          {eve.away_scorer && !isNaN(eve.score.slice(0, 1)) && (
                            <div className="flex gap-1 items-center text-xs">
                              <div className="relative">
                                <img
                                  src={
                                    eve.away_scorer.includes("(o.g.)") ||
                                    eve.away_scorer.includes("(OG)")
                                      ? ogball
                                      : ball
                                  }
                                  alt=""
                                  className="w-[16px] h-[16px] "
                                />
                                <div className=" opacity-70 absolute top-[-5px] right-0">
                                  {eve.info === "Penalty" ||
                                  eve.away_scorer.includes("PG")
                                    ? "p"
                                    : ""}
                                </div>
                              </div>
                              <div className="flex flex-col ">
                                <div className=" ">{eve.away_scorer}</div>
                                <div className=" flex gap-1 items-center font-semibold opacity-70">
                                  {eve.away_assist && eve.away_assist}
                                  {eve.away_assist && (
                                    <img
                                      src={assist}
                                      className=" w-[15px] h-[15px]"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {eve.card && eve.away_fault && (
                            <div className="flex gap-1 items-center sm:text-xs text-xxs">
                              <div
                                className={`${
                                  eve.card === "yellow card"
                                    ? "bg-yellow-500"
                                    : eve.card === "red card"
                                    ? "bg-red-700"
                                    : ""
                                } w-3 h-4 sm:w-4 sm:h-5 rounded-[2px]`}
                              ></div>
                              <div>{eve.away_fault}</div>
                            </div>
                          )}
                          {!Array.isArray(eve.away_scorer) &&
                            eve.score === "substitution" && (
                              <div className="flex gap-1  items-center ">
                                <div className=" flex flex-col  ">
                                  <img
                                    src={subIn}
                                    className="opacity-70 w-4  "
                                    alt=""
                                  />
                                  <img
                                    src={subOut}
                                    className="opacity-70  w-4  "
                                    alt=""
                                  />
                                </div>
                                <div className=" flex justify-center sm:text-xs text-xxs flex-col">
                                  <div>{eve.away_scorer.in} </div>
                                  <div className=" opacity-70">
                                    {eve.away_scorer.out}{" "}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )
          )}
    </div>
  );
};

export default FirstHalfEvent;
