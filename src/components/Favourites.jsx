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
      try {
        console.log(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const favTeams = Object.entries(docSnap.data().favouritesTeams.teams).map(
            (team) => team[1]
          );
    
          setFavteam(favTeams);
          console.log(favTeams);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.log("Error getting document:", err);
      }
    };
    

    getData();
  }, [user]);

  return (
    <div className={`p-2 mt-4   `}>
      {!user && (
        <div className="text-center">
          <Link to="/signin" className="text-customText">
            Login to view your favourite teams
          </Link>
        </div>
      )}
      {/* <button className=" text-white">Get data</button> */}
      
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
