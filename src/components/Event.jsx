import React from 'react'
import { ball,ogball } from '..'

const Event = ({events}) => {
  return (
    <div>
        <div className=' p-2 divide-y divide-black bg-customBg2 rounded text-customBg'>
          <div className=' bg-customBg text-customBg2 w-fit px-4 rounded-full mb-2'>Events</div>
                    {
                      events &&
                      events.filter(eve => eve.info_time === '1st Half').sort((a,b) => (
                        parseInt(a.time) - parseInt(b.time)
                      )).map((eve, index) => (
                        (eve.home_scorer || eve.away_scorer || eve.home_fault || eve.away_fault) && 

                        <div key={index} className='py-2 divide-y divide-black '>
                          {
                            index === 0 && (
                              <div className=' text-center mb-2'>First Half</div>
                            )
                          }
                          {
                            <div className='flex justify-between items-center py-2'>
                              <div className='w-16 text-center text-xs'>{eve.time}</div>
                              <div className='w-[calc(100%-64px)] flex justify-between '>
                                <div className='w-[calc(50%-35px)] '>
                                  {
                                    (eve.card && eve.home_fault) && (
                                      <div className='flex gap-1 justify-end items-center text-xs'>
                                        {
                                          eve.home_fault
                                        }
                                        <div className={`${eve.card === 'yellow card' ? 'bg-yellow-500' : 'bg-red-700'} w-4 h-5 rounded-[2px]`}></div>
                                      </div>
                                    ) 
                                    
                                  }
                                  {
                                    (eve.home_scorer) && (
                                      <div className='flex gap-1 justify-end items-center text-xs'>
                                        <div className='flex flex-col items-end'>
                                          <div className=' '>{eve.home_scorer}</div>
                                              {eve.home_assist && (
                                          <div className={`  font-semibold opacity-70 w-fit `}>
                                                {eve.home_assist}(a)
                                                
                                          </div>
                                              )}

                                        </div>
                                        <div className='relative'>
                                        <img src={eve.home_scorer.includes('(o.g.)') ? ogball : ball} alt="" className='w-[20px] h-[20px]'/>
                                        <div className=' opacity-70 absolute top-[-5px] right-0'>{eve.info === 'Penalty' ? 'p' : ''}</div>
                                        </div>
                                      </div>
                                    ) 
                                  }
                                  

                                </div>
                                <div className='w-[50px] text-xs flex items-center justify-center '>
                                  {
                                    (eve.home_scorer || eve.away_scorer) && (
                                      eve.score
                                    )
                                  }
                                </div>
                                <div className='w-[calc(50%-35px)] '>
                                  {
                                    (eve.away_scorer) && (
                                      <div className='flex gap-1 items-center text-xs'>
                                        <div className='relative'>
                                        <img src={eve.away_scorer.includes('(o.g.)') ? ogball : ball} alt="" className='w-[20px] h-[20px] '/>
                                        <div className=' opacity-70 absolute top-[-5px] right-0'>{eve.info === 'Penalty' ? 'p' : ''}</div>
                                        </div>
                                        <div className='flex flex-col '>
                                          <div className=' '>{eve.away_scorer}</div>
                                          <div className='  font-semibold opacity-70'>
                                            {eve.away_assist && (
                                              eve.away_assist 
                                            )} 
                                            {eve.away_assist && <span>(a)</span>}
                                          </div>
                                          
                                        </div>
                                        
                                      </div>
                                    ) 
                                    
                                  }
                                  {(eve.card && eve.away_fault) && (
                                    <div className='flex gap-1 items-center text-xs'>
                                      <div className={`${eve.card === 'yellow card' ? 'bg-yellow-500' : 'bg-red-700'} w-4 h-5 rounded-[2px]`}></div>
                                      <div>{eve.away_fault}</div>
                                    </div>
                                  ) }

                                </div>
                              </div>

                            </div>
                          }
                          
                        </div>
                      ))
                    }
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
                            <div className='flex justify-between py-2 items-center'>
                              <div className='w-16 text-center text-xs '>{eve.time}</div>
                              <div className='w-[calc(100%-64px)] flex justify-between '>
                                <div className='w-[calc(50%-35px)] '>
                                  {
                                    (eve.card && eve.home_fault) && (
                                      <div className='flex gap-1 justify-end items-center text-xs'>
                                        {
                                          eve.home_fault
                                        }
                                        <div className={`${eve.card === 'yellow card' ? 'bg-yellow-500' : 'bg-red-700'} w-4 h-5 rounded-[2px]`}></div>
                                      </div>
                                    ) 
                                    
                                  }
                                  {
                                    (eve.home_scorer) && (
                                      <div className='flex gap-1 justify-end text-xs'>
                                        <div className='flex flex-col items-end'>
                                          <div className=' '>{eve.home_scorer}</div>
                                          {
                                            eve.home_assist && (

                                              <div className={`${eve.home_assist ? 'text-xxs ' : ''}  font-semibold opacity-70 w-fit `}>
                                                    {eve.home_assist}(a)
                                                    
                                              </div>
                                            )
                                          }

                                        </div>
                                        <div className='relative'>
                                            <img src={eve.home_scorer.includes('(o.g.)') ? ogball : ball} alt="" className='w-[20px] h-[20px]'/>
                                            <div className=' opacity-70 absolute top-[-5px] right-0'>{eve.info === 'Penalty' ? 'p' : ''}</div>
                                        </div>
                                      </div>
                                    ) 
                                  }
                                  

                                </div>
                                <div className='w-[50px] text-xs flex items-center justify-center '>
                                  {
                                    (eve.home_scorer || eve.away_scorer) && (
                                      eve.score
                                    )
                                  }
                                </div>
                                <div className='w-[calc(50%-35px)] '>
                                  {
                                    (eve.away_scorer) && (
                                      <div className='flex gap-1 items-center text-xs'>
                                        <div className='relative'>
                                        <img src={eve.away_scorer.includes('(o.g.)') ? ogball : ball} alt="" className='w-[20px] h-[20px]'/>
                                        <div className=' opacity-70 absolute top-[-5px] right-0'>{eve.info === 'Penalty' ? 'p' : ''}</div>
                                        </div>
                                        <div className='flex flex-col'>
                                          <div className=' '>{eve.away_scorer}</div>
                                          <div className='  font-semibold opacity-70'>
                                              {eve.away_assist && (
                                                eve.away_assist 
                                              )} 
                                              {eve.away_assist && <span>(a)</span>}
                                            </div>

                                        </div>
                                      </div>
                                    ) 
                                    
                                  }
                                  {(eve.card && eve.away_fault) && (
                                    <div className='flex gap-1 items-center text-xs'>
                                      <div className={`${eve.card === 'yellow card' ? 'bg-yellow-500' : 'bg-red-700'} w-4 h-5 rounded-[2px]`}></div>
                                      {
                                        eve.away_fault
                                      }
                                    </div>
                                  ) }

                                </div>
                              </div>

                            </div>
                          }
                          
                        </div>
                      ))
                    }

                  </div>
    </div>
  )
}

export default Event