import React from 'react'
import { ball,ogball,assist,sub } from '..'

const SecondHalfEvent = ({events}) => {
  return (
    <div className='divide-y divide-black'>
        {
                      events &&
                      events.filter(eve => eve.info_time === '2nd Half').sort((a,b) => (
                        parseInt(a.time) - parseInt(b.time)
                      )).map((eve, index) => (
                        (eve.home_scorer || eve.away_scorer || eve.home_fault || eve.away_fault) && 
                        
                        <div key={index} className='py-2 divide-y divide-black'>
                          {
                            index === 0 && (
                              <div className=' text-center mb-2'>Second Half</div>
                            )
                          }
                          {
                            <div className='flex gap-4 sm:justify-between items-center py-2'>
                              <div className='w-fit sm:w-16 text-left sm:text-center text-xxs sm:text-xs '>{eve.time}'</div>
                              <div className='sm:w-[calc(100%-64px)] flex  w-full justify-between'>
                                <div className='w-[calc(50%-35px)] '>
                                  {
                                    (eve.card && eve.home_fault) && (
                                      <div className='flex gap-1 justify-end items-center text-xs'>
                                        {
                                          eve.home_fault
                                        }
                                        <div className={`${eve.card === 'yellow card' ? 'bg-yellow-500' : 'bg-red-700'} w-3 h-4 sm:w-4 sm:h-5 rounded-[2px]`}></div>
                                      </div>
                                    ) 
                                    
                                  }
                                  {
                                    (eve.home_scorer && !isNaN(eve.score.slice(0,1))) && (
                                      <div className='flex gap-1 justify-end  items-center text-xs'>
                                        <div className='flex flex-col items-end'>
                                          <div className=' '>{eve.home_scorer}</div>
                                          {
                                            eve.home_assist && (

                                              <div className={`flex gap-1 items-center font-semibold opacity-70 w-fit `}>
                                                    <img src={assist} className=' w-[15px] h-[15px]'  />
                                                    {eve.home_assist} 
                                                    
                                              </div>
                                            )
                                          }

                                        </div>
                                        <div className='relative'>
                                            <img src={(eve.home_scorer.includes('(o.g.)') || eve.home_scorer.includes('(OG)')) ? ogball : ball} alt="" className='w-[20px] h-[20px]'/>
                                            <div className=' opacity-70 absolute top-[-5px] right-0'>{eve.info === 'Penalty' || eve.home_scorer.includes('PG') ? 'p' : ''}</div>
                                        </div>
                                      </div>
                                    ) 
                                  }
                                  {

                                    (!Array.isArray(eve.home_scorer) && eve.score === 'substitution') && (
                                        <div className='flex gap-1 justify-end items-center '>
                                            <div className=' flex items-end text-xxs flex-col'>
                                                <div><span className=' text-green-600'>In:</span> {eve.home_scorer.in}</div>
                                                <div><span className=' text-red-900'>Out:</span> {eve.home_scorer.out}</div>
                                            </div>
                                            <img src={sub} className='opacity-70 h-5 w-5' alt="" />
                                        </div>
                                    )
                                    }
                                  

                                </div>
                                <div className='w-[50px] text-xs flex items-center justify-center '>
                                  {
                                    ((eve.home_scorer || eve.away_scorer) && !isNaN(eve.score.slice(0,1))) && (
                                      eve.score
                                    )
                                  }
                                </div>
                                <div className='w-[calc(50%-35px)] '>
                                  {
                                    (eve.away_scorer && !isNaN(eve.score.slice(0,1))) && (
                                      <div className='flex gap-1 items-center text-xs'>
                                        <div className='relative'>
                                        <img src={(eve.away_scorer.includes('(o.g.)') || eve.away_scorer.includes('(OG)')) ? ogball : ball} alt="" className='w-[20px] h-[20px]'/>
                                        <div className=' opacity-70 absolute top-[-5px] right-0'>{eve.info === 'Penalty' || eve.away_scorer.includes('PG') ? 'p' : ''}</div>
                                        </div>
                                        <div className='flex flex-col'>
                                          <div className=' '>{eve.away_scorer}</div>
                                          <div className=' flex gap-1 items-center font-semibold opacity-70'>
                                              {eve.away_assist && (
                                                eve.away_assist 
                                              )} 
                                              {eve.away_assist && <img src={assist} className=' w-[15px] h-[15px]'  /> }
                                            </div>

                                        </div>
                                      </div>
                                    ) 
                                    
                                  }
                                  {(eve.card && eve.away_fault) && (
                                    <div className='flex gap-1 items-center text-xs'>
                                      <div className={`${eve.card === 'yellow card' ? 'bg-yellow-500' : 'bg-red-700'} w-3 h-4 sm:w-4 sm:h-5 rounded-[2px]`}></div>
                                      {
                                        eve.away_fault
                                      }
                                    </div>
                                  ) }
                                    {

                                        (!Array.isArray(eve.away_scorer) && eve.score === 'substitution') && (
                                            <div className='flex gap-1  items-center '>
                                                <img src={sub} className='opacity-70 h-5 w-5' alt="" />
                                                <div className=' flex justify-center text-xxs flex-col'>
                                                    <div>{eve.away_scorer.in} <span className=' text-green-600'>:In</span></div>
                                                    <div>{eve.away_scorer.out} <span className=' text-red-900'>:Out</span> </div>
                                                </div>
                                            </div>
                                        )
                                    }


                                </div>
                              </div>

                            </div>
                          }
                          
                        </div>
                      ))
                    }
    </div>
  )
}

export default SecondHalfEvent