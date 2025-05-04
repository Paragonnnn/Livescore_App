import React, { useState } from "react";
import { useEffect } from "react";

const SearchPlayers = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  const api_key = import.meta.env.VITE_api_key;

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    // setPlayers([]);
    const getData = async () => {
      await fetch(`https://apiv2.allsportsapi.com/football/?&met=Players&playerName=${playerName}&APIkey=${api_key}
          `)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.result.sort((a, b) => a.player_key - b.player_key));
          setPlayers(json.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [playerName]);

  return (
    <div>
      <section>
        <input type="text" onChange={handlePlayerName} />
      </section>
      {players &&
        players.map((player,index) => (
          <section key={index}>
            <div>
                <img src={player.player_image} alt="" />
              {player.player_name} {player.player_key}
            </div>
          </section>
        ))}
    </div>
  );
};

export default SearchPlayers;
