import React from "react";
import { Link } from "react-router-dom";

const PlayerStat = ({ stat, setShowStatToggle, toggleMode, reff }) => {
  return (
    <div className={` w-full bg-darkCustomBg3 text-white p-4 animate-dis`} ref={reff}>
      <div className=" flex justify-between">
        <h2 ref={reff} className=" text-xl">
          {stat.player_name}
        </h2>
        <div onClick={() => setShowStatToggle(false)} className=" text-2xl">
          X
        </div>
      </div>
      <div ref={reff} className="">
        <span>Position: </span>
        {stat.player_position}
      </div>
      {stat.player_position !== "Goalkeepers" &&
        stat.player_minutes_played != 0 && (
          <div>
            <div ref={reff} className=" flex justify-between">
              <span>Player Rating: </span> {stat.player_rating}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Minutes Played: </span>
              {stat.player_minutes_played > 90
                ? "90+"
                : stat.player_minutes_played}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Goals: </span>
              {stat.player_goals}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Assists: </span>
              {stat.player_assists}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Passes: </span>
              {stat.player_passes}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Accurate Passes: </span>
              {stat.player_passes_acc}/{stat.player_passes}(
              {Math.round((stat.player_passes_acc / stat.player_passes) * 100)}
              %)
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Key Passes: </span>
              {stat.player_key_passes}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Crosses(acc.): </span>
              {stat.player_total_crosses}({stat.player_acc_crosses})
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Shots on Target: </span>
              {stat.player_shots_on_goal}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Shots off Target: </span>
              {stat.player_total_shots - stat.player_shots_on_goal}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Dribble attempts(succ.): </span>
              {stat.player_dribble_attempts}({stat.player_dribble_succ})
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Duels(won): </span>
              {stat.player_duels_total}({stat.player_duels_won})
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Fouls: </span>
              {stat.player_fouls_commited}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Clearances: </span>
              {stat.player_clearances}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Interceptions: </span>
              {stat.player_interceptions}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Tackles: </span>
              {stat.player_tackles}
            </div>
            <div ref={reff} className=" flex justify-between">
              <span>Dribbled past: </span>
              {stat.player_dribbled_past}
            </div>
          </div>
        )}
      <Link
        to={`/player/${stat.player_name.replace(/ +/g, "-")}/${
          stat.player_key
        }`}
        className=" bg-customBg rounded-full px-3 pt-1 pb-2 text-base font-bold"
      >
        see player
      </Link>
    </div>
  );
};

export default PlayerStat;
