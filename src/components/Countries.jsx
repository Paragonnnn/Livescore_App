import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading';
import Error from './Error';
import { arrowDown, arrowUp } from '../index.js';
import Header from './Header';

const Countries = ({loading, countries, error, leagues}) => {
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
    <div>
        <Header setSearch={setSearch} search={search}/>
        
        {
            error && (
                <Error />
            )
        }
        {
            loading && (
                <Loading />

            )

        }
        <div className='country_div'>
            {
                countries.filter((country) => (
                    search.trim().toLowerCase() === '' ? country : country.country_name.toLowerCase().includes(search)
                )).map((country,index) => (
                    <div key={country.country_key} >
                        <div    className='country' onClick={() => handleClick(index)}>
                            <div className='country_name_div'>
                                <h2 className='country_name'>{country.country_name}</h2>
                            </div>
                            <img src={country.country_logo} alt="" className='country_logo'/>
                            <img 
                                src={activeIndex.includes(index) ? arrowUp : arrowDown} 
                                alt="" 
                                className='up_down_arrow'
                                
                            />
                        </div>
                        <div className={activeIndex.includes(index) ? 'show' : 'hidden'}>
                            {
                                leagues.map((league) => (
                                    (league.country_key == country.country_key) &&
                                    <div key={league.league_key}>
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