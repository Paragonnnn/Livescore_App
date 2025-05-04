import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import { pic } from "..";

const Players = ({ countries, leagues,toggleMode }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [check, setCheck] = useState([]);

  const api_key = import.meta.env.VITE_api_key;
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?&met=Players&playerId=${id}&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setError(false);
          setLoading(false);
          setPlayers(json.result);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          // console.log(err);
        });
    }
    getData();
  }, [id]);
  return (
    <div>
      {error && <Error />}
      {loading && <Loading />}
      <div className=" ">
        {players.map((player, index) => (
          <div key={player.team_key} className="lg:grid grid-cols-3 mb-4 gap-4">
            <div className=" col-span-2 ">
              <Link
                to={`/team/${player.team_name.replace(/ +/g, "-")}/${
                  player.team_key
                }`}
              >
                <h1 className=" bg-customBg2 text-customBg p-2 rounded mb-2">
                  {player.team_name}
                </h1>
              </Link>
              <div className=" bg-customBg2 p-4 rounded">
                <div className=" flex items-center gap-4">
                  <img
                    src={player.player_image}
                    alt={player.player_name}
                    className=" h-14 md:h-20 rounded-[80px]"
                  />
                  <h1 className=" text-customBg text-lg">
                    {player.player_name}
                  </h1>
                </div>
                <h3 className=" text-customBg mt-2">Player's Details</h3>
                <div className={`${toggleMode ? 'text-darkText' : 'text-lightText'} grid grid-cols-3 place-items-stretch  mt-2 gap-y-4 gap-x-8 w-fit`}>
                  {player.player_number && (
                    <div className="">
                      <div className=" flex flex-col justify-center w-full items-center">
                        <div className=" opacity-60 text-xxs">shirt number </div>
                        <div className=" text-xs">{player.player_number}</div>
                      </div>
                    </div>
                  )}
                  {player.player_age && (
                    <div className="">
                      <div className=" flex flex-col justify-center w-full items-center">
                        <div className=" opacity-60 text-xxs">Age </div>
                        <div className=" text-xs">{player.player_age}</div>
                      </div>
                    </div>
                  )}
                  {player.player_country && (
                    <div className="">
                      <div className=" flex flex-col justify-center w-full items-center">
                        <div className=" opacity-60 text-xxs"> Nationality </div>
                        <div className=" text-xs">{player.player_country}</div>
                      </div>
                    </div>
                  )}
                  {player.player_type && (
                    <div className="">
                      <div className=" flex flex-col justify-center w-full items-center">
                        <div className=" opacity-60 text-xxs">Positon </div>
                        <div className=" text-xs">
                          {player.player_type == "Goalkeepers"
                            ? "GK"
                            : player.player_type == "Forwards"
                            ? "FW"
                            : `${player.player_type.slice(0, 3).toUpperCase()}`}
                        </div>
                      </div>
                    </div>
                  )}
                  {player.player_rating && (
                    <div className="">
                      <div className=" flex flex-col justify-center w-full items-center">
                        <div className=" opacity-60 text-xxs">Avg. rating</div>
                        <div className=" text-xs">{player.player_rating}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" col-span-1">
              <h3>Statistics</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
