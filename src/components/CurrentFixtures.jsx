import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CurrentFixtures = ({}) => {
    const [loading, setLoading] = useState(false)
    const [match,setMatch] = useState([])
    const [hToH, setHToH] = useState([])
    const {id} = useParams()
    

    const api_key = import.meta.env.VITE_api_key
    useEffect(() => {
        async function getData() {
            await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&matchId=${id}&timezone=Africa/Lagos&APIkey=${api_key}`)
            .then(res => res.json())
            .then(json => {
              setMatch(json.result)
              console.log(json.result);
            })
            .catch(err => {

            })
        }
        getData()
    },[id])
    useEffect(() => {
      async function getData() {
        await fetch(`https://apiv2.allsportsapi.com/football/?met=H2H&APIkey=${api_key}&${match.map(match => (
          `firstTeamId=${match.home_team_key}&secondTeamId=${match.away_team_key}`
        ))}`)
        .then(res => res.json())
        .then(json => {
          setHToH(json.result.H2H)
          console.log(json.result.H2H);
        })
        .catch(err => {

        })
      }
      getData()
    },[match])
    
  return (
    <div>
        {
          match.map(match => (
            <div key={match.event_key}>
              {match.event_home_team}{match.home_team_key} vs {match.event_away_team}{match.away_team_key}
            </div>
          ))
        }
        {
            hToH &&
            hToH.map(h => (
              <div key={h.event_key}>
                {h.event_final_result}
              </div>
            ))
          
        

        }
    </div>
  )
}

export default CurrentFixtures