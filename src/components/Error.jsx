import React from 'react'
import { caution } from '..'

const Error = () => {
  return (
    <div className='error_div'>
        <img src={caution} alt="" className='caution'/> Error fetching data
    </div>
  )
}

export default Error