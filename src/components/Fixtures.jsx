import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import Countries from './Countries'
import { Link } from 'react-router-dom'

const Fixtures = ({leagues, fixtures , check, fixturesError, loadingFixtures, currentFixture, setCurrentFixture, liveCheck}) => {

    const [isLive, setIsLive] = useState(true)

    const all = () => {
        setIsLive(true)
    }
    const live = () => {
        setIsLive(false)
    }

    const handleClick = (id) => {
        if (!currentFixture.includes(id)) {
            setCurrentFixture(
                fixtures.filter((fixture) => (
                    fixture === id
                ))
            )
        } else {
            setCurrentFixture([id])
        }
        console.log(currentFixture);
        console.log('hi');
    }
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
        <div className='p-4 bg-black rounded-md'>
            <div className=' text-white border border-solid border-lighterOrange p-2 flex gap-2 mb-2'>
                <button onClick={all} className={`${isLive ? 'text-orange': 'text-white'}`}>All</button>
                <button onClick={live} className={`${!isLive ? 'text-orange': 'text-white'} flex items-center gap-1`}>Live <div className='text-xs'>
                        {
                        fixtures.filter(fixture => fixture.event_live === '1').length
                    }
                    </div>
                    </button>
            </div>
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
                (!isLive ? (check.includes(league.league_key) && liveCheck.includes(league.league_key)) : check.includes(league.league_key)) &&
                <div key={league.league_key} className={`border border-lighterOrange border-solid mb-4 rounded divide-y divide-lighterOrange`}>
                        {(check.includes(league.league_key) )
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
                        
                        fixtures.filter(fixture => {

                            // fixture.event_live === isLive
                            if (isLive) {
                                return fixture
                            }
                            else {
                                return fixture.event_live === '1'
                            }
                            
                            
                        }).map((fixture, index) => (
                            // leagues.map(league => (
                                
                            // )) 
                            (league.league_key == fixture.league_key ) &&

                            <div key={fixture.event_key} className='text-gray-200 text-xs p-2 flex gap-2 ' onClick={() => handleClick(fixture)}>
                                {/* <div>{fixture.country_name}</div> */}
                                {/* <h1>{fixture.league_name}</h1> */}
                                <div className='text-xxs text-gray-300 '>
                                    <div>
                                        {fixture.event_time}
                                    </div>
                                    <div className={`${fixture.event_status !== 'Half Time' && fixture.event_status !== 'Finished' && fixture.event_live ===  '1' ? ' text-lightOrange animate-pulse': '' } ' text-[.35rem] text-center '`}>
                                        {fixture.event_status === 'Finished' ? 'FT' : fixture.event_status === 'Half Time' ? 'HT' : fixture.event_status === '' ? '-' : !isNaN(+fixture.event_status || fixture.event_status.includes('+')) ? `${fixture.event_status}'` : `${fixture.event_status.slice(0,4)}.` }
                                    </div>
                                </div>
                                <div className='cursor-pointer w-full '>
                                    <div className='flex gap-1 items-center'>
                                        <img src={fixture.home_team_logo} alt="" className='w-2 h-2'/>
                                        <div className='flex justify-between  w-full'>
                                            <div className='text-xs'>
                                                {fixture.event_home_team}
                                            </div>
                                            <div className='text-xxs'>
                                                {fixture.event_final_result.slice(0,fixture.event_final_result.indexOf('-'))}
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <img src={fixture.away_team_logo} alt="" className='h-2 w-2'/>
                                        <div className='flex justify-between w-full'>
                                            <div className='text-xs'>
                                                {fixture.event_away_team}
                                            </div>
                                            <div className='text-xxs'>
                                                {fixture.event_final_result.slice(fixture.event_final_result.indexOf('-') + 1, fixture.event_final_result.length + 1)}
                                            </div>
                                            
                                        </div>
                                        
                                        
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