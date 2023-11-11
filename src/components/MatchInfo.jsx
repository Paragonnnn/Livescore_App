import React from 'react'
import { calendar2, stadium, whistle } from '..'

const MatchInfo = ({statToggle, match,windowWidth}) => {
    
  return (


      
    <div>
        <div className={`${windowWidth <1024 && (statToggle.includes('Match Info') ? 'block' : 'hidden')} lg:animate-zoom animate-swipe `}>
            {
                match && 
                match.map((match,index) => (
                    <div key={index} className=' text-gray-400 flex flex-col gap-2'>
                        <div className='border-2 border-solid border-customBg2 px-3 py-2 rounded'>
                            <img src={stadium} alt="" className=' h-5 w-5 opacity-60'/>
                            {match.event_stadium}
                        </div>
                        <div className='border-2 border-solid border-customBg2 px-3 py-2 rounded'>
                            <img src={whistle} alt="" className=' h-5 w-5 opacity-60'/>
                            {match.event_referee}
                        </div>
                        <div className=' border-2 border-solid border-customBg2 px-3 py-2 rounded '>
                            <img src={calendar2} alt="" className=' h-5 w-5 opacity-60'/>
                            {match.event_date}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MatchInfo