import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import Countries from './Countries'
import { Link } from 'react-router-dom'

const Fixtures = ({leagues, fixtures , check, fixturesError, loadingFixtures}) => {
    // const [fixtures, setFixtures] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)
    // const [check, setCheck] = useState([])

    // let api_key = import.meta.env.VITE_api_key
    // let date = new Date
    // let month = date.getMonth() + 1
    // let currentYear = date.getFullYear()
    // let day = date.getDate()
    
    
    
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
    
    // useEffect(() => {
    //     async function getData() {
    //         setLoading(true)
    //         await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=${leagues.map(league => (
    //             league.league_key
    //         ))}&APIkey=${api_key}&from=${currentYear}-${month}-${day}&to=${currentYear}-${month}-${day}`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setFixtures(json.result)
    //             setLoading(false)
    //             setCheck(
    //                 json.result.map(fixture => (
    //                     (
    //                         !check.includes(fixture.league_key) && fixture.league_key 
    //                     )
                        
    //                 ))
    //             )
    //             console.log(json.result);
    //         })
    //         .catch(err => {
    //             setLoading(false)
    //             setError(true)
    //             console.log(err);
    //         })
    //     }
    //     getData()
    // },[])
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
    
        
    
    
    return (
        <div>
        {loadingFixtures && (
            <Loading />
    
        )}
    
        {fixturesError && (
            <Error />
        )}
        {
            // !(loading && error) &&
            fixtures &&
            leagues.map((league,index) => (
                (check.includes(league.league_key)) &&
                <div key={league.league_key} className={`border border-lighterOrange border-solid mb-4 rounded divide-y divide-lighterOrange`}>
                        {check.includes(league.league_key)
                        &&
                        <div className=' text-orange p-2 text-xs  flex items-center '>
                            <img src={league.country_logo} alt="" className='w-4 h-4 rounded-[100%] mr-2'/>
                            <div className='flex flex-col'>
                                <Link className='text-lightOrange' to={`/leagues/${league.country_key}`}>{league.country_name}</Link> 
                                <Link to={`/table/${league.league_key}`}>{league.league_name}</Link> 
                            </div>
                        </div>
                        }
                    {
                        fixtures?.map(fixture => (
                            // leagues.map(league => (
                                
                            // )) 
                            (league.league_key == fixture.league_key ) &&

                            <div key={fixture.event_key} className='text-gray-200 text-xs p-2 flex gap-2 '>
                                {/* <div>{fixture.country_name}</div> */}
                                {/* <h1>{fixture.league_name}</h1> */}
                                <div className='text-xxs text-gray-300 '>
                                    <div>
                                        {fixture.event_time}
                                    </div>
                                    <div className='text-center'>
                                        -
                                    </div>
                                </div>
                                <div className='cursor-pointer w-full '>
                                    <div className='flex gap-1 items-center'>
                                        <img src={fixture.home_team_logo} alt="" className='w-2 h-2'/>
                                        {fixture.event_home_team}
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <img src={fixture.away_team_logo} alt="" className='h-2 w-2'/>
                                        {fixture.event_away_team}
                                    </div>
                                     {/* {fixture.event_ft_result.slice(0,fixture.event_ft_result.indexOf('-'))} vs  {fixture.event_ft_result.slice(fixture.event_ft_result.indexOf('-') + 1, fixture.event_ft_result.length + 1)} */}
                                </div>
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