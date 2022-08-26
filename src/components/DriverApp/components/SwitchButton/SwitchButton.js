/* eslint-disable no-undef */
import React from 'react'
import './SwitchButton.css'

const SwitchButton =() => {
  return (
    <div>
      <div>
    <h2 className='title'>Bharat Ganapathy</h2>
    <h3 className='text'>Driver - Beckn One</h3>
    </div>

     <label className='switch'>
      <input type='checkbox' />
      <span className='slider round' />
      <h3 className='textav'>Available</h3>
     </label>
     </div>
  )
}

export default SwitchButton