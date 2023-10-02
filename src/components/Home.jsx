import React from 'react'
import { Link } from 'react-router-dom'
import Countries from './Countries'
import Fixtures from './Fixtures'

const Home = ({ countries, loadingCountries, error, leagues, check, fixtures, loadingFixtures, fixturesError, currentFixture, setCurrentFixture}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-11 h-[100%]'>
        {/* <h1>Livescore</h1>
      <Link to={`/countries`}>
        <button>show</button>

      </Link>
      <Link to={`/fixtures`}>
        <button>fixtures</button>
      </Link> */}
      <div className='hidden md:block col-span-3'>
        <Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>
      </div>
      <div className='col-span-5'>
        <Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError} currentFixture={currentFixture} setCurrentFixture={setCurrentFixture}/>
      </div>
      <div className='hidden md:block col-span-3  text-white'>
        {

          currentFixture.map(fixture => (
            <div key={fixture.event_key} className='sticky top-0'>
              <h1>{fixture.country_name}</h1>
              {fixture.event_home_team} vs {fixture.event_away_team}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home