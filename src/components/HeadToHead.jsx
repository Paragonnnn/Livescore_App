import React from 'react'
import { Link } from 'react-router-dom'

const HeadToHead = ({statToggle, hToH}) => {
  return (
    <div>
        <div className={`${statToggle.includes('H2H') ? 'block' : 'hidden'}`}>
          {
              hToH &&
              hToH.map(h => (
                  <Link to={`/fixture/${h.event_key}`} key={h.event_key} >
                <div >
                    {h.event_home_team}
                    {h.event_final_result}
                    {h.event_away_team}
                  {h.event_date}
                  <div>
                    {
                      
                    }
                  </div>
                </div>
                    </Link>
              ))
            
          }

        </div>
    </div>
  )
}

export default HeadToHead