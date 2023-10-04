import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Error from './Error'
import Loading from './Loading'

const Table = () => {
    const [table, setTable] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [topScorers, setTopScorers] = useState([])

    const {id} = useParams()
    
    const api_key = import.meta.env.VITE_api_key

    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${id}&APIkey=${api_key}`)
            .then((res) => res.json())
            .then(json => {
                setTable(json.result.total)
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
        <div className='lg:grid grid-cols-2'>

        {table.length != 0  &&   (
            
        <div className='bg-customBg2 col-span-1 divide-y divide-black border border-solid border-lighterOrange rounded-md px-1'>
            
            <section className=''>
                <section className='text-white flex justify-between p-4 '>
                    {/* <div className='p-2 w-fit border border-solid border-lighterOrange'>S/P</div> */}
                    <div className='p-2 w-fit '>Club</div>
                    <section className='flex justify-between w-[350px] '>
                        <div className='p-2 '>MP</div>
                        <div className='p-2 '>W</div>
                        <div className='p-2 '>D</div>
                        <div className='p-2 '>L</div> 
                        <div className='p-2 '>GF</div>
                        <div className='p-2 '>GA</div>
                        <div className='p-2 '>GD</div>
                        <div className='p-2 '>Pts</div>

                    </section>
                </section>
            </section>
            <section className='divide-y divide-black'>
            {
                table.map((table) => (
                        <section key={table.team_key} className='flex justify-between  p-2  text-white ' >
                            <div className='p-2 flex items-center gap-2' >
                            <div className='p-2 '>{table.standing_place}.</div>
                                <img className='w-6 rounded-full h-6' src={table.team_logo} alt="" />
                                <Link to={`/teams/${table.team_key}`}>{table.standing_team}</Link> 
                            </div>
                            <section className='flex justify-between w-[350px] '>
                                <div className='p-2'>{table.standing_P}</div>
                                <div className='p-2'>{table.standing_W}</div>
                                <div className='p-2'>{table.standing_D}</div>
                                <div className='p-2'>{table.standing_L}</div>
                                <div className='p-2'>{table.standing_F}</div>
                                <div className='p-2'>{table.standing_A}</div>
                                <div className='p-2'>{table.standing_GD}</div>
                                <div className='p-2'>{table.standing_PTS}</div>

                            </section>
                        </section>
                        
                        
                        ))
                    }
            </section>

        </div>
        )}
        {table.length != 0  && (
            <div className='hidden lg:block col-span-1 h-full w-full bg-customBg2'>
                <h1>hi</h1>
            </div>
        )
        }
        </div>
    </div>
  )
}

export default Table