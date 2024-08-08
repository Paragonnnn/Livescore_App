import React, { useEffect, useRef, useState } from "react";
import TransferArrow from "../../svg/TransferArrow";
// import { getTransfers } from './transfers'

const Transfer = () => {
  const [transfers, setTransfers] = useState([]);
  const url = "https://www.fotmob.com/api/transfers?&page=1";
  const defaultPlayerImage =
    "data:image/png;base64,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";

  const image = useRef();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-us", options);
  };

  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B"; // Billions
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M"; // Millions
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K"; // Thousands
    }
    return num.toString();
  };

  useEffect(() => {
    // console.log(
    //   getTransfers(url)
    // )

    async function getData() {
      try {
        const response = await fetch("https://parascore-backend.onrender.com/transfers");
        const data = await response.json();
        setTransfers(data.transfers);
        console.log(data.transfers);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, []);

  return (
    <div
      className={` w-[95%] m-auto bg-customBg2 p-4 rounded-2xl mt-5 text-lightText`}
    >
      <h1>Transfers</h1>
      <div className=" lg:grid grid-cols-24 items-center gap-x-2 text-xxs text-gray-500 hidden">
        <div className=" col-span-8">Player</div>
        <div className=" col-span-2">Fee</div>
        <div className=" col-span-5">From</div>
        <div className=" col-span-1">Position</div>
        <div className=" col-span-4">Contract</div>
        <div className=" col-span-2">Market Value</div>
        <div className=" col-span-2">Date</div>
      </div>
      <div className="divide-y divide-gray-800 ">
        {transfers?.map((t, i) => (
          <div
            key={t.playerId + i}
            className="py-2 lg:grid grid-cols-24 gap-x-2 grid-flow-row relative"
          >
            <div className=" flex col-span-8 gap-2 items-center lg:items-start flex-col">
              <div className="relative">
              <div className=" w-9 h-9 bg-slate-600 bg-opacity-30 relative rounded-full overflow-hidden">
                <img
                  src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Fplayerimages%2F${t.playerId}.png&w=48&q=75`}
                  ref={image}
                  onLoad={(e) => {
                    e.target.src = `https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Fplayerimages%2F${t.playerId}.png&w=48&q=75`;
                  }}
                  onError={(e) => {
                    // e.target.onerror = null;
                    e.target.src = defaultPlayerImage;
                  }}
                  alt=""
                  className=" w-8 absolute bottom-0 left-[50%] -translate-x-[50%]"
                />
              </div>
                <div className=" absolute lg:hidden block z-10 -bottom-1 -right-2 px-[5px] rounded-full text-xs bg-slate-600 text-gray-300">{t.position && t.position.label}</div>

              </div>
              <div className=" flex flex-col">
                <div className=" text-white">{t.name}</div>
                <div className=" lg:flex gap-1 items-center hidden">
                  <img
                    src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Flogo%2Fteamlogo%2F${t.toClubId}_xsmall.png&w=32&q=75`}
                    alt=""
                    className=" h-4"
                  />
                  <div className=" text-xs text-gray-400">
                    {t.toClub && t.toClub}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 lg:flex items-center justify-center lg:justify-start hidden">
              {t.fee &&
                (t.fee.feeText === "fee"
                  ? "€" + formatNumber(t.fee.value)
                  : t.fee.feeText)}
            </div>
            <div className="col-span-5 flex items-center gap-2 justify-center lg:justify-start lg:text-base text-[10px] lg:font-normal font-light text-gray-200 lg:text-lightText">
              <div className=" flex lg:flex-row flex-row-reverse gap-2 items-center">
                <img
                  src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Flogo%2Fteamlogo%2F${t.fromClubId}_xsmall.png&w=32&q=75`}
                  alt=""
                  className=" h-3"
                />
                <div className=" flex">{t.fromClub && t.fromClub}</div>
              </div>
              <div className=" block lg:hidden">
                <TransferArrow />
              </div>
              <div className=" flex gap-2 items-center lg:hidden">
                <img
                  src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Flogo%2Fteamlogo%2F${t.toClubId}_xsmall.png&w=32&q=75`}
                  alt=""
                  className=" h-3"
                />
                <div className=" ">{t.toClub && t.toClub}</div>
              </div>
            </div>
            <div className="col-span-1 lg:flex items-center justify-center lg:justify-start hidden">
              {t.position && t.position.label}
            </div>
            <div className="flex justify-center col-span-4 gap-2 text-gray-500 lg:text-lightText">
              <div className=" flex items-center justify-center lg:justify-start lg:hidden">
                {t.fee &&
                  (t.fee.feeText === "fee"
                    ? "€" + formatNumber(t.fee.value)
                    : t.fee.feeText)}
              </div>
              <div className="lg:hidden block">Contract:</div>
              <div className="col-span-4 flex items-center justify-center lg:justify-start">
                {`${formatDate(t.fromDate).split(" ")[0]} ${
                  formatDate(t.fromDate).split(" ")[2]
                } - ${
                  t.toDate
                    ? formatDate(t.toDate).split(" ")[0] +
                      " " +
                      formatDate(t.toDate).split(" ")[2]
                    : "undisclosed"
                }`}
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-center lg:justify-start lg:text-lightText text-gray-500">
              <div className=" lg:hidden block mr-2">Market Value</div>
              {t.marketValue && "€" + formatNumber(t.marketValue)}
            </div>
            <div className="col-span-2 flex items-center justify-center lg:justify-start lg:relative absolute lg:top-0 lg:right-0 top-1 right-2 text-gray-500 lg:text-lightText">
              {t.transferDate && formatDate(t.transferDate.slice(0, 10))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transfer;
