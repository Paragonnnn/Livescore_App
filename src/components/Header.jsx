import React from 'react'

const Header = ({setSearch, search}) => {
  return (
    <div>
        <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default Header