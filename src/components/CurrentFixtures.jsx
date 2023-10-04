import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CurrentFixtures = ({month, day, currentYear, leagues}) => {
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    

    const api_key = import.meta.env.VITE_api_key
    useEffect(() => {
        async function getData() {
            await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&matchId=${id}&timezone=Africa/Lagos&leagueId=${leagues.map(league => (
                league.league_key
            ))}&APIkey=${api_key}&from=${currentYear}-${month}-${day}&to=${currentYear}-${month}-${day}`)
            
        }
    })
  return (
    <div>
        
    </div>
  )
}

export default CurrentFixtures