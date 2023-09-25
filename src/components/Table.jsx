import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Error from './Error'
import Loading from './Loading'

const Table = () => {
    const [table, setTable] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


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

    const styling = {
        if (condition) {
            
        }
    }
  return (
    <div>
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
        <table border='1'>
            <thead>
                <tr>
                    <th>S/P</th>
                    <th>Team</th>
                    <th>MP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                </tr>
            </thead>
            {
                table.map((table) => (
                    <tbody key={table.team_key}>
                        <tr style={(table.standing_place_type == 'Promotion - Champions League (Group Stage: )') ? {background : 'lightgreen'} : {background: 'white'} }>
                            <th>{table.standing_place}</th>
                            <th>{table.standing_team} <img className='country_logo' src={table.team_logo} alt="" /></th>
                            <th>{table.standing_P}</th>
                            <th>{table.standing_W}</th>
                            <th>{table.standing_D}</th>
                            <th>{table.standing_L}</th>
                            <th>{table.standing_F}</th>
                            <th>{table.standing_A}</th>
                            <th>{table.standing_GD}</th>
                            <th>{table.standing_PTS}</th>
                        </tr>
                        
                        
                    </tbody>
                ))
            }

        </table>
    </div>
  )
}

export default Table