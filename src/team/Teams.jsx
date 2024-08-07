import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import GoalKeepers from "./team_players/GoalKeepers";
import Defenders from "./team_players/Defenders";
import Midfielders from "./team_players/Midfielders";
import Forwards from "./team_players/Forwards";
import TeamFixtures from "./TeamFixtures";
import { auth, db } from "../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import Favourites from "../components/Favourites";
import Star from "../svg/Star";

const Teams = ({ toggleMode,alert,setAlert,alertMessage,setAlertMessage }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCap, setIsCap] = useState([]);
  const [teamFixtures, setTeamFixtures] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const { id } = useParams();
  const api_key = import.meta.env.VITE_api_key;

  const user = auth.currentUser;

  // const favouritesRef = doc(db, 'users', `${user.uid}`)

  // const addToFavourite = async (team) => {
  //   console.log(team.team_name);
  //   await updateDoc(favouritesRef, {

  //     favourites: [{
  //       teams: [{...teams}],
  //       leagues: [{
  //         team: team.team_name,
  //         team_key: team.team_key,
  //         team_logo: team.team_logo
  //       }]
  //     }]
  //   }).then(team => {
  //     console.log(`${team} added to fav`);
  //   }).catch(err => {
  //     console.log(`${err} adding failed`);
  //   })
  // }

  const date = new Date();
  // console.log(date);
  const fromDate = `${date.getFullYear() - 3}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const toDate = `${date.getFullYear() + 1}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  // console.log(fromDate, toDate, date);
  const [from, setFrom] = useState(fromDate);
  const [to, setTo] = useState(toDate);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await fetch(
        `https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${id}&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setTeams(json.result);
          setLoading(false);
          console.log(json.result);
          json.result.map((team) =>
            team.players.map((cap) => setIsCap(cap.player_is_captain))
          );
          // console.log(isCap);
          console.log(
            json.result.map((i) => i.players.map((p) => p.player_image))
          );
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, [id]);
  useEffect(() => {
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Fixtures&teamId=${id}&APIkey=${api_key}&from=${from}&to=${to}`
      )
        .then((res) => res.json())
        .then((json) => {
          setTeamFixtures(
            json.result.filter(
              (past) =>
                new Date(past.event_date) >=
                new Date(
                  `${date.getFullYear()}-${
                    date.getMonth() + 1
                  }-${date.getDate()}`
                )
            )
          );
          setTeamResults(
            json.result.filter(
              (past) =>
                past.event_status !== "" &&
                past.event_date <=
                  `${date.getFullYear()}-${
                    date.getMonth() + 1
                  }-${date.getDate()}`
            )
          );
          // console.log(json.result);
        });
    }
    getData();
  }, [id]);
  return (
    <div
      className={`${
        toggleMode ? "text-darkText" : "text-lightText"
      }  md:p-4 lg:grid grid-cols-5 gap-4`}
    >
      {loading && <Loading />}
      {}
      <div className=" bg-customBg2 p-1 md:p-4 h-fit col-span-3 ">
        {teams.map((team) => (
          <div key={team.team_key} className=" ">
            <div className=" bg-customBg2 gap-12 p-4 rounded-xl mb-5 bg-opacity-40 w-full flex items-center">
              <img src={team.team_logo} alt="" className=" h-16 md:h-24" />
              <div>
                <div className="text-3xl font-bold ">{team.team_name} </div>
              </div>
              <Star
                team={team.team_name}
                teamData={{
                  team: team.team_name,
                  team_key: team.team_key,
                  team_logo: team.team_logo,
                }}
                alert={alert}
                setAlert={setAlert}
                setAlertMessage={setAlertMessage}
                alertMessage={alertMessage}
              />
            </div>

            <div>
              <GoalKeepers team={team} toggleMode={toggleMode} />
              <Defenders team={team} toggleMode={toggleMode} />
              <Midfielders team={team} toggleMode={toggleMode} />
              <Forwards team={team} toggleMode={toggleMode} />
            </div>
          </div>
        ))}
      </div>
      <div className=" col-span-2">
        <TeamFixtures
          teamFixtures={teamFixtures}
          teamResults={teamResults}
          toggleMode={toggleMode}
          id={id}
        />
      </div>
    </div>
  );
};

export default Teams;
