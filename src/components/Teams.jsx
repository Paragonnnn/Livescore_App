import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'

const Teams = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const id = useParams()
    const api_key = import.meta.env.VITE_api_key

    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=${id}&APIkey=${api_key}`)
            .then(res => res.json())
            .then(json => {
                setTeams(json.result)
                setLoading(false)
                console.log(json.result);
            })
            .catch(err => console.log(err))
        }
        getData()
    },[id])
    console.log(id);
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
                    {team.team_name}
                </div>
            ))
        }
    </div>
  )
}

export default Teams