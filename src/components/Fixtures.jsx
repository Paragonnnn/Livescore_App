import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Error from './Error'
import Countries from './Countries'
import { Link } from 'react-router-dom'

const Fixtures = ({leagues, fixtures , check, fixturesError, loadingFixtures, currentFixture, setCurrentFixture, liveCheck, windowWidth}) => {

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
        <div className='  bg-customBg2 rounded-md sm:p-4 p-2 shadow-sm '>
            <div className=' text-gray-400 p-2 mb-2 text-lg' >
                <div className=' flex  w-fit  rounded-full p-1'>
                <button onClick={all} className={`${isLive ? ' border border-solid border-customBg': 'text-gray-400 '}  px-3 rounded-full transition duration-200 ease-in-out`}>All</button>
                <button onClick={live} className={`${!isLive ? ' border border-solid border-customBg': 'text-gray-400'}  transition duration-200 ease-in px-3 rounded-full flex  items-center gap-1`}>Live <div className='text-xs text-live font-bold'>
                        ({
                        fixtures?.filter(fixture => fixture.event_live === '1').length
                    })
                    </div>
                    </button>

                </div>
            </div>
        {loadingFixtures && (
            <div className=' h-[100vh]'>
                <div className=' mb-4 divide-y rounded divide-black border border-solid border-black'>
                    <div className=' flex gap-2 items-center p-2'>
                        <div className=' w-6 h-6 rounded-full bg-loading animate-pulse'></div>
                        <div className='flex flex-col gap-1 '>
                            <div className=' h-3 w-20 bg-loading animate-pulse '></div>
                            <div className=' h-3 w-24 bg-loading animate-pulse '></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse rounded-sm'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse rounded-sm'></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>

                </div>
                <div className=' mb-4 divide-y rounded divide-black border border-solid border-black'>
                    <div className=' flex gap-2 items-center p-2'>
                        <div className=' w-6 h-6 rounded-full bg-loading animate-pulse'></div>
                        <div className='flex flex-col gap-1'>
                            <div className=' h-3 w-20 bg-loading animate-pulse '></div>
                            <div className=' h-3 w-24 bg-loading animate-pulse '></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>

                </div>
                <div className=' mb-4  divide-y rounded divide-black border border-solid border-black'>
                    <div className=' flex gap-2 items-center p-2'>
                        <div className=' w-6 h-6 rounded-full bg-loading animate-pulse'></div>
                        <div className='flex flex-col gap-1'>
                            <div className=' h-3 w-20 bg-loading animate-pulse '></div>
                            <div className=' h-3 w-24 bg-loading animate-pulse '></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>

                </div>
                <div className=' mb-4  divide-y rounded divide-black border border-solid border-black'>
                    <div className=' flex gap-2 items-center p-2'>
                        <div className=' w-6 h-6 rounded-full bg-loading animate-pulse'></div>
                        <div className='flex flex-col gap-1'>
                            <div className=' h-3 w-20 bg-loading animate-pulse '></div>
                            <div className=' h-3 w-24 bg-loading animate-pulse '></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>
                    <div className=' p-2 flex gap-2 items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div className=' w-7 h-3 bg-loading animate-pulse'></div>
                            <div className=' w-4 h-3 bg-loading animate-pulse '></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className=' w-28 h-3 sm:h-5 bg-loading animate-pulse'></div>
                            <div className=' w-36 h-3 sm:h-5 bg-loading animate-pulse'></div>
                        </div>
                    </div>

                </div>
            </div>
        )}
    
        {fixturesError && (
            <Error />
        )}
        <div className={`  mb-14`}>

        {
            // !(loading && error) &&
            (fixtures && leagues && !loadingFixtures) &&
            leagues.map((league,index) => (
                (!isLive ? (check.includes(league.league_key) && liveCheck.includes(league.league_key)) : check.includes(league.league_key)) &&
                <div key={league.league_key} className={`border border-black border-solid mb-4 first:rounded-t-lg last:rounded-b-lg divide-y divide-black`}>
                        {(check.includes(league.league_key) )
                        &&
                        <div className=' text-customBg py-2 px-3 text-xs  flex gap-1 items-center '>
                            <img src={league.country_logo} alt="" className='w-4 h-4 rounded-[100%] mr-2'/>
                            <div className='flex flex-col'>
                                <Link className='text-lightcustomBg' to={`/leagues/${league.country_name.replace(/ +/g,'-')}/${league.country_key}`}>{league.country_name}</Link> 
                                <Link to={`/table/${league.league_name.replace(/ +/g,'-')}/${league.league_key}`}>{league.league_name}</Link> 
                            </div>
                        </div>
                        }
                    {
                        
                        fixtures?.filter(fixture => {

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

                             
                                <div to={`/fixture/${fixture.event_key}`} key={fixture.event_key} className={`${windowWidth > 1024 ? 'hover:opacity-70 transition ' : ''}text-gray-400 text-xs p-2 flex gap-2 relative `} onClick={() => handleClick(fixture)}>
                
                                {/* <div>{fixture.country_name}</div> */}
                                {/* <h1>{fixture.league_name}</h1> */}
                                {
                                    windowWidth < 1024 &&
                                    <Link className='absolute h-full w-full z-[1] bg-transparent top-[-2px] left-[-2px]' to={`/fixture/${fixture.league_name.replace(/ +/g,'-')}/${fixture.event_home_team.replace(/ +/g,'-')}-${fixture.event_away_team.replace(/ +/g,'-')}/${fixture.event_key}`}></Link>

                                }
                                <div className='text-xxs  text-gray-300 flex flex-col justify-center items-center overflow-hidden border-r border-solid border-black'>
                                    <div>
                                        {fixture.event_time}
                                    </div>
                                    <div className={`${ fixture.event_status !== 'Finished' && fixture.event_live ===  '1' ? ' text-live font-semi-bold  text-[.65rem]': '' } ' text-[.5rem] text-center font-semibold w-[40px] text-ellipsis overflow-hidden  '`}>
                                        {fixture.event_status === 'Finished' ? 'FT' : fixture.event_status === 'Half Time' ? 'HT' : fixture.event_status === 'After Pen.' ? 'AP' : fixture.event_status === 'Postponed' || fixture.event_status === 'Cancelled'  ? `${fixture.event_status.slice(0,4)}..` : fixture.event_status === '' ? '-' : !isNaN(+fixture.event_status || fixture.event_status.includes('+')) ? `${fixture.event_status}'` : `${fixture.event_status.slice(0,4)}.` }
                                    </div>
                                </div>
                                <div  className=' cursor-pointer w-full '>
                                    <div className='flex gap-1 items-center'>
                                        <img src={fixture.home_team_logo} alt="" className='w-3 h-3'/>
                                        <div className='flex justify-between items-center  w-full'>
                                            <div className=' text-xs sm:text-base'>
                                                {fixture.event_home_team}
                                            </div>
                                            <div className='text-xs'>
                                                {fixture.event_final_result.slice(0,fixture.event_final_result.indexOf('-'))}
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <img src={fixture.away_team_logo} alt="" className='h-3 w-3 '/>
                                        <div className='flex justify-between items-center w-full'>
                                            <div className=' text-xs sm:text-base'>
                                                {fixture.event_away_team}
                                            </div>
                                            <div className='text-xs'>
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
        
    </div>
  )
}

export default Fixtures