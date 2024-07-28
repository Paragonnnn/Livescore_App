import React, { useEffect, useState } from "react";
// import { getTransfers } from './transfers'

const Transfer = () => {
  const [transfers, setTransfers] = useState([]);
  const url = "https://www.fotmob.com/api/transfers?&page=1";

  useEffect(() => {
    // console.log(
    //   getTransfers(url)
    // )

    async function getData() {
      try {
        const response = await fetch(
          "http:localhost:3000/transfers"
        );
        const data = await response.json();
        setTransfers(data)
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, []);

  return <div>
    {
      transfers?.map(t => (
        <div key={t.playerId}>
          {t.name}
        </div>
      ))
    }
  </div>;
};

export default Transfer;
