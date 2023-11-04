import React from 'react'

const MatchInfo = ({statToggle, match,windowWidth}) => {
    
  return (


      
    <div>
        <div className={`${windowWidth <1024 && (statToggle.includes('Match Info') ? 'block' : 'hidden')} lg:animate-zoom animate-swipe`}>
            {
                match && 
                match.map((match,index) => (
                    <div key={index}>
                        {match.event_stadium}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MatchInfo