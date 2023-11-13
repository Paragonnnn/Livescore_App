import React from 'react'

const Header = ({setSearch, search,toggleMode}) => {
  return (
    <div className='mb-1'>
        <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search Country...'
            className={`bg-transparent outline-none border border-solid border-black p-2 w-full ${toggleMode ? 'text-darkText' : 'text-lightText'} `}
        />
    </div>
  )
}

export default Header