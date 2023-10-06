import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Error from './Error'
import Loading from './Loading'

const Table = () => {
    const [table, setTable] = useState([])
    const [homeTable, setHomeTable] = useState([])
    const [awayTable, setAwayTable] = useState([])
    const [mappedTable, setMappedTable] = useState(table)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [topScorers, setTopScorers] = useState([])
    const [changeTable, setChangeTable] = useState('all')

    const {id} = useParams()
    const home = () => {
        setChangeTable('home')
        setMappedTable(homeTable)
        console.log(changeTable);
    }
    const away = () => {
        setChangeTable('away')
        setMappedTable(awayTable)
        console.log(changeTable);
    }
    const all = () => {
        setChangeTable('all')
        setMappedTable(table)
        console.log(changeTable);
    }

    
    const api_key = import.meta.env.VITE_api_key

    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${id}&APIkey=${api_key}`)
            .then((res) => res.json())
            .then(json => {
                setTable(json.result.total)
                setMappedTable(json.result.total)
                setHomeTable(json.result.home)
                setAwayTable(json.result.away)
                setError(false)
                setLoading(false)
            })
            .catch(err => {
                setError(true)
                setLoading(false)
            })
        }
        getData()
    },[id])
    useEffect(() => {
        async function getData() {
            await fetch(`https://apiv2.allsportsapi.com/football/?&met=Topscorers&leagueId=${id}&APIkey=${api_key}`)
            .then(res => res.json())
            .then(scorers => {
                setTopScorers(scorers.result)
                console.log(scorers.result);
            })
            .catch(err => {

            })
        }
        getData()
    },[id])

    
  return (
    <div className=''>
        {
            error && (
                <Error />
            )
        }
        {
            loading && (
                <Loading />

            )

        }
        {
            table && table.length == 0 && (
                <h3>No data found</h3>
            )
        }
        <div className='lg:grid grid-cols-2 gap-4 w-full'>

        {table.length != 0  &&   (
            
        <div className='bg-customBg2 col-span-1 divide-y divide-black border border-solid border-lighterOrange rounded-md px-1'>
            <div className='px-4 py-2'>
                <button className={`${changeTable === 'all' ? 'border-orange text-orange' : 'text-white '} text-[20px] py-1 px-6 rounded-full border border-solid border-white mr-4 hover:opacity-80`} onClick={all}>All</button>
                <button className={`${changeTable === 'home' ? 'border-orange text-orange' : 'text-white '} text-[20px] py-1 px-6 rounded-full border border-solid border-white mr-4 hover:opacity-80`} onClick={home}>Home</button>
                <button className={`${changeTable === 'away' ? 'border-orange text-orange' : 'text-white '} text-[20px] py-1 px-6 rounded-full border border-solid border-white hover:opacity-80`} onClick={away}>Away</button>

            </div>
            
            <section className=''>
            
                <section className='text-white flex justify-between md:p-4 p-1 text-xs'>
                    {/* <div className='p-2 w-fit border border-solid border-lighterOrange'>S/P</div> */}
                    <div className='md:p-2 p-1 w-fit '>Club</div>
                    <section className='flex justify-between md:w-[350px] w-[200px] '>
                        <div className='md:p-2 p-1 '>MP</div>
                        <div className='md:p-2 p-1 '>W</div>
                        <div className='md:p-2 p-1 '>D</div>
                        <div className='md:p-2 p-1 '>L</div> 
                        <div className='md:p-2 p-1 hidden sm:block'>GF</div>
                        <div className='md:p-2 p-1 hidden sm:block'>GA</div>
                        <div className='md:p-2 p-1 '>GD</div>
                        <div className='md:p-2 p-1 '>Pts</div>

                    </section>
                </section>
            </section>
            <section className='divide-y divide-black'>
            {
                mappedTable.map((table) => (
                        <section key={table.team_key} className='flex justify-between  md:px-4 p-1  text-white ' >
                            
                            <div className='md:p-2 p-1 flex items-center gap-2' >
                            <div className='md:p-2 p-1 '>{table.standing_place}.</div>
                                <img className='w-6 rounded-full h-6' src={table.team_logo} alt="" />
                                <Link className='text-xs sm:text-sm  md:text-lg' to={`/teams/${table.team_key}`}>{table.standing_team}</Link> 
                            </div>
                            <section className='flex justify-between md:w-[350px] w-[200px] '>
                                <div className='md:p-2 p-1'>{table.standing_P}</div>
                                <div className='md:p-2 p-1'>{table.standing_W}</div>
                                <div className='md:p-2 p-1'>{table.standing_D}</div>
                                <div className='md:p-2 p-1'>{table.standing_L}</div>
                                <div className='md:p-2 p-1 hidden sm:block'>{table.standing_F}</div>
                                <div className='md:p-2 p-1 hidden sm:block'>{table.standing_A}</div>
                                <div className='md:p-2 p-1'>{table.standing_GD}</div>
                                <div className='md:p-2 p-1'>{table.standing_PTS}</div>

                            </section>
                        </section>
                        
                        
                        ))
                    }
            </section>

        </div>
        )}
        {table.length != 0  && (
            <div className='hidden lg:block col-span-1 h-fit w-full bg-customBg2 divide-y divide-black px-4 sticky top-[80px] '>
                <div className='text-white text-[40px] text-center'>League Top Scorers</div>
                <div className='text-[24px] text-white flex justify-between p-2'>
                    <div>Player</div>
                    <div>Goals</div>
                </div>
                <div className='text-white divide-y divide-black'>
                    {
                        topScorers.map((top,index) => (
                            <div className='flex justify-between p-2'>
                                <div>
                                    {index+1}. {top.player_name}
                                
                                </div>
                                <div>
                                    {top.goals}
                                </div>
                                
                            </div>
                        ))
                    }

                </div>
            </div>
        )
        }
        </div>
    </div>
  )
}

export default Table