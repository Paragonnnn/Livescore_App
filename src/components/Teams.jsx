import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'
import GoalKeepers from './GoalKeepers'
import Defenders from './Defenders'
import Midfielders from './Midfielders'
import Forwards from './Forwards'
import TeamFixtures from './TeamFixtures'

const Teams = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const [isCap, setIsCap] = useState([])
    const [teamFixtures, setTeamFixtures] = useState([])
    const {id} = useParams()
    const api_key = import.meta.env.VITE_api_key
    
    
    const date = new Date()
    const fromDate = (`${date.getFullYear() - 3}-${date.getMonth() + 1}-${date.getDate()}`)
    const toDate = (`${date.getFullYear() + 1}-${date.getMonth() + 1}-${date.getDate()}`)
    console.log(fromDate,toDate,date);
    const [from, setFrom] = useState(fromDate)
    const [to,setTo] = useState(toDate)
    useEffect(() => {
        async function getData() {
            setLoading(true)
            await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${id}&APIkey=${api_key}`)
            .then(res => res.json())
            .then(json => {
                setTeams(json.result)
                setLoading(false)
                console.log(json.result);
                json.result.map((team) => (
                    team.players.map(cap => (
                        setIsCap(cap.player_is_captain)
                    ))
                    ))
                    console.log(isCap);
            })
            .catch(err => console.log(err))
        }
        getData()
    },[id])
    useEffect(() => {
        async function getData() {
            await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&teamId=${id}&APIkey=${api_key}&from=${from}&to=${to}`)
            .then(res => res.json())
            .then(json => {
                setTeamFixtures(json.result)
                console.log(json.result);
            })
        }
        getData()
    },[id])
  return (
    <div className='  p-4 lg:grid grid-cols-5 gap-4'>
        {
            loading && (
                <Loading />

            )

        }
        {

        }
        <div className=' bg-customBg2 p-4 h-fit col-span-3 '>
            {
                teams.map((team) => (
                    <div key={team.team_key} className=' '>
                        <div className=' bg-black gap-12 p-4 rounded-xl mb-5 bg-opacity-40 w-full flex items-center'>
                            <img src={team.team_logo} alt="" className=' h-24'/>
                            <div>
                                <div className='text-3xl font-bold text-gray-300'>{team.team_name} </div>
                            </div>
                        </div>
                        
                    
                        <div>
                            <GoalKeepers team={team}/>
                            <Defenders team={team}/>
                            <Midfielders team={team}/>
                            <Forwards team={team}/>

                        </div>
                    </div>
                ))
            }

        </div>
        <div className=' col-span-2'>
            <TeamFixtures  teamFixtures={teamFixtures}/>     

        </div>
    </div>
  )
}

export default Teams