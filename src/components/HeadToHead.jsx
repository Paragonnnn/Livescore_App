import React from 'react'
import { Link } from 'react-router-dom'

const HeadToHead = ({statToggle, hToH}) => {
    const date = new Date
    const year = date.getFullYear()
  return (
    <div className=''>
        <div className={`${statToggle.includes('H2H') ? 'block' : 'hidden'}  divide-y divide-black lg:animate-zoom animate-swipe`}>
          {
              hToH &&
              hToH.map(h => (
                <div key={h.event_key} className=' py-4  divide-y divide-black '>
                    <div className=' mb-2 text-lg font-semibold rounded bg-customBg2 text-customBg p-2'>
                        <div>{h.league_name}</div>
                    </div>
                    <div className=' text-gray-400'>
                        <div className='flex gap-8 items-center'>
                            <div className='flex flex-col items-center w-14 mt-2'>
                                <div>{h.event_date.slice(0,h.event_date.indexOf('-')) === year.toString() ? h.event_date.slice(h.event_date.indexOf('-') + 1 ,h.event_date.lenght) : h.event_date.slice(0,h.event_date.indexOf('-'))}</div>
                                <div>{h.event_status === 'Finished' && 'FT'}</div>
                            </div>
                            <Link to={`/fixture/${h.league_name.replace(/ +/g,'-')}/${h.event_home_team.replace(/ +/g,'-')}-${h.event_away_team.replace(/ +/g,'-')}/${h.event_key}`} className='w-full mt-2'>
                                <div className='flex justify-between '>
                                    <div>{h.event_home_team}</div>
                                    <div className=' pr-1'>{h.event_final_result.slice(0,h.event_final_result.indexOf('-'))}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>{h.event_away_team}</div>
                                    <div className=' pr-1'>{h.event_final_result.slice(h.event_final_result.indexOf('-') + 1,h.event_final_result.lenght)}</div>
                                </div>

                            </Link>
                        </div>
                    </div>
                </div>
              ))
            
          }

        </div>
    </div>
  )
}

export default HeadToHead