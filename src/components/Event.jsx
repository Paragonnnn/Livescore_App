import React from 'react'
import FirstHalfEvent from './FirstHalfEvent'
import SecondHalfEvent from './SecondHalfEvent'
import ExtraTimeEvent from './ExtraTimeEvent'
import PenaltyShootOutEvent from './PenaltyShootOutEvent'

const Event = ({events,statToggle,windowWidth}) => {
  return (
    <div className={``}>
      <div className={`${windowWidth < 1024 && (statToggle.includes('Events') ? 'block' : 'hidden')} p-2  shadow-sm rounded text-gray-400 lg:animate-zoom animate-swipe`}>
      {
        events.length === 0 ? <div>no event</div> : 
        <>
        {/* <div className=' bg-customBg  w-fit px-4 rounded-full mb-2'>Events</div> */}
          <FirstHalfEvent events={events}/>
          <SecondHalfEvent events={events}/>
          <ExtraTimeEvent events={events}/>
          <PenaltyShootOutEvent events={events}/>
        
        </>
      }
          </div>
    </div>
  )
}

export default Event