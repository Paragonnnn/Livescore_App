import React from 'react'
import { Link } from 'react-router-dom'

const LineUp = ({statToggle, lineUp}) => {
  return (
    <div>
        <div className={`${statToggle.includes('Line-Up') ? 'block' : 'hidden'} flex justify-between `}>
            <div className='divide-y divide-black w-[48%] '>
                <div className=' text-lg font-semibold '>Home Line-Up</div>
                {
                    lineUp &&
                    lineUp.map((lineUp,index) => (
                        <div key={index} className='divide-y divide-black'>
                            {lineUp.home_team.starting_lineups.sort((a,b) => (
                        parseInt(a.player_position) - parseInt(b.player_position)
                    )).map((startingLineUp,index) => (
                                <div key={index} className='py-1 flex gap-2'>
                                    <Link to={`/player/${startingLineUp.player.replace(' ', '-')}/${startingLineUp.player_key}`} className=''>
                                        {startingLineUp.player}
                                    </Link>
                                    <div className=' text-white opacity-60'>({startingLineUp.player_number})</div>
                                    

                                </div>
                            ))}
                        </div>
                    ))
                }

            </div>
            <div className=' text-right w-[48%] divide-y divide-black'>
                <div className=' text-lg font-semibold '>Away Line-Up</div>
                {
                    lineUp &&
                    lineUp.map((lineUp,index) => (
                        <div key={index} className='divide-y divide-black'>
                            {lineUp.away_team.starting_lineups.sort((a,b) => (
                        parseInt(a.player_position) - parseInt(b.player_position)
                    )).map((startingLineUp,index) => (
                                <div key={index} className=' py-1 flex gap-2 justify-end'>
                                    <div className=' text-white opacity-60'>({startingLineUp.player_number})</div>
                                    <Link to={`/player/${startingLineUp.player.replace(' ', '-')}/${startingLineUp.player_key}`}>
                                        {startingLineUp.player}
                                    </Link>
                                    

                                </div>
                            ))}
                        </div>
                    ))
                }

            </div>
        </div>
    </div>
  )
}

export default LineUp