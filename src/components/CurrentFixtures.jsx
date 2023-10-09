import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ball } from '..'

const CurrentFixtures = ({}) => {
    const [loading, setLoading] = useState(false)
    const [match,setMatch] = useState([])
    const [hToH, setHToH] = useState([])
    const [odds, setOdds] = useState([])
    const [bookie, setBookie] = useState('1xBet')
    const [seeMore, setSeeMore] = useState(false)
    const [stats, setStats] = useState([])
    const [cards, setCards] = useState([])
    const [goalscorers, setGoalscorers] = useState([])
    const [events, setEvents] = useState([])
    const [half,setHalf] = useState([])
    const {id} = useParams()
    

    const handleClick = (e) => {
      let book = e.target.innerHTML
        setBookie(book)
      console.log(book);
    }
    const handleSeeMore = () => {
      setSeeMore(prev => !prev)
    }

    // for (let i = 0; i < 101; i++) {
    //   setStatPercent([i])
    // }
    let test = [ 'w-[0%]' , 'w-[1%]' , 'w-[2%]' , 'w-[3%]' , 'w-[4%]' , 'w-[5%]' , 'w-[6%]' , 'w-[7%]' , 'w-[8%]' , 'w-[9%]' , 'w-[10%]' , 'w-[11%]' , 'w-[12%]' , 'w-[13%]' , 'w-[14%]' , 'w-[15%]' , 'w-[16%]' , 'w-[17%]' , 'w-[18%]' , 'w-[19%]' , 'w-[20%]' , 'w-[21%]' , 'w-[22%]' , 'w-[23%]' , 'w-[24%]' , 'w-[25%]' , 'w-[26%]' , 'w-[27%]' , 'w-[28%]' ,  'w-[29%]' , 'w-[30%]' , 'w-[31%]' , 'w-[32%]' , 'w-[33%]' , 'w-[34%]' , 'w-[35%]' , 'w-[36%]' , 'w-[37%]' , 'w-[38%]' , 'w-[39%]' , 'w-[40%]' , 'w-[41%]' , 'w-[42%]' , 'w-[43%]' , 'w-[44%]' , 'w-[45%]' , 'w-[46%]' , 'w-[47%]' , 'w-[48%]' , 'w-[49%]' , 'w-[50%]' , 'w-[51%]' , 'w-[52%]' , 'w-[53%]' , 'w-[54%]' , 'w-[55%]' , 'w-[56%]' , 'w-[57%]' , 'w-[58%]' , 'w-[59%]' , 'w-[60%]' , 'w-[61%]' , 'w-[62%]' , 'w-[63%]' , 'w-[64%]' , 'w-[65%]' , 'w-[66%]' , 'w-[67%]' , 'w-[68%]' , 'w-[69%]' , 'w-[70%]' , 'w-[71%]' , 'w-[72%]' , 'w-[73%]' , 'w-[74%]' , 'w-[75%]' , 'w-[76%]' , 'w-[77%]' , 'w-[78%]' , 'w-[79%]' , 'w-[80%]' , 'w-[81%]' , 'w-[82%]' , 'w-[83%]' , 'w-[84%]' , 'w-[85%]' , 'w-[86%]' , 'w-[87%]' , 'w-[88%]' , 'w-[89%]' , 'w-[90%]' , 'w-[91%]' , 'w-[92%]' , 'w-[93%]' , 'w-[94%]' , 'w-[95%]' , 'w-[96%]' , 'w-[97%]' , 'w-[98%]' , 'w-[99%]' , 'w-[100%]' ,]
    
    
    let per = 'w-[53%]'
  
   


    const api_key = import.meta.env.VITE_api_key
    useEffect(() => {
        async function getData() {
            await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&matchId=${id}&timezone=Africa/Lagos&APIkey=${api_key}`)
            .then(res => res.json())
            .then(json => {
              setMatch(json.result)
              console.log(json.result);
              setStats(json.result.map(s => (s.statistics)))
              console.log(json.result.map(s => (s.statistics)));
              // setEvents((json.result.cards).concat(json.result.goalscorers))
              // setCards(json.result.map(c => (c.cards)))
              // setGoalscorers(json.result.map(g => (g.goalscorers)))
              setEvents((json.result.map(c => (c.cards)).concat(json.result.map(g => (g.goalscorers)))).reduce((a, c) => {
                return a.concat(c);
              }, []))
              console.log((json.result.map(c => (c.cards)).concat(json.result.map(g => (g.goalscorers)))).reduce((a, c) => {
                return a.concat(c);
              }, []));
            })
            .catch(err => {

            })
        }
        getData()
    },[id])
    useEffect(() => {
      async function getData() {
        await fetch(`https://apiv2.allsportsapi.com/football/?met=H2H&APIkey=${api_key}&${match.map(match => (
          `firstTeamId=${match.home_team_key}&secondTeamId=${match.away_team_key}`
        ))}`)
        .then(res => res.json())
        .then(json => {
          setHToH(json.result.H2H)
          console.log(json.result.H2H);
        })
        .catch(err => {

        })
      }
      getData()
    },[match])
    useEffect(() => {
      async function getData() {
        await fetch(`https://apiv2.allsportsapi.com/football/?&met=Odds&matchId=${id}&APIkey=${api_key}`)
        .then(res => res.json())
        .then(json => {
          setOdds(json.result[id])
          console.log(json.result[id]);
        })
      }
      getData()
    },[match])
    
  return (
    <div className='grid md:grid-cols-2 '>
      <div className='col-span-1 w-[90%]  max-w-[700px] mx-auto '>
        {
          match.map(match => (
            <div key={match.event_key}>
              {/* {match.event_home_team} vs {match.event_away_team} */}
                  <div className=' w-full bg-customBg2 text-white p-2 grid grid-cols-5 items-center rounded'>
                    <div className='text-center col-span-2 justify-self-start flex flex-col gap-1 justify-center items-center'>
                      <Link to={`/teams/${match.home_team_key}`}><img src={match.home_team_logo} alt="" className='w-[50px]'/></Link>
                      <div className='text-xxs md:text-xs'>
                        {match.event_home_team}
                      </div>
                    </div> 
                    <div className={`${match.event_live === '1' ? 'text-lightOrange   ' : 'text-white '} text-center col-span-1 `}>
                      <div className=' lg:text-base xl:text-2xl'>{match.event_final_result}</div>
                      <div className='text-base'>{match.event_status === 'Finished' ? 'FT' : match.event_status === 'Half Time' ? 'HT' : match.event_status}</div>
                    </div>
                    <div className='text-center col-span-2 justify-self-end flex flex-col gap-1 justify-center items-center'>
                      <Link to={`/teams/${match.away_team_key}`}><img src={match.away_team_logo} alt="" className='w-[50px]'/></Link>
                      <div className='text-xxs md:text-xs'>
                        {match.event_away_team}
                      </div>
                    </div> 
                  </div>
                  <div className='flex justify-center'>
                    {/* <Link to={`/fixture/${match.event_key}`} className='px-4 bg-customBg py-1 text-lg  rounded hover:opacity-80 mt-3'>show more</Link> */}

                  </div>
                  <div>
                  {
                    odds &&
                    odds.filter(odd => (odd.odd_bookmakers === '1xBet' || odd.odd_bookmakers === 'Betway')).map(odd => (
                      <div key={odd.odd_bookmakers}>
                        <div onClick={handleClick} className='flex '>{odd.odd_bookmakers}</div>
              
                        {odd.odd_bookmakers === bookie &&

                        <div >
                          {/* {odd.odd_bookmakers} */}
                          <div className='flex justify-between w-[90%] m-auto text-white transition'>
                            <div className='py-1 px-4 bg-customBg2 bg-opacity-70 hover:bg-opacity-100 transition  rounded'>{odd.odd_1}</div>
                            <div className='py-1 px-4 bg-customBg2 bg-opacity-70 hover:bg-opacity-100 transition  rounded'>{odd.odd_x}</div>
                            <div className='py-1 px-4 bg-customBg2 bg-opacity-70 hover:bg-opacity-100 transition  rounded'>{odd.odd_2}</div>
                          </div>
                          <div className={`${seeMore ? 'block ': ' hidden'}`}>
                            {odd.odd_bookmakers}
                          </div>
                          <div className='cursor-pointer  ' onClick={handleSeeMore}>{seeMore? 'see less' : 'see more'}</div>

                          <div>

                          </div>

                        </div>
                  }
              

                  </div>
          ))
        }
        </div>
                  <div>
                  <div className=' p-2 divide-y divide-black'>
                    {
                      events &&
                      events.filter(eve => eve.info_time === '1st Half').sort((a,b) => (
                        parseInt(a.time) - parseInt(b.time)
                      )).map((eve, index) => (
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
                                      <div className='flex gap-1 justify-end text-xs'>
                                        <div className='flex flex-col items-end'>
                                          <div className=' text-white'>{eve.home_scorer}</div>
                                          <div className=' text-white opacity-70'>
                                              {eve.home_assist && (
                                                eve.home_assist 
                                              )}
                                              {eve.home_assist && <span>(assist)</span>}
                                          </div>

                                        </div>
                                        <img src={ball} alt="" className='w-[20px] h-[20px]'/>
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
                                        <img src={ball} alt="" className='w-[20px] h-[20px] text-white'/>
                                        <div className='flex flex-col '>
                                          <div className='text-white '>{eve.away_scorer}</div>
                                          <div className=' text-white opacity-70'>
                                            {eve.away_assist && (
                                              eve.away_assist 
                                            )} 
                                            {eve.away_assist && <span>(assist)</span>}
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
                                          <div className=' text-white'>{eve.home_scorer}</div>
                                          <div className=' text-white opacity-70'>
                                              {eve.home_assist && (
                                                eve.home_assist 
                                              )} 
                                              {eve.home_assist && <span>(assist)</span>}
                                            </div>

                                        </div>
                                        <img src={ball} alt="" className='w-[20px] h-[20px]'/>
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
                                        <img src={ball} alt="" className='w-[20px] h-[20px]'/>
                                        <div className='flex flex-col'>
                                          <div className=' text-white'>{eve.away_scorer}</div>
                                          <div className=' text-white opacity-70'>
                                              {eve.away_assist && (
                                                eve.away_assist 
                                              )} 
                                              {eve.away_assist && <span>(assist)</span>}
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
                </div>
          ))
        }
      </div>
      <div className='col-span-1 hidden md:block'>

        {
            hToH &&
            hToH.map(h => (
              <div key={h.event_key}>
                {h.event_home_team}
                {h.event_final_result}
                {h.event_away_team}
                {h.event_date}
                <div>
                  {
                    
                  }
                </div>
              </div>
            ))
          
        }
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
        
        <div className='divide-y divide-black '>
                            <div className=' text-center text-2xl'>Statistics</div>
                            {
                              stats &&
                              stats.map(stat => (
                                stat.map(s => (

                                <div key={s.type}  className='divide-y divide-black'>
                                  
                                    <div className='text-center text-white text-lg my-2   '>{s.type}</div>
                                    <div className='flex items-center justify-center gap-2  w-full py-2'>
                                      <div className='w-[45%] bg-white h-[6px] rounded-l-full overflow-hidden flex justify-end'>
                                      <div className={s.type === 'Ball Possession' ? `w-[${s.home.slice(0,s.home.indexOf('%'))}%]` :`w-[${Math.round(((+s.home * 100)/(+s.home + +s.away)))}%] bg-customBg2 h-[6px]  `}></div>

                                      </div>
                                      <div className='flex  w-[100px] justify-center'>{s.home} - {s.away}</div>
                                      <div className='w-[45%] bg-white h-[6px] overflow-hidden  rounded-r-full '>

                                      <div className={s.type === 'Ball Possession' ? `w-[${s.away}]` :`w-[${Math.round(((+s.away * 100)/(+s.home + +s.away)))}%]  bg-customBg2 h-[6px] `}></div>
                                      </div>
                                    </div>
                                  
                                </div>
                                ))
                              ))
                            }
                          </div>

      </div>
    </div>
  )
}

export default CurrentFixtures