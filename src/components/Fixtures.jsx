import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import Countries from './Countries'
import { Link } from 'react-router-dom'

const Fixtures = ({leagues}) => {
    const [fixtures, setFixtures] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [check, setCheck] = useState([])

    let api_key = import.meta.env.VITE_api_key
    let date = new Date
    let month = date.getMonth() + 1
    let currentYear = date.getFullYear()
    let day = date.getDate()
    
    
    
    // useEffect(() => {
    //     setLoading(true)
    //     async function getData() {
    //       await fetch(`https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`)
    //     .then((res) => res.json())
    //     .then(json => {
    //       setError(false)
    //         setCountries(json.result)
    //         setLoading(false)
    //         // console.log(json.result);
    //     })
    //     .catch(err => {
    //       setLoading(false)
    //       setError(true)
    //       console.log(err)
    //     })
    //     }
    //     getData()  
    // }, [])
    
    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagues.map(league => (
                league.league_key
            ))}&APIkey=${api_key}&from=${currentYear}-${month}-${day}&to=${currentYear}-${month}-${day}`)
            .then(res => res.json())
            .then(json => {
                setFixtures(json.result)
                setLoading(false)
                setCheck(
                    json.result.map(fixture => (
                        (
                            !check.includes(fixture.league_key) && fixture.league_key 
                        )
                        
                    ))
                )
                console.log(json.result);
            })
            .catch(err => {
                setLoading(false)
                setError(true)
                console.log(err);
            })
        }
        getData()
    },[])
    // useEffect(() => {
    //     setCheck(
    //             fixtures.map(fixture => (
    //                 (
    //                     !check.includes(fixture.league_key) && fixture.league_key 
    //                 )
                    
    //             ))
    //         )
    //         console.log(check);
    // },[fixtures]) 
    
        
        loading && (
            <Loading />

        )
    
        error && (
            <Error />
        )
    
        
  return (
    <div>
        {
            // !(loading && error) &&
            
            leagues?.map(league => (
                (check.includes(league.league_key)) &&
                <div key={league.league_key}>
                        {check.includes(league.league_key)
                        &&
                        <h1><Link to={`/leagues/${league.league_key}`}>{league.league_name}</Link></h1>
                        }
                    {
                        fixtures?.map(fixture => (
                            // leagues.map(league => (
                                
                            // )) 
                            (league.league_key == fixture.league_key ) &&

                            <div key={fixture.event_key}>
                                {/* <div>{fixture.country_name}</div> */}
                                {/* <h1>{fixture.league_name}</h1> */}
                                <div>{fixture.event_home_team} vs {fixture.event_away_team}</div>
                            </div>
                        ))
                    }
                </div>
            ))
        }
        
    </div>
  )
}

export default Fixtures