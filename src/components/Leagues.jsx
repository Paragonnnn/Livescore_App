import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Error from './Error'
import Loading from './Loading'

const Leagues = () => {
    const [leagues, setLeagues] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const {id} = useParams()
    
    const api_key = import.meta.env.VITE_api_key

    useEffect(() => {
        setLoading(true)
        async function getData() {
            await fetch(`https://apiv2.allsportsapi.com/football/?met=Leagues&countryId=${id}&APIkey=${api_key}`)
            .then(res => res.json())
            .then(json => {
                setError(false)
                setLoading(false)
                setLeagues(json.result)
                console.log(json.result);
            })
            .catch(err => {
                console.log(err)
                console.log('errors');
                setError(true)
                setLoading(false)
            })
        }
        getData()
    },[id])
  return (
    <div >
        {
            error && <Error/>
        }
        
        {
            loading && (
                <Loading />

            )

        }
            {
                leagues.slice(0,1).map((league) => (
                    <div>
                        <h1 key={league.league_key} className='country_name_header'>{league.country_name}
                        </h1>
                        <img src={league.country_logo} alt="" className='bg_logo' />

                    </div>
                ))
            }
        <div className='country_div'>
            
            {
                leagues.map((league) => (
                    <Link to={`/table/${league.league_name.replace(/ /g, '-')}/${league.league_key}`} key={league.league_key} className='country'>
                        <div className='country_name_div'>
                            <h1 className='country_name'>
                                {league.league_name}
                            </h1>
                        </div>
                            <img src={league.league_logo} alt="" className='country_logo'/>
                        
                    </Link>
                ))
            }

        </div>
    </div>
  )
}

export default Leagues