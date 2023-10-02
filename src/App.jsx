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
    const [currentFixture, setCurrentFixture] = useState([])


    const api_key = import.meta.env.VITE_api_key
    let date = new Date
    let month = date.getMonth() + 1
    let currentYear = date.getFullYear()
    let day = date.getDate()

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
        ))}&APIkey=${api_key}&from=${currentYear}-${month}-${day}&to=${currentYear}-${month}-${day}`)
        .then(res => res.json())
        .then(json => {
            setFixtures(json.result)
            setLoadingFixtures(false)
            setCheck(
                json.result.map(fixture => (
                    (
                        !check.includes(fixture.league_key) && fixture.league_key 
                    )
                    
                ))
            )
            console.log(json.result);
        })
        .catch(err => {
            setLoadingFixtures(false)
            setFixturesError(true)
            console.log(err);
        })
    }
    getData()
  },[])

  return (
    <div className='max-w-[1440px] m-auto  bg-customBg p-4'>
      
      <div>
        <h1>Paragon</h1>
      </div>
      <Routes>
        
        <Route path='/' element={<Home countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues} check={check} fixtures={fixtures}  loadingFixtures={loadingFixtures} fixturesError={fixturesError} currentFixture={currentFixture} setCurrentFixture={setCurrentFixture}/>}/>
        <Route path='/countries' element={<Countries countries={countries} loadingCountries={loadingCountries} error={error} leagues={leagues}/>} />
        <Route path='/leagues/:id' element={<Leagues />}/>
        <Route path='/table/:id' element={<Table/>} />
        {/* <Route path='/fixtures' element={<Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError}/>}/> */}
        <Route path='/teams/:id' element={<Teams leagues={leagues}/>}/>
        <Route path='/players/:id' element={<Players countries={countries} leagues={leagues}/>}/>
      </Routes>
      
    </div>
  )
}

export default App