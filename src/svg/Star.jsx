import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const Star = ({ team, teamData,setFavteam, favTeam }) => {
  const [favTeams, setFavteams] = useState([]);

  const user = auth.currentUser;

  const addFavFunc = async (docSnap, docRef, team) => {
    try {
      const userDoc = doc(db, "users", user.uid);
      const favouritesTeams = docSnap.data().favouritesTeams.teams;
      const teamKey = team.team_key.toString();

      if (!Object.keys(favouritesTeams).includes(teamKey)) {
        await setDoc(userDoc, {
          favouritesTeams: {
            teams: {
              ...favouritesTeams,
              [teamKey]: team,
            },
          },
        });
        console.log("details uploaded");
        alert(`${team.team} added to favourites`);
      } else {
        await updateDoc(docRef, {
          [`favouritesTeams.teams.${teamKey}`]: deleteField(),
        });
        console.log("deleted");
        alert(`${team.team} removed from favourites`);
        setFavteam(favTeam.filter(f => !(f.team_key === teamData.team_key)))
        await getDocFunc();
      }
    } catch (err) {
      console.log(err, "error updating data");
    }
  };

  const getDocFunc = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const favTeams = Object.keys(docSnap.data().favouritesTeams.teams);
        setFavteams(favTeams);
        console.log(favTeams);
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err, "error getting document");
    }
  };

  useEffect(() => {
    getDocFunc();
  }, []);
  const addFav = async (team) => {
    const docRef = doc(db, "users", `${user.uid}`);
    const docSnap = await getDoc(docRef)
      .then((doc) => {
        console.log("details gotten");
        // console.log(doc.data().favouritesTeams.teams, "fav teams");
        getDocFunc();
        addFavFunc(doc, docRef, team);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(docSnap.data().favouritesTeams.teams, "fav teams");
  };

  return (
    <div
      className={`${
        user ? "block" : "hidden"
      } relative `}
      // onMouseOver={(e) =>
      //   e.target.firstElementChild.classList.add("text-black")
      // }
      data-tooltip-target="tooltip-animation"
    >
      
      {/* <button data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip hover</button>

<div id="tooltip-hover" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    Tooltip content
    <div class="tooltip-arrow" data-popper-arrow></div>
</div> */}

      {/* <span className={` absolute`}>add {team}</span> */}
      <button onClick={() => addFav(teamData)} >
        <svg
          viewBox="0 0 24.00 24.00"
          fill={
            favTeams?.includes(teamData["team_key"].toString())
              ? "#fff"
              : "transparent"
          }
          xmlns="http://www.w3.org/2000/svg"
          className={"w-8 h-8 cursor-pointer "}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
              stroke="#1D9BF0"
              stroke-width="0.624"
            ></path>{" "}
          </g>
        </svg>
      </button>
        <div
          id="tooltip-animation"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          ${teamData["team"]}
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
  );
};

export default Star;
