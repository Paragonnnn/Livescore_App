import React, {useState, useEffect} from 'react'
import Countries from './components/Countries'
import Leagues from './components/Leagues'
import { Link } from 'react-router-dom'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Teams from './components/Teams'
import Table from './components/Table'
import Fixtures from './components/Fixtures'
import Players from './components/Players'
import CurrentFixtures from './components/CurrentFixtures'
import SearchClub from './components/SearchClub'

const App = () => {
  const [countries, setCountries] = useState([])
    const [loadingCountries, setLoadingCountries] = useState(false)
    const [loadingLeagues, setLoadingLeagues] = useState(false)
    const [loadingFixtures, setLoadingFixtures] = useState(false)
    const [error, setError] = useState(false)
    const [fixturesError, setFixturesError] = useState()
    const [leagues, setLeagues] = useState([])
    const [fixtures, setFixtures] = useState([])
    const [check, setCheck] = useState([])
    const [liveCheck, setLiveCheck] = useState([])
    const [currentFixture, setCurrentFixture] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchClub, setSearchClub] = useState('')
    const [clubs, setClubs] = useState([])
    
    
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    console.log(windowWidth);


    const api_key = import.meta.env.VITE_api_key
    let date = new Date
    let month = date.getMonth() + 1
    let currentYear = date.getFullYear()
    let day = date.getDate()
    
    const [calenderDate, setCalenderDate] = useState(`${currentYear}-${month}-${day}`)

    useEffect(() => {
        setLoadingCountries(true)
        async function getData() {
          await fetch(`https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`)
        .then((res) => res.json())
        .then(json => {
          setError(false)
            setCountries(json.result)
            setLoadingCountries(false)
            // console.log(json.result);
        })
        .catch(err => {
          setLoadingCountries(false)
          setError(true)
          console.log(err)
        })
        }
        getData()  
    }, [])

    useEffect(() => {
      setLoadingLeagues(true)
      async function getData() {
          await fetch(`https://apiv2.allsportsapi.com/football/?met=Leagues&countryId=${countries.map((country) => (
            country.country_key
          ))}&APIkey=${api_key}`)
          .then(res => res.json())
          .then(json => {
              setError(false)
              setLoadingLeagues(false)
              setLeagues(json.result)
              // console.log(json.result);
          })
          .catch(err => {
              console.log(err)
              console.log('errors');
              setError(true)
              setLoadingLeagues(false)
          })
      }
      getData()
  },[])


  useEffect(() => {
    async function getData() {
        setLoadingFixtures(true)
        await fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&timezone=Africa/Lagos&leagueId=${leagues.map(league => (
            league.league_key
        ))}&APIkey=${api_key}&from=${calenderDate}&to=${calenderDate}`)
        .then(res => res.json())
        .then(json => {
            setFixtures(json.result)
            console.log(json.result);
            setLoadingFixtures(false)
            setCurrentFixture(json.result.slice(0,1))
            setCheck(
                json.result.map(fixture => (
                    (
                        !check.includes(fixture.league_key) && fixture.league_key 
                    )
                    
                ))
            )
            setLiveCheck(
                json.result.map(fixture => (
                    (
                        !check.includes(fixture.league_key)  && fixture.event_live === '1' && (fixture.league_key)
                    )
                    
                ))
            )
            console.log(json.result);
            console.log(liveCheck);
            console.log(check);
        })
        .catch(err => {
            setLoadingFixtures(false)
            setFixturesError(true)
            console.log(err);
        })
    }
    getData()
  },[calenderDate])

  useEffect(() => {
    async function getData() {
      await fetch(`https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${leagues.map(league => (
        league.league_key
    ))}&APIkey=${api_key}`)
    .then(res => res.json())
    .then(json => {
      setClubs(json.result)
      console.log(json.result);
    })
    }
    getData()
  }, [])

  return (
    <div className='bg-customBg '>
      
      <div className='bg-customBg2  w-full  sticky top-[-2px] rounded-b-xl z-10'>
        <div className='m-auto  max-w-[1440px] flex items-center justify-between'>
          <Link to={'/'}><h3 className='text-[25px] md:text-[40px] px-2 md:px-4 py-2 mb-2 text-customBg font-bold'>Paragon</h3></Link>
          <div className='px-2'>
            <input className='bg-transparent outline-none border border-solid border-black p-2 ' onChange={e => setSearchClub(e.target.value)} value={searchClub} id="" />
            <SearchClub searchClub={searchClub}/>
          </div>
        </div>
      </div>
      <div className=' max-w-[1440px] m-auto  lg:p-4 p-1'>

        <Routes>
          
          <Route path='/' element={<Home countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues} check={check} fixtures={fixtures}  loadingFixtures={loadingFixtures} fixturesError={fixturesError} currentFixture={currentFixture} setCurrentFixture={setCurrentFixture} liveCheck={liveCheck} month={month} currentYear={currentYear} day={day} windowWidth={windowWidth} calenderDate={calenderDate} setCalenderDate={setCalenderDate}/>}/>
          <Route path='/countries' element={<Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>} />
          <Route path='/leagues/:countryname/:id' element={<Leagues />}/>
          <Route path='/table/:leaguename/:id' element={<Table/>} />
          <Route path='/fixture/:league/:teamsname/:id' element={<CurrentFixtures />}/>
          {/* <Route path='/fixtures' element={<Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError}/>}/> */}
          <Route path='/team/:teamname/:id' element={<Teams leagues={leagues}/>}/>
          <Route path='/player/:playername/:id' element={<Players countries={countries} leagues={leagues}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App