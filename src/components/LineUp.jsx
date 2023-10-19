import React from 'react'
import { Link } from 'react-router-dom'

const LineUp = ({statToggle, lineUp}) => {
  return (
    <div>
        <div className={`${statToggle.includes('Line-Up') ? 'block' : 'hidden'} flex justify-between `}>
            <div className=' w-[48%] '>
                <div className='divide-y divide-black'>
                    <div className=' text-base sm:text-lg font-semibold '>Home Line-Up</div>
                    {
                        lineUp &&
                        lineUp.map((lineUp,index) => (
                            <div key={index} className='divide-y divide-black'>
                                {lineUp.home_team.starting_lineups.sort((a,b) => (
                            parseInt(a.player_position) - parseInt(b.player_position)
                        )).map((startingLineUp,index) => (
                                    <div key={index} className='py-1 flex gap-2 text-xxs sm:text-base'>
                                        <Link to={`/player/${startingLineUp.player.replace(/ +/g, '-')}/${startingLineUp.player_key}`} className=''>
                                            {startingLineUp.player}
                                        </Link>
                                        <div className=' text-black opacity-60'>({startingLineUp.player_number})</div>
                                        

                                    </div>
                                ))}
                            </div>
                        ))
                    }

                </div>
                <div className='divide-y divide-black'>
                    <div className=' text-base sm:text-lg font-semibold mt-4'>Home Sub</div>
                    {
                        lineUp && 
                        lineUp.map(lineUp => (
                            lineUp.home_team.substitutes.map((sub,index) => (
                                <div key={index} className='py-1 flex gap-2 text-xxs sm:text-base'>
                                    <Link to={`/player/${sub.player.replace(/ +/g, '-')}/${sub.player_key}`}>
                                        {sub.player}

                                    </Link>
                                    <div className=' text-black opacity-60'>({sub.player_number})</div>
                                </div>
                            ))
                        ))
                    }

                </div>
            </div>
            <div className=' w-[48%] '>
                <div className='divide-y divide-black'>
                    <div className=' text-base sm:text-lg font-semibold text-right'>Away Line-Up</div>
                    {
                        lineUp &&
                        lineUp.map((lineUp,index) => (
                            <div key={index} className='divide-y divide-black'>
                                {lineUp.away_team.starting_lineups.sort((a,b) => (
                            parseInt(a.player_position) - parseInt(b.player_position)
                        )).map((startingLineUp,index) => (
                                    <div key={index} className=' py-1 flex gap-2 justify-end text-xxs sm:text-base'>
                                        <div className=' text-black opacity-60'>({startingLineUp.player_number})</div>
                                        <Link to={`/player/${startingLineUp.player.replace(/ +/g, '-')}/${startingLineUp.player_key}`}>
                                            {startingLineUp.player}
                                        </Link>
                                        

                                    </div>
                                ))}
                            </div>
                        ))
                    }

                </div>
                <div className='divide-y divide-black '>
                    <div className=' text-base sm:text-lg font-semibold mt-4 text-right'>Away Sub</div>
                    {
                        lineUp && 
                        lineUp.map(lineUp => (
                            lineUp.away_team.substitutes.map((sub,index) => (
                                <div key={index} className='py-1 flex gap-2 justify-end text-xxs sm:text-base'>
                                    <div className=' text-black opacity-60'>({sub.player_number})</div>
                                    <Link to={`/player/${sub.player.replace(/ +/g, '-')}/${sub.player_key}`}>
                                        {sub.player}

                                    </Link>
                                </div>
                            ))
                        ))
                    }

                </div>

            </div>
        </div>
    </div>
  )
}

export default LineUp