import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { arrowDown, arrowUp } from "../index.js";
import Header from "./Header";

const Countries = ({
  loadingCountries,
  countries,
  error,
  leagues,
  toggleMode,
}) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState();
  const [check, setCheck] = useState();
  const [activeIndex, setActiveIndex] = useState([]);
  const [seeAll, setSeeAll] = useState(20);

  const handleClick = (index) => {

    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index));
    } else {
      setActiveIndex([index]);
    }
  };

  const handleSeeAll = () => {
    setSeeAll(countries.lenght);
  };
  const handleSeeLess = () => {
    setSeeAll(20);
  };

  return (
    <div
      className={`${
        toggleMode ? " bg-customBgLight" : " bg-customBg2"
      } px-1  sticky top-[60px] rounded-lg max-h-[100%] shadow-dark`}
    >
      <Header setSearch={setSearch} search={search} toggleMode={toggleMode} />

      {/* {
            error && (
                <Error />
            )
        } */}
      {loadingCountries && <Loading />}
      <div className="divide-y divide-gray-400 divide-opacity-20 overflow-y-scroll countries-scroll max-h-[90vh] px-2">
        {countries
          .filter((country) =>
            search.trim().toLowerCase() === ""
              ? country
              : country.country_name
                  .toLowerCase()
                  .includes(search.toLowerCase())
          )
          .slice(0, seeAll)
          .map((country, index) => (
            <div key={country.country_key} className="">
              <div
                className={`${
                  toggleMode ? "text-darkText" : "text-lightText"
                } flex items-center justify-between w-full px-1 pt-1 cursor-pointer`}
                onClick={() => handleClick(index)}
              >
                <div className="  w-[70%] overflow-hidden ">
                  <h2 className="">{country.country_name}</h2>
                </div>
                <img
                  src={country.country_logo}
                  alt=""
                  className="w-4 h-4 rounded-full"
                />
                <img
                  src={activeIndex.includes(index) ? arrowUp : arrowDown}
                  alt=""
                  className=" w-7 h-7 cursor-pointer"
                />
              </div>
              <div
                className={`${
                  activeIndex.includes(index)
                    ? " visible h-full"
                    : " invisible h-0 opacity-0"
                } ${
                  toggleMode ? "text-darkText" : "text-lightText"
                } p-2 divide-y divide-gray-400 divide-opacity-20  transition-all duration-300 `}
              >
                {leagues?.map(
                  (league) =>
                    league.country_key == country.country_key && (
                      <div key={league.league_key} className="p-1">
                        <Link
                          to={`/table/${league.league_name.replace(
                            / +/g,
                            "-"
                          )}/${league.league_key}`}
                        >
                          {league.league_name}
                        </Link>
                      </div>
                    )
                )}
              </div>
            </div>
          ))}

        {seeAll === 20 && !error && (
          <div
            onClick={handleSeeAll}
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } cursor-pointer text-center mb-28 pt-2`}
          >
            See All
          </div>
        )}
        {seeAll === countries.lenght && !error && (
          <div
            onClick={handleSeeLess}
            className={`${
              toggleMode ? "text-darkText" : "text-lightText"
            } cursor-pointer text-center mb-28 pt-2`}
          >
            See Less
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;

// width: 70%;
//   height: 100%;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   color: black;
