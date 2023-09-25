import React, {useState, useEffect} from 'react'
import Countries from './components/Countries'
import Leagues from './components/Leagues'
import { Link } from 'react-router-dom'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Teams from './components/Teams'
import Table from './components/Table'

const App = () => {
  const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [leagues, setLeagues] = useState([])

    const api_key = import.meta.env.VITE_api_key
    useEffect(() => {
        setLoading(true)
        async function getData() {
          await fetch(`https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`)
        .then((res) => res.json())
        .then(json => {
          setError(false)
            setCountries(json.result)
            setLoading(false)
            console.log(json.result);
        })
        .catch(err => {
          setLoading(false)
          setError(true)
          console.log(err)
        })
        }
        getData()  
    }, [])

    useEffect(() => {
      setLoading(true)
      async function getData() {
          await fetch(`https://apiv2.allsportsapi.com/football/?met=Leagues&countryId=${countries.map((country) => (
            country.country_key
          ))}&APIkey=${api_key}`)
          .then(res => res.json())
          .then(json => {
              setError(false)
              setLoading(false)
              setLeagues(json.result)
              console.log(json.result);
          })
          .catch(err => {
              console.log(err)
              console.log('errors');
              setError(true)
              setLoading(false)
          })
      }
      getData()
  },[])

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/countries' element={<Countries countries={countries} loading={loading} error={error} leagues={leagues}/>} />
        <Route path='/leagues/:id' element={<Leagues />}/>
        <Route path='/table/:id' element={<Table/>} />
      </Routes>
      
    </div>
  )
}

export default App