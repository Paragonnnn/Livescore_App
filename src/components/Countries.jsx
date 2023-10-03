import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading';
import Error from './Error';
import { arrowDown, arrowUp } from '../index.js';
import Header from './Header';

const Countries = ({loadingCountries, countries, error, leagues}) => {
    const [search, setSearch] = useState('')
    const [show, setShow] = useState()
    const [check, setCheck] = useState()
    const [activeIndex, setActiveIndex] = useState([])
    
    
    const handleClick = (index) => {
        console.log(activeIndex);
        // setShow((prev) => {
        //     setShow(!prev)
        // } )
        if (activeIndex.includes(index)) {
            // setActiveIndex(activeIndex.filter((i) => i !== index));
            setActiveIndex(activeIndex.filter((i) => (
                i !== index
            )))
          } else {
            setActiveIndex([index]);
          }
    }
    
  return (
    <div className='border border-solid border-lighterOrange text-white p-4'>
        <Header setSearch={setSearch} search={search}/>
        
        {
            error && (
                <Error />
            )
        }
        {
            loadingCountries && (
                <Loading />

            )

        }
        <div className='divide-y divide-lighterOrange'>
            {
                countries.filter((country) => (
                    search.trim().toLowerCase() === '' ? country : country.country_name.toLowerCase().includes(search)
                )).map((country,index) => (
                    <div key={country.country_key} className=''>
                        <div    className='text-white flex items-center justify-between w-full p-1' onClick={() => handleClick(index)}>
                            <div className='country_name_div'>
                                <h2 className='text-white'>{country.country_name}</h2>
                            </div>
                            <img src={country.country_logo} alt="" className='w-4 h-4 rounded-full'/>
                            <img 
                                src={activeIndex.includes(index) ? arrowUp : arrowDown} 
                                alt="" 
                                className='up_down_arrow'
                                
                            />
                        </div>
                        <div className={`${activeIndex.includes(index) ? 'block' : 'hidden'} p-2 divide-y divide-lighterOrange transition`}>
                            {
                                leagues.map((league) => (
                                    (league.country_key == country.country_key) &&
                                    <div key={league.league_key} className='p-1'>
                                        <Link to={`/table/${league.league_key}`}>
                                            {league.league_name}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
                
            }
            

        </div>
    </div>
  )
}

export default Countries