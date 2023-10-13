import React from 'react'

const Statistics = ({statToggle, stats}) => {
  return (
    <div>
        <div className={`${statToggle.includes('Stats') ? 'block' : 'hidden'} divide-y divide-black bg-customBg2 p-4`}>
              <div className=' text-center text-2xl'>Statistics</div>
              {
                stats &&
                stats.map(stat => (
                  stat.map(s => (

                  <div key={s.type}  className='divide-y divide-black'>
                    
                      <div className='text-center text-white text-lg my-2   '>{s.type}</div>
                      <div className='flex items-center justify-center gap-2  w-full py-2'>
                        <div className='w-[45%] bg-customBg h-[6px] rounded-l-full overflow-hidden flex justify-end border border-solid border-customBg'>
                        <div className={s.type === 'Ball Possession' ? `w-[${s.home.slice(0,s.home.indexOf('%'))}%]` :`w-[${Math.round(((+s.home * 100)/(+s.home + +s.away)))}%] bg-customBg2 h-[6px]  `}></div>

                        </div>
                        <div className='flex  w-[100px] justify-center'>{s.home} - {s.away}</div>
                        <div className='w-[45%] bg-customBg h-[6px] overflow-hidden  rounded-r-full border border-solid border-customBg'>

                        <div className={s.type === 'Ball Possession' ? `w-[${s.away}]` :`w-[${Math.round(((+s.away * 100)/(+s.home + +s.away)))}%]  bg-customBg2 h-[6px] `}></div>
                        </div>
                      </div>
                    
                  </div>
                  ))
                ))
              }
        </div>
    </div>
  )
}

export default Statistics