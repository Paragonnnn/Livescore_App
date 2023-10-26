import React from 'react'

const MatchInfo = ({statToggle, match}) => {
    
  return (


      
    <div>
        <div className={`${statToggle.includes('Match Info') ? 'block' : 'hidden'}`}>
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