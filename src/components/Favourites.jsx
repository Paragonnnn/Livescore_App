import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Favourites = ({toggleMode}) => {
  const [favTeam, setFavteam] = useState();
  const user = auth.currentUser;
  // console.log(user.uid);
  useEffect(() => {
    const getData = async () => {
      console.log(user.uid);
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().favouritesTeams.teams);
      setFavteam(
        Object.entries(docSnap.data().favouritesTeams.teams).map(
          (team) => team[1]
        )
      );
      console.log(
        Object.entries(docSnap.data().favouritesTeams.teams).map(
          (team) => team[1]
        )
      );

      // const querySnapshot = await getDocs(collection(db, "users"));
      // console.log(querySnapshot.query);
    };

    getData();
  }, [user]);

  return (
    <div className={`p-2 mt-4   `}>
      {/* <button className=" text-white">Get data</button> */}
      <div className={`${toggleMode ? 'text-darkText' : 'text-lightText'} `}>
        {favTeam?.map((fav, i) => (
          <div key={i} className={` mb-1 px-1 py-[2px] first:rounded-t-md last:rounded-b-md ${toggleMode ? 'bg-customBgLight' : 'bg-customBg2'}`}>
            <Link to={`/team/${fav.team}/${fav.team_key}`} className={`flex gap-7 items-center`}>
              <img src={fav.team_logo} alt={fav.team} className={`h-10 w-10 `}/>
              <div>{fav.team}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
