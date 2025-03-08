import React, { useRef } from "react";
import { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link, useSearchParams } from "react-router-dom";
import { hourglass } from "ldrs";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();

  hourglass.register();

  // Default values shown

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    setPage(searchParam.get("page") || 1); // Update page from search params
  }, [searchParam]);

  const pagee = searchParam.get("page");
  console.log(pagee, page);

  const top = useRef(null);

  const scrollUp = () => {
    top.current.scrollIntoView({ behavior: "smooth" });
  };

  const handlePaginationClick = (direction) => {
    const newPage = direction === "next" ? +page + 1 : +page - 1;
    setPage(newPage);
    setSearchParam({ page: newPage }); // Update search params with new page number
    window.scrollTo(0, 0);
    scrollUp();
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://parascore-server.onrender.com/news?page=${pagee}`
        );
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      }
    }
    getData();
  }, [page]);

  return (
    <div className=" w-[95%] m-auto" ref={top}>
      <h1 className=" text-center text-3xl font-semibold text-white my-5">
        Football News
      </h1>
      {loading ? (
        <l-hourglass
          size="40"
          bg-opacity="0.1"
          speed="1.75"
          color="black"
          className="m-auto"
        ></l-hourglass>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full scroll-smooth transition-all duration-300 ">
          {news.map((n, i) => (
            <Link
              to={`${
                n.sourceStr == "FotMob"
                  ? n.page.url
                  : `https://www.fotmob.com/${n.page.url}`
              }`}
              target={`${n.sourceStr == "90min" ? "_blank" : ""}`}
              key={i}
              className={`${
                i == 0
                  ? "col-span-1 lg:col-span-3 xl:col-span-4 lg:flex items-center lg:bg-customBg2"
                  : " col-span-1"
              }  mb-2 text-white bg-customBg2 rounded-md`}
            >
              <section
                className={`${
                  i == "0" ? "flex-1 lg:mb-0 mb-5" : ""
                } mb-4 rounded-md overflow-hidden relative`}
              >
                <img
                  src={n.imageUrl}
                  alt=""
                  className={`${
                    i == 0 ? "" : ""
                  }  hover:scale-110 transition-transform duration-300`}
                />
                <section
                  className={`${
                    i == "0" ? "lg:px-16 lg:py-6 lg:hidden" : ""
                  } flex gap-1 items-center text-gray-300 text-xxs absolute bottom-2 left-2`}
                >
                  <img src={n.sourceIconUrl} alt="" className=" h-[10px]" />
                  <div className=" ">{n.sourceStr}</div>
                  <div className="  ">
                    {timeAgo.format(new Date(`${n.gmtTime}`))}
                  </div>
                </section>
              </section>
              <section
                className={`${
                  i == "0" ? "flex-1 grid place-content-center" : ""
                }`}
              >
                <h2
                  className={`${
                    i == "0"
                      ? " lg:px-16 lg:py-6 lg:text-3xl max-w-[550px] lg:mb-0 mb-5 "
                      : ""
                  } mb-5 cursor-pointer hover:underline px-4`}
                >
                  {n.title}
                </h2>
                <section
                  className={`${
                    i == "0"
                      ? "lg:px-16 lg:py-6 lg:flex gap-2 items-center text-gray-300 text-sm"
                      : ""
                  }   hidden`}
                >
                  <img src={n.sourceIconUrl} alt="" className=" h-[16px]" />
                  <div className=" ">{n.sourceStr}</div>
                  <div className="  ">
                    {timeAgo.format(new Date(`${n.gmtTime}`))}
                  </div>
                </section>
              </section>
            </Link>
          ))}
        </div>
      )}
      {error && <div>Error fetching news</div>}
      {/* <iframe src="https://www.fotmob.com/embed/news/01j50xeyjpjs/noussair-mazraoui-potential-shirt-numbers-at-man-utd" className=" w-full h-[100vh]" frameborder="0"></iframe> */}
      <div className="flex justify-between">
        <button
          className={`${
            page == 1 ? "opacity-20" : "opacity-100"
          } text-lg px-3 py-1 bg-customBg text-white`}
          onClick={() => handlePaginationClick("prev")}
        >
          Prev
        </button>
        <button
          className="text-lg px-3 py-1 bg-customBg text-white"
          onClick={() => handlePaginationClick("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
// https://www.90min.com/features/noussair-mazraoui-potential-shirt-numbers-at-man-utd
// https://www.90min.com/features/noussair-mazraoui-potential-shirt-numbers-man-utd
