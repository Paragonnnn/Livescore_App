import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Livescore</h1>
      <Link to={`/countries`}>
        <button>show</button>

      </Link>
    </div>
  )
}

export default Home