import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { searchLogo } from '..'

const SearchClub = ({setSearchClub, windowWidth, showSearch, handleSearchChange, searchClub, clubs, setShowSearch}) => {
  const [toggleSearch, setToggleSearch] = useState(false)
  const [focus,setFocus] = useState(false)

  const handleSearchToggleClick = () => {
    setToggleSearch(prev => !prev)
    if (!toggleSearch) {
      setSearchClub('')
    }
  }
 
  return (
    <div className=' '>
        <img src={searchLogo} alt="" className=' h-6 w-6 block lg:hidden' onClick={handleSearchToggleClick}/>
        <input onFocus={() => setFocus(true)}  className={` bg-transparent outline-none hidden lg:block border border-solid border-black p-2 `} onChange={handleSearchChange} value={searchClub} id="" />

        <div className='absolute'>
          <div className={`${toggleSearch ? 'block' : 'hidden'}`}>
            <input onFocus={() => setFocus(true)} className={` bg-transparent outline-none block lg:hidden border border-solid border-black p-2 `} onChange={handleSearchChange} value={searchClub} id="" />

          </div>
          <div className={`${focus ? 'block' : 'hidden'} ${!toggleSearch && windowWidth < 1024 ? 'hidden' : ''}  overflow-y-scroll scroll_bar h-[100vh] lg:h-[80vh] absolute bg-customBg3 shadow-sm   left-[0] mt-4  lg:min-w-[350px] p-2 divide-y divide-black`}>
            {
              clubs && 
              clubs.filter(club => (
                club.country_iso2 && club
              )).filter(club => (
                searchClub?.trim().toLowerCase() === '' ? club : club.country_name.toLowerCase().includes(searchClub)
              )).map(club => (
                <div key={club.country_key} className='flex gap-4 items-center p-2' onClick={() => setFocus(false)}>
                  <img src={club.country_logo} alt="" className=' w-8 h-8 rounded-full'/>
                  <Link className=' text-base text-white' to={`/leagues/${club.country_name}/${club.country_key}`}>{club.country_name}</Link>
                </div>
              ))
            }
            {
              clubs && 
              clubs.filter(club => (
                club.league_name && club
              )).filter(club => (
                searchClub?.trim().toLowerCase() === '' ? club : club.league_name.toLowerCase().includes(searchClub) || club.country_name.toLowerCase().includes(searchClub)
              )).slice(6,16).map((club,index) => (
                <div key={club.league_key} className=' p-2' onClick={() => setFocus(false)}>
                  <Link className='flex gap-4 items-center text-xs text-white' to={`/table/${club.league_name}/${club.league_key}`}>
                  <img src={club.league_logo} alt="" className=' w-8 '/>
                    <div className='flex flex-col'>
                      <div>{club.league_name}</div>
                      <div className='flex items-center gap-1 text-gray-400'><img src={club.country_logo} className=' w-2 h-2 rounded-full' alt="" />{club.country_name}</div>
                    </div>
                  </Link>
                  
                </div>
              ))
            }
          </div>

        </div>
    </div>
  )
}

export default SearchClub