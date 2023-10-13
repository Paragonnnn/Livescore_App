import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Countries from './Countries'
import Fixtures from './Fixtures'
import CurrentFixtures from './CurrentFixtures'

const Home = ({ countries, loadingCountries, error, leagues, check, fixtures, loadingFixtures, fixturesError, currentFixture, setCurrentFixture, liveCheck, month, day, currentYear, windowWidth, calenderDate, setCalenderDate}) => {


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
      <input type="date" name="" id="" onChange={e=> {
        setCalenderDate(e.target.value)
        console.log(calenderDate);
      }}/>
        <Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>
      </div>
      <div className='col-span-5'>
        <Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError} currentFixture={currentFixture} setCurrentFixture={setCurrentFixture} liveCheck={liveCheck} windowWidth={windowWidth}/>
      </div>
      
      <div className='hidden lg:block col-span-3 sticky top-[80px] text-black bg-customBg2 p-4 h-[50vh]'>
      
            {
              currentFixture.map(fixture => (
                <div key={fixture.event_key} className=''>
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
                  <div className='flex justify-center'>
                    <Link to={`/fixture/${fixture.event_home_team.replace(/ /g,'-')}-${fixture.event_away_team.replace(/ /g,'-')}/${fixture.event_key}`} className='px-4 bg-customBg py-1 text-lg rounded hover:opacity-80 mt-3'>show more</Link>

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