import React, { useEffect, useState } from "react";

const SearchTeamAndPlayer = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  const api_key = import.meta.env.VITE_api_key;

  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Players&playerName=${searchValue}&APIkey=${api_key}&`
      )
        .then((res) => res.json())
        .then((json) => {
          setSearchResult(json.result);
        });
    }
    getData();
  }, [searchValue]);
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <div className=" text-white">{searchValue}</div>
      {/* {searchResult.map((player,index) => (
        // <div key={index} className=" text-white">{player.player_name}</div>
      ))} */}
    </div>
  );
};

export default SearchTeamAndPlayer;
