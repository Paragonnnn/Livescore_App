import React from 'react'
import { Link } from 'react-router-dom'

const GoalKeepers = ({team}) => {
  return (
    <div>
        <div className=' mb-5'>
                <h1 className=' text-3xl text-customBg font-semibold mb-4'>Goalkeepers</h1>
                <div className='flex flex-wrap gap-5 px-2'>
                    {
                        team.players.filter(player => player.player_type == 'Goalkeepers').map((player) => (
                            // player.player_type == 'Goalkeepers' &&

                            <Link to={`/player/${player.player_name.replace(/ +/g, '-')}/${player.player_key}`} key={player.player_key} className=' w-32 h-40 flex flex-col justify-start pt-4 gap-4 items-center bg-black bg-opacity-30 rounded-xl'>
                                <div className='relative'>
                                    <img src={player.player_image} alt="" className=' h-16 w-16 rounded-full'/>
                                    <div className='absolute bottom-0 right-0 text-xs w-6 flex justify-center items-center  bg-opacity-70 h-6 rounded-full bg-white'>{player.player_number}</div>
                                </div>
                                <div className='text-base text-center w-[110px]  text-gray-300'>{player.player_name} </div>
                            </Link>
                            
                        ))
                    }

                </div>

        </div>
    </div>
  )
}

export default GoalKeepers