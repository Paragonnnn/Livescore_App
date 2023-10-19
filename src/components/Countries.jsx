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
    const [seeAll, setSeeAll] = useState(20)
    
    
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

    const handleSeeAll = () => {
        setSeeAll(countries.lenght)
    }
    
  return (
    <div className=' shadow-sm text-white p-4 bg-customBg2'>
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
        <div className='divide-y divide-black'>
            {
                countries.filter((country) => (
                    search.trim().toLowerCase() === '' ? country : country.country_name.toLowerCase().includes(search)
                )).slice(0,seeAll).map((country,index) => (
                    <div key={country.country_key} className=''>
                        <div    className='text-gray-400 flex items-center justify-between w-full p-1 cursor-pointer' onClick={() => handleClick(index)}>
                            <div className='country_name_div'>
                                <h2 className='text-gray-400'>{country.country_name}</h2>
                            </div>
                            <img src={country.country_logo} alt="" className='w-4 h-4 rounded-full'/>
                            <img 
                                src={activeIndex.includes(index) ? arrowUp : arrowDown} 
                                alt="" 
                                className=' w-7 h-7 cursor-pointer'
                            />
                        </div>
                        <div className={`${activeIndex.includes(index) ? 'block' : 'hidden'} p-2 divide-y divide-black  `}>
                            {
                                leagues.map((league) => (
                                    (league.country_key == country.country_key) &&
                                    <div key={league.league_key} className='p-1'>
                                        <Link to={`/table/${league.league_name.replace(/ +/g,'-')}/${league.league_key}`}>
                                            {league.league_name}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
                
            }

            <div onClick={handleSeeAll} className=' cursor-pointer text-center'>See All</div>
            

        </div>
    </div>
  )
}

export default Countries