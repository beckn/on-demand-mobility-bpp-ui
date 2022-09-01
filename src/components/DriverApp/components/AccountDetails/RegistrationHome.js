import React, {useState,setState} from 'react';
import { Link } from "react-router-dom";
import './Registration_css.css';
import Upload from "./upload.png";
import Header from './Header';
import DriverAppHeader from '../Header/Header';
import DriverAppFooter from '../NavFooter/NavFooter';
import { AppRoutes, LocalKey } from "../../../../core/constant";

export default function Registration() {
   const [name, setName] = useState('');
   const [mobileno, setMobileNo] = useState('');
   const [email, setEmail] = useState('');
   const [sex, setSex] = useState('');
   const [age, setAge] = useState('');
   

   function SubmitButton(){
      if (name && mobileno && email && sex && age ){
        return <button type="button" className='btn btn-secondary coloract'>
         <Link to={AppRoutes.registrationSubmit} style={{textDecoration:'none',color:'white',textAlign:"left"}}>
            <span className='cart'>Next</span>
         </Link>
      </button>
      } else {
        return <button type="button" className=' btn btn-secondary' disabled>Next</button>
      };
    };

   return (
   <div>
      <Header/>
      <div class="Registration-body">
        
        <div className='top-padding'>
            <span className='bold-text'>
               Name :
            </span>
               <span class="top-padding4 ">
               <input placeholder="Enter your Name" value={name} onChange={ e => setName(e.target.value)} type="text" className='top-padding4'/>
               </span>              
         </div>

         <div className='top-padding'>
            <span className='bold-text'>
               Email ID :
            </span>
               <span class="top-padding4 align-left">
               <input placeholder="Enter Your Email ID" type="text" value={email} onChange={ e => setEmail(e.target.value)} className='top-padding4'/>
               </span>              
         </div>

         <div className='top-padding'>
            <span className='bold-text'>
               Mobile Number :
            </span>
               <span class="top-padding4 align-left">
               <input placeholder="Enter Your Mobile Number" type="text" value={mobileno} onChange={ e => setMobileNo(e.target.value)} className='top-padding4'/>
               </span>              
         </div>

         <div className='top-padding'>
            <span className='bold-text'>
               Sex :
            </span>
               <span class="top-padding4 align-left">
               <input placeholder="Enter Your Sex" type="text" value={sex} onChange={ e => setSex(e.target.value)} className='top-padding4'/>
               </span>              
         </div>

         <div className='top-padding'>
            <span className='bold-text'>
               Age :
            </span>
               <span class="top-padding4 align-left">
               <input placeholder="Enter Your Age" type="text" value={age} onChange={ e => setAge(e.target.value)} className='top-padding4'/>
               </span>              
         </div>

        <div className='top-padding2'>
         <SubmitButton/>
        </div>
      </div>
      <DriverAppFooter/>
   </div>
    
   )
}