import React from 'react'
import { Link } from 'react-router-dom'
import Countries from './Countries'
import Fixtures from './Fixtures'

const Home = ({ countries, loadingCountries, error, leagues, check, fixtures, loadingFixtures, fixturesError}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {/* <h1>Livescore</h1>
      <Link to={`/countries`}>
        <button>show</button>

      </Link>
      <Link to={`/fixtures`}>
        <button>fixtures</button>
      </Link> */}
      <div className='hidden md:block'>
        <Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>
      </div>
      <div>
        <Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError}/>
      </div>
      <div className='hidden md:block'>
        {
          fixtures.slice(0,1).map(fixture => (
            <div key={fixture.event_key}>
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