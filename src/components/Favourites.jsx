import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import Star from '../svg/Star'

const Favourites = ({ toggleMode,alert,setAlert,alertMessage,setAlertMessage }) => {
  const [favTeam, setFavteam] = useState();
  const [updateFav, setUpdateFav] = useState('')
  const user = auth.currentUser;
  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const favTeams = Object.entries(
            docSnap.data().favouritesTeams.teams
          ).map((team) => team[1]);

          setFavteam(favTeams);

        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.log("Error getting document:", err);
      }
    };

    getData();
  }, [user,updateFav]);

  return (
    <div className={`p-2    `}>
      {!user && (
        <div className="text-center">
          <Link to="/signin" className="text-customText">
            Login to view your favourite teams
          </Link>
        </div>
      )}
      <h1 className=" text-center mb-4 text-2xl font-bold text-lightText">
        Favourite Teams
      </h1>
      {/* <button className=" text-white">Get data</button> */}

      {/* <button className=" text-white">Get data</button> */}
      <div className={`${toggleMode ? "text-darkText" : "text-lightText"} `}>
        {favTeam?.map((fav, i) => (
          <div
            key={i}
            className={` flex justify-between items-center mb-1 px-4 py-[2px] first:rounded-t-md last:rounded-b-md ${
              toggleMode ? "bg-customBgLight" : "bg-customBg2"
            }`}
          >
            <Link
              to={`/team/${fav.team}/${fav.team_key}`}
              className={`flex gap-5 items-center`}
            >
              <img
                src={fav.team_logo}
                alt={fav.team}
                className={` h-6 w-6 `}
              />
              <div >{fav.team}</div>
            </Link>
            <div >
              <Star teamData={fav} setFavteam={setFavteam} favTeam={favTeam} alert={alert} setAlert={setAlert} setAlertMessage={setAlertMessage} alertMessage={alertMessage}/>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
