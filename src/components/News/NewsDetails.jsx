import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fotmob from "../../svg/Fotmob";

const NewsDetails = () => {
  const [newsDetails, setNewsDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [related, setRelated] = useState([]);

  const { id } = useParams();

  const formatDate = (dateString) => {
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    return `${date.toLocaleDateString(
      "en-us",
      dateOptions
    )} ${date.toLocaleTimeString("en-us", timeOptions)}`;
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://parascore-server.onrender.com/news?id=${id}`
        );
        const data = await response.json();
        setNewsDetails(data);
        setRelated(data.related);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    getData();
  }, [id]);

  return (
    <>
      {error && (
        <div className="text-white text-center">Error fetching data</div>
      )}
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <div className=" text-white py-12 lg2:py-0 ">
          <section>
            <h1 className=" text-xl md:text-3xl font-semibold m-auto text-center my-16 md:w-1/2 w-full hidden lg2:block">
              {newsDetails.title}
            </h1>
            <img src={newsDetails.imageUrl} alt="" className=" w-full px-2" />
            <section className=" relative">
              <section className=" bg-customBg2 px-3 lg2:px-10 py-10 lg2:py-16 w-full lg2:w-[70%] lg:w-[60%] m-auto absolute top-0 lg2:-top-28 left-1/2 translate-x-[-50%] lg2:rounded-2xl ">
                <h1 className=" text-xl font-semibold md:w-1/2 w-full block lg2:hidden mb-5">
                  {newsDetails.title}
                </h1>
                <section className=" flex items-center gap-2 text-gray-400 mb-6 lg2:hidden">
                  <Fotmob />
                  <div>Fotmob</div>
                  <div>{formatDate(newsDetails.time)}</div>
                </section>
                <h2 className=" text-lg md:text-2xl mb-10">
                  {newsDetails.subtitle}
                </h2>
                <section className=" hidden items-center gap-2 text-gray-400 mb-6 lg2:flex">
                  <Fotmob />
                  <div>Fotmob</div>
                  <div>{formatDate(newsDetails.time)}</div>
                </section>
                <p
                  dangerouslySetInnerHTML={{ __html: newsDetails.html }}
                  className=" text-xs md:text-lg  line-height "
                />
              </section>
            </section>
          </section>
        </div>
      )}
          <section className=" text-3xl  ">
            <div>Related News</div>
          </section>
    </>
  );
};

export default NewsDetails;
