import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Countries from './Countries'
import Fixtures from './Fixtures'
import { ball,ogball } from '..'
import CurrentFixtures from './CurrentFixtures'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { teamLogo } from '..'


const Home = ({ countries, loadingCountries, error, leagues, check, fixtures, loadingFixtures, fixturesError, currentFixture, setCurrentFixture, liveCheck, windowWidth, calenderDate, setCalenderDate, handleDateChange,handleDateFocus,maxDate}) => {

  const [picker, setPicker] = useState(null)

  return (
    <div className='grid grid-cols-1 lg:grid-cols-11 h-[100%] gap-4'>
        {/* <h1>Livescore</h1>
      <Link to={`/countries`}>
        <button>show</button>

      </Link>
      <Link to={`/fixtures`}>
        <button>fixtures</button>
      </Link> */}
      
      <div className='hidden lg:block col-span-3'>
        <div className=' bg-customBg2 shadow-sm rounded-t'>
          <Calendar value={calenderDate} onChange={handleDateChange} className={` text-[#aaa95a] mb-2 bg-transparent border-none  bg-opacity-50 w-full`} minDetail='year' maxDetail='month'/>
          <div onClick={() => setCalenderDate(new Date().toISOString().split('T')[0])} className='  px-3 py-2 rounded-full text-customBg  w-fit mb-4 cursor-pointer hover:opacity-80 active:opacity-60'>Today</div>

        </div>
        {/* <DatePicker selected={calenderDate} onChange={date => setCalenderDate(date)} onKeyDown={handleDateFocus} /> */}
      {/* <input type="date" name="" pattern='' onKeyDown={handleDateFocus} onChange={handleDateChange} max={maxDate} value={calenderDate} className=' w-full outline-none bg-customBg2 mb-4 text-customBg p-2'/> */}
      <div className=' bg-customBg2 p-2 '>
        <div>Top Leagues</div>
        <div className=''>
            {
              leagues && (
                leagues.slice(6,16).map(top => (
                  <Link to={`/table/${top.league_name.replace(/ +/g,'-')}/${top.league_key}`} key={top.league_key} className=' p-2 text-gray-400'>
                    <div>
                      {top.league_name}
                    </div>

                  </Link>
                ))
              )
            }

        </div>

      </div>
        <Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>
      </div>
      <div className='col-span-5'>
        <Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError} currentFixture={currentFixture} setCurrentFixture={setCurrentFixture} liveCheck={liveCheck} windowWidth={windowWidth}/>
      </div>
      
      <div className='hidden lg:block col-span-3 sticky top-[90px] text-black bg-customBg2 p-4 h-fit'>
      
            {
              currentFixture.map(fixture => (
                <div key={fixture.event_key} className=''>
                  <div>{fixture.event_date}</div>
                  <div className=' w-full bg-customBg p-2 grid grid-cols-5 items-center rounded'>
                    <div className='text-center col-span-2 justify-self-start flex flex-col gap-1 justify-center items-center'>
                      <img src={fixture.home_team_logo} alt="" className='w-[50px]'/>
                      <div className='text-xxs'>
                        {fixture.event_home_team}
                      </div>
                    </div> 
                    <div className={`${fixture.event_live === '1' ? 'text-lightOrange   ' : 'text-black '} text-center col-span-1 `}>
                      <div className=' lg:text-base xl:text-2xl'>{fixture.event_final_result}</div>
                      <div className='text-base'>{fixture.event_status === 'Finished' ? 'FT' : fixture.event_status === 'Half Time' ? 'HT' : fixture.event_status}</div>
                    </div>
                    <div className='text-center col-span-2 justify-self-end flex flex-col gap-1 justify-center items-center'>
                      <img src={fixture.away_team_logo} alt="" className='w-[50px]'/>
                      <div className='text-xxs'>
                        {fixture.event_away_team}
                      </div>
                    </div> 
                  </div>
                  <div className='flex justify-between text-gray-300 lg:text-xxs xl:text-xs opacity-80 mt-2'>

                    <div>
                      {fixture && 
                        fixture.goalscorers.map((scorer,index) => (
                          (scorer.home_scorer &&
                            
                              <div key={index}>

                                <div className='flex items-center py-1 gap-1 '>
                                  <div className=' relative'>
                                  <div className=' text-xxs opacity-70 absolute top-[-5px] right-0'>{scorer.info === 'Penalty' || scorer.home_scorer.includes('PG') ? 'p' : ''}</div>

                                  <img src={scorer.home_scorer.includes('OG') || scorer.home_scorer.includes('o.g.') ? ogball : ball} className='lg:h-3 lg:w-3 xl:h-4 xl:w-4' alt="" />
                                  </div>
                                  {scorer.home_scorer}
                                  <div className=' text-black'>({scorer.time}')</div>
                                </div>
                                
                              </div>
                            )
                        ))
                      }
                    </div>
                    <div>
                      {fixture && 
                        fixture.goalscorers.map((scorer,index) => (
                          (
                            scorer.away_scorer &&
                            <div key={index}>

                              <div className='flex items-center justify-end py-1 gap-1'>
                                <div className=' text-black'>({scorer.time}')</div>
                                {scorer.away_scorer}
                                <div className=' relative'>
                                <img src={scorer.away_scorer.includes('OG') || scorer.away_scorer.includes('o.g.') ? ogball : ball} className='lg:h-3 lg:w-3 xl:h-4 xl:w-4' alt="" />
                                <div className=' text-xxs absolute top-[-5px] right-[0px]'>{scorer.info === 'Penalty' || scorer.away_scorer.includes('PG') ? 'p' : ''}</div>

                                </div>

                              </div>
                            </div>
                          )
                        ))
                      }
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <Link to={`/fixture/${fixture.league_name.replace(/ +/g,'-')}/${fixture.event_home_team.replace(/ +/g,'-')}-${fixture.event_away_team.replace(/ +/g,'-')}/${fixture.event_key}`} className='px-4 bg-customBg py-1 text-lg rounded hover:opacity-80 mt-3'>show more</Link>

                  </div>
                  <div>

                  </div>
                </div>
              ))
            }
      </div>
      

      {/* {
        // <CurrentFixtures month={month} currentYear={currentYear} day={day} leagues={leagues} />

      } */}
    </div>
  )
}

export default Home