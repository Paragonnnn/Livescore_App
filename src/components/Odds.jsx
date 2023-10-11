import React from 'react'

const Odds = ({statToggle, odds, handleClick, bookie, }) => {
  return (
    <div>
        <div className={`${statToggle.includes('Odds') ? 'block' : 'hidden'}`}>
          {
            odds &&
            odds.filter(odd => (odd.odd_bookmakers === '1xBet' || odd.odd_bookmakers === 'Betway')).map(odd => (
              <div key={odd.odd_bookmakers}z>
                <div onClick={handleClick}>{odd.odd_bookmakers}</div>
                
                {odd.odd_bookmakers === bookie &&

                  <div >
                    {odd.odd_bookmakers}
                    {odd.odd_1}
                    {odd.odd_x}
                    {odd.odd_2}
                  </div>
                }

              </div>
            ))
          }

        </div>
    </div>
  )
}

export default Odds