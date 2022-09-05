import React from 'react'
import { MapPin } from 'react-feather'
import { LocationIcon } from '../../../../shared/icons/Location'
import CustomMap from '../../Maps/CustomMap'
import './RideEnd.css';

function RideEnd() {
  return (
    <div>
    <h1 className='titleP'>Ride Ended</h1>
    <p className='subP'>Please collect the amount form the customer. </p>
    <h2 className='Rp'>₹ 200</h2>
    <hr className='hrp'/>
    <h6 className='date'>Wednesday, 26/05 16:45</h6>
    <h6 className='dist'>45kms</h6>
    <h6 className='tm'>30 min</h6>
    <div className='locationI'>
    <LocationIcon />
   <p className='LP'>
    Raja Dinkar kelkar Museum
   </p> 
    <div className="MaP">
        <MapPin color="#D22323" />
      <p className='Mpin'>Shaniwar wada</p>  
      </div>
      </div>
      <CustomMap />
      <button className="End fixed-bottom">
        End Ride
    </button>
    </div>
    

  )
}

export default RideEnd