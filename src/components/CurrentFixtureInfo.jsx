import React from 'react'
import { Link } from 'react-router-dom'


const CurrentFixtureInfo = ({match, odds, handleClick, handleSeeMore, bookie, seeMore}) => {
  return (
    <div>
        {
          match.map(match => (
            <div key={match.event_key}>
              {/* {match.event_home_team} vs {match.event_away_team} */}
              <div>{match.event_date}{match.league_name}</div>
                  <div className=' w-full bg-customBg2 text-customBg p-2 grid grid-cols-5 items-center rounded mb-4'>
                    <div className='text-center col-span-2 justify-self-start flex flex-col gap-1 justify-center items-center'>
                      <Link to={`/team/${match.event_home_team.replace(/ +/g,'-')}/${match.home_team_key}`}><img src={match.home_team_logo} alt="" className='w-[50px]'/></Link>
                      <div className='text-xxs md:text-xs'>
                        {match.event_home_team}
                      </div>
                    </div> 
                    <div className={`${match.event_live === '1' ? 'text-live   ' : 'text-customBg '} text-center col-span-1 `}>
                      <div className=' lg:text-base xl:text-2xl'>{match.event_final_result}</div>
                      <div className='text-base'>{match.event_status === 'Finished' ? 'FT' : match.event_status === 'Half Time' ? 'HT' : match.event_status}</div>
                    </div>
                    <div className='text-center col-span-2 justify-self-end flex flex-col gap-1 justify-center items-center'>
                      <Link to={`/team/${match.event_away_team.replace(/ +/g,'-')}/${match.away_team_key}`}><img src={match.away_team_logo} alt="" className='w-[50px]'/></Link>
                      <div className='text-xxs md:text-xs'>
                        {match.event_away_team}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    {/* <Link to={`/fixture/${match.event_key}`} className='px-4 bg-customBg py-1 text-lg  rounded hover:opacity-80 mt-3'>show more</Link> */}

                  </div>
                  <div>
                  {
                    odds &&
                    odds.filter(odd => (odd.odd_bookmakers === '1xBet' || odd.odd_bookmakers === 'Betway')).map(odd => (
                      <div key={odd.odd_bookmakers}>
                        <div onClick={handleClick} className='flex '>{odd.odd_bookmakers}</div>
              
                        {odd.odd_bookmakers === bookie &&

                        <div >
                          {/* {odd.odd_bookmakers} */}
                          <div className='flex justify-between w-[90%] m-auto text-white transition'>
                            <div className='py-1 px-4 bg-customBg2 bg-opacity-70 hover:bg-opacity-100 transition  rounded'>{odd.odd_1}</div>
                            <div className='py-1 px-4 bg-customBg2 bg-opacity-70 hover:bg-opacity-100 transition  rounded'>{odd.odd_x}</div>
                            <div className='py-1 px-4 bg-customBg2 bg-opacity-70 hover:bg-opacity-100 transition  rounded'>{odd.odd_2}</div>
                          </div>
                          <div className={`${seeMore ? 'block ': ' hidden'}`}>
                            {odd.odd_bookmakers}
                          </div>
                          <div className='cursor-pointer  ' onClick={handleSeeMore}>{seeMore? 'see less' : 'see more'}</div>

                          <div>

                          </div>

                        </div>
                  }
              

                  </div>
          ))
        }
        </div>
                
                </div>
          ))
        }
    </div>
  )
}

export default CurrentFixtureInfo