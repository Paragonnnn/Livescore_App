import React, { useEffect, useState } from "react";
import TransferArrow from "../../svg/TransferArrow";
import { Link } from "react-router-dom";

const TransferInfo = () => {
  const [transfer, setTransfer] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://parascore-server.onrender.com/transfers?showTop=true"
        );
        const data = await response.json();
        setTransfer(data.transfers);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getData();
  }, []);

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
  return (
    <div className="">
      <div className=" text-xl mb-3">Top transfers</div>
      <div className=" border border-solid rounded-md border-opacity-20 border-gray-400 divide-y divide-gray-400 divide-opacity-20">
        {transfer?.slice(0, 3).map((t, i) => (
          <div key={i} className=" flex justify-between items-center py-3 px-2">
            <section className=" flex gap-2 items-center">
              <section className="w-9 h-9 bg-slate-600 bg-opacity-30 relative rounded-full overflow-hidden">
                <img
                  src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Fplayerimages%2F${t.playerId}.png&w=48&q=75`}
                  alt=""
                />
              </section>
              <section className=" flex flex-col justify-center gap-1">
                <p>{t.name}</p>
                <section className=" flex gap-1 items-center">
                  <img
                    src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Flogo%2Fteamlogo%2F${t.fromClubId}_xsmall.png&w=32&q=75`}
                    alt=""
                    className=" h-[14px]"
                  />
                  <div className=" w-fit">
                    <TransferArrow />
                  </div>
                  <img
                    src={`https://www.fotmob.com/_next/image?url=https%3A%2F%2Fimages.fotmob.com%2Fimage_resources%2Flogo%2Fteamlogo%2F${t.toClubId}_xsmall.png&w=32&q=75`}
                    alt=""
                    className=" h-[14px]"
                  />
                </section>
              </section>
            </section>
            <section className=" ">
              <p>
                {t.fee && (t.fee.value ? `€${formatNumber(t.fee.value)}` : t.fee.feeText)}
              </p>
            </section>
          </div>
        ))}
      </div>
      <Link to={`/transfers`} className=" flex justify-center mt-3  items-center">
        <div className="px-4 bg-customBg py-1 text-base rounded hover:bg-opacity-80">More Transfers</div>
      </Link>
    </div>
  );
};

export default TransferInfo;
