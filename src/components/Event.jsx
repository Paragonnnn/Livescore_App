import React from 'react'
import FirstHalfEvent from './FirstHalfEvent'
import SecondHalfEvent from './SecondHalfEvent'
import ExtraTimeEvent from './ExtraTimeEvent'
import PenaltyShootOutEvent from './PenaltyShootOutEvent'

const Event = ({events}) => {
  return (
    <div>
        <div className=' p-2  bg-customBg2 rounded text-customBg'>
          <div className=' bg-customBg text-customBg2 w-fit px-4 rounded-full mb-2'>Events</div>
            <FirstHalfEvent events={events}/>
            <SecondHalfEvent events={events}/>
            <ExtraTimeEvent events={events}/>
            <PenaltyShootOutEvent events={events}/>
        </div>
    </div>
  )
}

export default Event