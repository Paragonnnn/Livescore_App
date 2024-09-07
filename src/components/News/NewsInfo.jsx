import React, { useState, useEffect } from "react";
import ForwardArrow from "../../svg/ForwardArrow";
import BackwarkArrow from "../../svg/BackwarkArrow";
import { Link } from "react-router-dom";
import { pic } from "../..";

const NewsInfo = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://parascore-server.onrender.com/news?page=1`
        );
        const data = await response.json();
        setNews(data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getData();
  }, []);
  return (
    <div className="min-h-[300px]">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="relative rounded-md overflow-hidden">
          {news.map((item, index) => {
            return (
              index === newsIndex && (
                <div key={item.id} className="flex flex-col">
                  <div className="w-full max-h-[200px] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className=" object-cover"
                      onError={``}
                    />
                  </div>
                  <h1 className=" p-3">{item.title}</h1>
                </div>
              )
            );
          })}

          <div
            className=" absolute top-[44%] left-1 -translate-y-1/2 cursor-pointer"
            onClick={() => newsIndex > 0 && setNewsIndex((prev) => prev - 1)}
          >
            <BackwarkArrow />
          </div>
          <div
            className=" absolute top-[44%] right-1 -translate-y-1/2 cursor-pointer"
            onClick={() => newsIndex < 2 && setNewsIndex((prev) => prev + 1)}
          >
            <ForwardArrow />
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center ">
          <div className=" h-10 w-30 bg-[#ffffff10] mt-6 rounded"></div>
        </div>
      ) : (
        <Link to={"/news"} className="flex justify-center mt-3  items-center">
          <div className="px-7 bg-customBg py-1 text-lg rounded hover:bg-opacity-80">
            News
          </div>
        </Link>
      )}
    </div>
  );
};

export default NewsInfo;
