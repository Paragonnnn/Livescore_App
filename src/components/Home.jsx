import React from 'react'
import { Link } from 'react-router-dom'
import Countries from './Countries'
import Fixtures from './Fixtures'
import CurrentFixtures from './CurrentFixtures'

const Home = ({ countries, loadingCountries, error, leagues, check, fixtures, loadingFixtures, fixturesError, currentFixture, setCurrentFixture, liveCheck, month, day, currentYear, windowWidth}) => {
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
        <Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>
      </div>
      <div className='col-span-5'>
        <Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError} currentFixture={currentFixture} setCurrentFixture={setCurrentFixture} liveCheck={liveCheck} windowWidth={windowWidth}/>
      </div>
      
      <div className='hidden lg:block col-span-3 sticky top-[80px] text-white bg-customBg2 p-4 h-[50vh]'>
      
            {
              currentFixture.map(fixture => (
                <div key={fixture.event_key} className=''>
                  <h1>{fixture.country_name}</h1>
                  {fixture.event_home_team} vs {fixture.event_away_team}
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