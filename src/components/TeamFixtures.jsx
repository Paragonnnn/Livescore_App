import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TeamFixtures = ({teamFixtures}) => {

    const [filterFixtures,setFilterFixtures] = useState('Fixtures')


    const date = new Date
    const year = date.getFullYear()
  return (
    <div>
        <div className={` divide-y divide-black`}>
            <div className='flex gap-4 bg-customBg2 text-customBg p-2'>
                <div className={`${filterFixtures === 'Fixtures' ? 'bg-customBg text-white' : ''} cursor-pointer px-3 py-1 font-bold text-lg border border-solid border-customBg rounded-full hover:bg-opacity-90 active:bg-opacity-80`} onClick={() => setFilterFixtures('Fixtures')}>Fixtures</div>
                <div className={`${filterFixtures === 'Results' ? 'bg-customBg text-white' : ''} cursor-pointer px-3 py-1 font-bold text-lg border border-solid border-customBg rounded-full hover:bg-opacity-90 active:bg-opacity-80`} onClick={() => setFilterFixtures('Results')}>results</div>
            </div>
          {
              teamFixtures &&
              teamFixtures.filter(past => (filterFixtures === 'Fixtures' && !past.event_final_result.includes('?') ? past.event_status === '' : past.event_status !== '')).reverse().map(h => (
                <div key={h.event_key} className=' py-4  divide-y divide-black '>
                    <div className=' mb-2 text-lg font-semibold rounded bg-customBg2 text-customBg p-2'>
                        <div>{h.league_name}</div>
                    </div>
                    <div className=''>
                        <div className='flex gap-8 items-center text-gray-400'>
                            <div className='flex flex-col items-center w-14 mt-2'>
                                <div>{h.event_date.slice(0,h.event_date.indexOf('-')) === year.toString() ? h.event_date.slice(h.event_date.indexOf('-') + 1 ,h.event_date.lenght) : h.event_date.slice(0,h.event_date.indexOf('-'))}</div>
                                <div className={`text-xs`}>{h.event_status === 'Finished' ? 'FT' : h.event_time}</div>
                            </div>
                            <Link to={`/fixture/${h.league_name.replace(/ +/g,'-')}/${h.event_home_team.replace(/ +/g,'-')}-${h.event_away_team.replace(/ +/g,'-')}/${h.event_key}`} className='w-full mt-2 '>
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

export default TeamFixtures