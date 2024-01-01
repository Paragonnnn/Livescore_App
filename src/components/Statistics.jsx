import React from 'react'

const Statistics = ({statToggle, stats,windowWidth,toggleMode}) => {
  return (
    <div>
        <div className={`${windowWidth <1024 && (statToggle.includes('Stats') ? 'block' : 'hidden')} divide-y divide-black shadow-sm px-4 py-1 lg:animate-zoom animate-swipe`}>
          {
            stats.map(s => (s.length == 0)) ? <div>no stats yet</div> : 
            <>
              {
                stats &&
                stats.map(stat => (
                  stat.map(s => (

                  <div key={s.type}  className={`${toggleMode? 'text-darkText' : 'text-lightText'} divide-y divide-black`}>
                    
                      <div className='text-center  text-lg my-2  py-2'>{s.type}</div>
                      <div className='flex items-center justify-center gap-2 bg-customBg2 w-full py-[2px] rounded px-2'>
                        <div className='w-[45%]  h-[6px] rounded-l-full overflow-hidden flex justify-end  opacity-60'>
                        <div className={s.type === 'Ball Possession' ? `w-[${s.home}] bg-customBg h-[6px]` :`w-[${Math.round(((+s.home * 100)/(+s.home + +s.away)))}%] bg-customBg h-[6px] `}></div>

                        </div>
                        <div className='flex  w-[100px] justify-center  opacity-50'>{s.home} - {s.away}</div>
                        <div className='w-[45%]  h-[6px] overflow-hidden  rounded-r-full  opacity-60'>

                        <div className={s.type === 'Ball Possession' ? `w-[${s.away}] bg-customBg  h-[6px]` :`w-[${Math.round(((+s.away * 100)/(+s.home + +s.away)))}%]  bg-customBg h-[6px] `}></div>
                        </div>
                      </div>
                    
                  </div>
                  ))
                ))
              }
            </>
          }
            
        </div>
    </div>
  )
}

export default Statistics