import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CurrentFixtures = ({}) => {
    const [loading, setLoading] = useState(false)
    const [match,setMatch] = useState([])
    const [hToH, setHToH] = useState([])
    const [odds, setOdds] = useState([])
    const [bookie, setBookie] = useState('1xBet')
    const {id} = useParams()
    

    const handleClick = (e) => {
      let book = e.target.innerHTML
        setBookie(book)
      console.log(book);
    }

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
    useEffect(() => {
      async function getData() {
        await fetch(`https://apiv2.allsportsapi.com/football/?&met=Odds&matchId=${id}&APIkey=${api_key}`)
        .then(res => res.json())
        .then(json => {
          setOdds(json.result[id])
          console.log(json.result[id]);
        })
      }
      getData()
    },[match])
    
  return (
    <div>
        {
          match.map(match => (
            <div key={match.event_key}>
              {match.event_home_team} vs {match.event_away_team}
            </div>
          ))
        }
        {
            hToH &&
            hToH.map(h => (
              <div key={h.event_key}>
                {h.event_home_team}
                {h.event_final_result}
                {h.event_away_team}
                {h.event_date}
              </div>
            ))
          
        }
        {
          odds &&
          odds.filter(odd => (odd.odd_bookmakers === '1xBet' || odd.odd_bookmakers === 'Betway')).map(odd => (
            <div key={odd.odd_bookmakers}z>
              <div onClick={handleClick}>{odd.odd_bookmakers}</div>
              
              {odd.odd_bookmakers === bookie &&

                <div >
                  {odd.odd_bookmakers}
                  {odd.odd_1}
                  {odd.odd_x}
                  {odd.odd_2}
                </div>
              }
              

            </div>
          ))
        }
    </div>
  )
}

export default CurrentFixtures