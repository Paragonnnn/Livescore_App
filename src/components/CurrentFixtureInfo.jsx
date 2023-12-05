import React from 'react'
import { Link } from 'react-router-dom'


const CurrentFixtureInfo = ({match,toggleMode}) => {
  return (
    <div className={`${toggleMode? 'text-darkText' : 'text-lightText'}`}>
        {
          match.map(match => (
            <div key={match.event_key}>
              {/* {match.event_home_team} vs {match.event_away_team} */}
              <div className={`${toggleMode? 'text-darkText' : 'text-lightText'} bg-customBg2 mb-2  p-2`}>{match.event_date}{match.league_name}</div>
                  <div className=' w-full bg-customBg2 p-2 px-3 grid grid-cols-5 items-center rounded mb-4'>
                    <div className='text-center col-span-2 justify-self-start flex flex-col gap-1 justify-center items-center'>
                      <Link to={`/team/${match.event_home_team.replace(/ +/g,'-')}/${match.home_team_key}`}><img src={match.home_team_logo} alt="" className=' w-[40px] md:w-[50px]'/></Link>
                      <div className='text-xxs md:text-xs'>
                        {match.event_home_team}
                      </div>
                    </div> 
                    <div className={`${match.event_live === '1' ? 'text-live   ' : ''} text-center col-span-1 `}>
                      <div className=' lg:text-base xl:text-2xl'>{match.event_final_result}</div>
                      <div className='text-base'>{match.event_status === 'Finished' ? 'FT' : match.event_status === 'Half Time' ? 'HT' : match.event_status}</div>
                    </div>
                    <div className='text-center col-span-2 justify-self-end flex flex-col gap-1 justify-center items-center'>
                      <Link to={`/team/${match.event_away_team.replace(/ +/g,'-')}/${match.away_team_key}`}><img src={match.away_team_logo} alt="" className='w-[40px] md:w-[50px]'/></Link>
                      <div className='text-xxs md:text-xs'>
                        {match.event_away_team}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    {/* <Link to={`/fixture/${match.event_key}`} className='px-4 bg-customBg py-1 text-lg  rounded hover:opacity-80 mt-3'>show more</Link> */}

                  </div>
                  
                
                </div>
          ))
        }
    </div>
  )
}

export default CurrentFixtureInfo