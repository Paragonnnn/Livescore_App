import React from 'react'
import { Link } from 'react-router-dom'

const Defenders = ({team,toggleMode}) => {
  return (
    <div>
        <div className={`${toggleMode? 'text-darkText':'text-lightText'} mb-5`}>
            <h1 className=' text-3xl text-customBg font-semibold mb-4'>Defenders</h1>
            <div  className='flex flex-col gap-5 px-2'>
                {
                    team.players.filter(player => player.player_type == 'Defenders').map((player) => (
                        // player.player_type == 'Goalkeepers' &&
                        <Link key={player.player_key} to={`/player/${player.player_name.replace(/ +/g, '-')}/${player.player_key}`} className=' w-full h-fit flex p-2 gap-4 items-center border border-solid border-gray-400 border-opacity-30 hover:opacity-90  rounded-xl'>
                            <div className=' relative'>
                                <img src={player.player_image} alt="" className=' h-12 w-12 rounded-full'/>
                                <div className={`absolute bottom-0 right-0 text-xs w-6 flex justify-center items-center  bg-opacity-70 h-6 rounded-full ${toggleMode? 'bg-white':'bg-black'} `}>{player.player_number}</div>
                            </div>
                            <div className='text-base '>{player.player_name} </div>
                        </Link>
                        
                    ))
                }

            </div>

        </div>
    </div>
  )
}

export default Defenders