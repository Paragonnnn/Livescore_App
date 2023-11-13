import React from 'react'

const Odds = ({statToggle, odds, handleClick, bookie,windowWidth }) => {
  return (
    <div>
        <div className={`${windowWidth < 1024 && (statToggle.includes('Odds') ? 'block' : 'hidden')} lg:animate-zoom animate-swipe text-gray-400`}>
          {
            odds &&
            odds.filter(odd => (odd.odd_bookmakers === '1xBet' || odd.odd_bookmakers === 'Betway')).map((odd,index) => (
              <div key={odd.odd_bookmakers} className=' w-full '>
                {
                  index === 0 &&
                  <div className=' grid grid-cols-2 gap-2 mb-4'>
                    <div className={`${bookie === '1xBet'? 'after:block after:bg-gray-700 after:w-full after:h-1 after:animate-sel': ''}  pb-1 cursor-pointer flex flex-col gap-1  items-center `} onClick={handleClick}>1xBet</div>
                    <div className={`${bookie === 'Betway'? 'after:block after:bg-gray-700 after:w-full after:h-1 after:animate-sel': ''}  pb-1 cursor-pointer flex flex-col gap-1  items-center`} onClick={handleClick}>Betway</div>
                  </div>

                }
                
                {odd.odd_bookmakers === bookie &&

                  <div className=''>
                    <div className=' mb-5'>
                      <div className=' opacity-60 text-xs mb-2'>
                        Full time
                      </div>
                      <div className=' grid grid-cols-3 gap-2'>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' border border-solid border-gray-700  bg-customBg2 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>1</span>
                            <div className='text-xs sm:text-base'>{odd.odd_1}</div>

                        </div>
                          </a>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' border border-solid border-gray-700  bg-customBg2 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>X</span>
                            <div className='text-xs sm:text-base'>{odd.odd_x}</div>

                        </div>
                          </a>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' border border-solid border-gray-700  bg-customBg2 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>2</span>
                            <div className='text-xs sm:text-base'>{odd.odd_2}</div>

                        </div>
                          </a>
                        
                      </div>
                    </div>
                    <div className=' mb-5'>
                      <div className=' opacity-60 text-xs mb-2'>
                        Double chance
                      </div>
                      <div className=' grid grid-cols-3  gap-2'>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>1X</span>
                            <div className=' text-xs sm:text-base'>{odd.odd_1x}</div>

                        </div>
                          </a>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>X2</span>
                            <div className=' text-xs sm:text-base '>{odd.odd_x2}</div>

                        </div>
                          </a>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs '>12</span>
                            <div className=' text-xs sm:text-base '>{odd.odd_12}</div>

                        </div>
                          </a>
                        
                      </div>

                    </div>
                    <div className=' mb-5'>
                      <div className=' opacity-60 text-xs mb-2'>
                        Both teams to score
                      </div>
                      <div className=' grid grid-cols-2  gap-2'>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>Yes</span>
                            <div className=' text-xs sm:text-base'>{odd.bts_yes}</div>

                        </div>
                          </a>
                          <a href={`${bookie === '1xBet' ? 'https://1xbet.com/' : 'https://betway.com/'}`} target='_blank'>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                            <span className=' opacity-60 text-xxs sm:text-xs'>No</span>
                            <div className=' text-xs sm:text-base '>{odd.bts_no}</div>

                        </div>
                          </a>
                      </div>
                    </div>
                    {/* <div className=' mb-5'>
                      <div className=' opacity-60 text-xs mb-2'>
                        Over/Under
                      </div>
                      <div className=' grid grid-cols-2  gap-2'>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                          <span className=' opacity-60 text-xxs sm:text-xs'>Over 0.5</span>
                          <div className=' text-xs sm:text-base'>{odd.o+0.5}</div>
                        </div>
                        <div className=' bg-customBg2 border border-solid border-gray-700 flex justify-center flex-col items-center py-1 rounded'>
                          <span className=' opacity-60 text-xxs sm:text-xs'>Under 0.5</span>
                          <div className=' text-xs sm:text-base '>{odd.u+0.5}{console.log(odd.u+0.5)}</div>
                        </div>
                      </div>
                    </div> */}
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