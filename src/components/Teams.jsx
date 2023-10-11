import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'

const Teams = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const [isCap, setIsCap] = useState([])
    const {id} = useParams()
    const api_key = import.meta.env.VITE_api_key


    
    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${id}&APIkey=${api_key}`)
            .then(res => res.json())
            .then(json => {
                setTeams(json.result)
                setLoading(false)
                console.log(json.result);
                json.result.map((team) => (
                    team.players.map(cap => (
                        setIsCap(cap.player_is_captain)
                    ))
                    ))
                    console.log(isCap);
            })
            .catch(err => console.log(err))
        }
        getData()
    },[id])
  return (
    <div>
        {
            loading && (
                <Loading />

            )

        }
        {

        }
        {
            teams.map((team) => (
                <div key={team.team_key}>
                    
                    {team.team_name} <img src={team.team_logo} alt="" />
                    
                    <div>
                        <h1>Goalkeepers</h1>
                        {
                            team.players.filter(player => player.player_type == 'Goalkeepers').map((player) => (
                                // player.player_type == 'Goalkeepers' &&

                                <div key={player.player_key}>
                                    <Link to={`/player/${player.player_name.replace(' ', '-')}/${player.player_key}`}>{player.player_name} {(player.player_is_captain == '9') && <span>(c)</span> }</Link>
                                </div>
                                
                            ))
                        }
                        <h1>Defenders</h1>

                        {
                            team.players.filter(player => player.player_type == 'Defenders').map((player) => (
                                // player.player_type == 'Goalkeepers' &&
                                <div key={player.player_key}>
                                    <Link to={`/player/${player.player_name.replace(' ', '-')}/${player.player_key}`}>{player.player_name} {(player.player_is_captain == '9') && <span>(c)</span> }</Link>
                                    {player.player_is_captain}
                                </div>
                                
                            ))
                        }
                        <h1>Midfielders</h1>

                        {
                            team.players.filter(player => player.player_type == 'Midfielders').map((player) => (
                                // player.player_type == 'Goalkeepers' &&
                                <div key={player.player_key}>
                                    <Link to={`/player/${player.player_name.replace(' ', '-')}/${player.player_key}`}>{player.player_name} {(player.player_is_captain == '9') && <span>(c)</span> }</Link>
                                </div>
                                
                            ))
                        }
                        <h1>Forwards</h1>

                        {
                            team.players.filter(player => player.player_type == 'Forwards').map((player) => (
                                // player.player_type == 'Goalkeepers' &&
                                <div key={player.player_key}>
                                    <Link to={`/player/${player.player_name.replace(' ', '-')}/${player.player_key}`}>{player.player_name} {(player.player_is_captain == '9') && <span>(c)</span> }</Link>
                                </div>
                                
                            ))
                        }

                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Teams