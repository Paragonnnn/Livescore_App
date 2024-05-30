import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Favourites = () => {
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
    <div>
      <button className=" text-white">Get data</button>
      <div>
        {favTeam?.map((fav, i) => (
          <Link to={`/team/${fav.team}/${fav.team_key}`} key={i}>
            <img src={fav.team_logo} alt="" />
            <div>{fav.team}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
