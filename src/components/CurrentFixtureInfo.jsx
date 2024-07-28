import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Star from "../svg/Star";

const CurrentFixtureInfo = ({
  match,
  toggleMode,
  loading,
  alert,
  setAlert,
  setAlertMessage,
  alertMessage,
}) => {
  return (
    <div className={`${toggleMode ? "text-darkText" : "text-lightText"}`}>
      {loading && (
        <div>
          <div className="p-2 flex justify-between items-center">
            <div className=" flex flex-col justify-center gap-2 items-center w-1/3">
              <div className=" h-12 w-12  bg-[#ffffff10] animate-pulse rounded-xl"></div>
              <div className="bg-[#ffffff10] w-16 h-4"></div>
            </div>
            <div className=" w-1/3 flex justify-center">
              <div className=" h-4 w-8 bg-[#ffffff10] animate-pulse"></div>
            </div>
            <div className=" flex flex-col justify-center gap-2 items-center w-1/3">
              <div className=" h-12 w-12  bg-[#ffffff10] animate-pulse rounded-xl"></div>
              <div className=" w-16 bg-[#ffffff10] h-4"></div>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className=" h-10 w-36 bg-[#ffffff10] mt-6 rounded"></div>
          </div>
        </div>
      )}
      {match &&
        !loading &&
        match.map((match) => (
          <div key={match.event_key}>
            {/* {match.event_home_team} vs {match.event_away_team} */}
            <div
              className={`${
                toggleMode
                  ? "text-darkText bg-customBgLight"
                  : "text-gray-200 bg-customBg2"
              } bg-customBg2 mb-2  p-2 rounded-sm`}
            >
              {/* {match.event_date} */}
              <div className="px-2 md:text-base text-xs">
                {match.league_name}
              </div>
            </div>
            <div
              className={`${
                toggleMode ? "bg-customBgLight" : "bg-customBg2"
              } w-full p-2 px-3 flex items-center rounded mb-4 `}
            >
              <div className="text-center flex gap-5 w-1/3 justify-center items-center ">
                <Star
                  team={match.event_home_team}
                  teamData={{
                    team: match.event_home_team,
                    team_key: match.home_team_key,
                    team_logo: match.home_team_logo,
                    team_country: match.country_name,
                  }}
                  alert={alert}
                  setAlert={setAlert}
                  setAlertMessage={setAlertMessage}
                  alertMessage={alertMessage}
                />
                <div className="flex flex-col items-center gap-1">
                  <Link
                    to={`/team/${match.event_home_team.replace(/ +/g, "-")}/${
                      match.home_team_key
                    }`}
                  >
                    <img
                      src={match.home_team_logo}
                      alt=""
                      className=" w-[40px] md:w-[50px]"
                    />
                  </Link>
                  <div className="text-xxs md:text-xs">
                    {match.event_home_team}
                  </div>
                </div>
              </div>
              <div
                className={`${
                  match.event_live === "1" && match.event_status != "Finished"
                    ? "text-live animate-pulse "
                    : ""
                } text-center   w-1/3`}
              >
                <div className=" text-xl xl:text-2xl">
                  {match.event_final_result}
                </div>
                <div className="text-base">
                  {match.event_status === "Finished"
                    ? "FT"
                    : match.event_status === "Half Time"
                    ? "HT"
                    : match.event_status}
                </div>
              </div>
              <div className="text-center  flex gap-5 justify-center items-center   w-1/3">
                <div className="flex flex-col items-center gap-1">
                  <Link
                    to={`/team/${match.event_away_team.replace(/ +/g, "-")}/${
                      match.away_team_key
                    }`}
                  >
                    <img
                      src={match.away_team_logo}
                      alt=""
                      className="w-[40px] md:w-[50px]"
                    />
                  </Link>
                  <div className="text-xxs md:text-xs">
                    {match.event_away_team}
                  </div>
                </div>
                <Star
                  team={match.event_away_team}
                  teamData={{
                    team: match.event_away_team,
                    team_key: match.away_team_key,
                    team_logo: match.away_team_logo,
                    team_country: match.country_name,
                  }}
                  alert={alert}
                  setAlert={setAlert}
                  setAlertMessage={setAlertMessage}
                  alertMessage={alertMessage}
                />
              </div>
            </div>
            <div className="flex justify-center">
              {/* <Link to={`/fixture/${match.event_key}`} className='px-4 bg-customBg py-1 text-lg  rounded hover:opacity-80 mt-3'>show more</Link> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CurrentFixtureInfo;
