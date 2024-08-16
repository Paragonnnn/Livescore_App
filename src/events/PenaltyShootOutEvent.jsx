import React from "react";
import { ball, ogball, assist } from "..";

const PenaltyShootOutEvent = ({ events, toggleMode }) => {
  return (
    <div>
      {events &&
        events
          .filter((eve) => eve.info_time === "Penalty")
          .sort((a, b) => parseInt(a.time) - parseInt(b.time))
          .map(
            (eve, index) =>
              (eve.home_scorer ||
                eve.away_scorer ||
                eve.home_fault ||
                eve.away_fault) && (
                <div key={index} className="py-2 ">
                  {index === 0 && (
                    <div
                      className={`${
                        toggleMode ? "bg-customBgLight" : "bg-customBg2"
                      } text-center  mb-2 text-lg p-2`}
                    >
                      Penalty Shoot-Out
                    </div>
                  )}
                  {
                    <div className="flex justify-between py-2 items-center">
                      {/* <div className='w-16 text-center text-xs '>{eve.time}</div> */}
                      <div className="flex  w-full justify-between items-center">
                        <div className="w-[calc(50%-35px)] ">
                          {eve.card && eve.home_fault && (
                            <div className="flex gap-1 justify-end items-center text-xs">
                              {eve.home_fault}
                              <div
                                className={`${
                                  eve.card === "yellow card"
                                    ? "bg-yellow-500"
                                    : "bg-red-700"
                                } w-4 h-5 rounded-[2px]`}
                              ></div>
                            </div>
                          )}
                          {eve.home_scorer && (
                            <div className="flex gap-1 justify-end text-xs">
                              <div className="flex flex-col items-end">
                                <div className=" ">{eve.home_scorer}</div>
                                {eve.home_assist && (
                                  <div
                                    className={` flex gap-1 items-center  font-semibold opacity-70 w-fit `}
                                  >
                                    {eve.home_assist}{" "}
                                    <img
                                      src={assist}
                                      className=" w-[15px] h-[15px]"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="relative">
                                <img
                                  src={
                                    eve.home_scorer.includes("(o.g.)")
                                      ? ogball
                                      : ball
                                  }
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                                <div className=" opacity-70 absolute top-[-5px] right-0">
                                  {eve.info === "Penalty" ? "p" : ""}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={`${index === 0 ? ' before:hidden' : ''} w-[40px] h-[40px] text-xxs sm:text-xs opacity-60 flex items-center gap-1 justify-center border-[2px] border-solid relative bg-customBg2 border-customBg rounded-full before:w-[2px] before:h-[34px] before:bg-customBg before:absolute before:-z-20  before:bottom-[36px] before:block`}>
                          {eve.time}
                          {/* {(eve.home_scorer || eve.away_scorer) &&
                            !isNaN(eve.score.slice(0, 1)) && (
                              <div>({eve.score})</div>
                            )} */}
                        </div>
                        <div className="w-[calc(50%-35px)] ">
                          {eve.away_scorer && (
                            <div className="flex gap-1 items-center text-xs">
                              <div className="relative">
                                <img
                                  src={
                                    eve.away_scorer.includes("(o.g.)")
                                      ? ogball
                                      : ball
                                  }
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                                <div className=" opacity-70 absolute top-[-5px] right-0">
                                  {eve.info === "Penalty" ? "p" : ""}
                                </div>
                              </div>
                              <div className="flex flex-col">
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
                            <div className="flex gap-1 items-center text-xs">
                              <div
                                className={`${
                                  eve.card === "yellow card"
                                    ? "bg-yellow-500"
                                    : "bg-red-700"
                                } w-4 h-5 rounded-[2px]`}
                              ></div>
                              {eve.away_fault}
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

export default PenaltyShootOutEvent;
