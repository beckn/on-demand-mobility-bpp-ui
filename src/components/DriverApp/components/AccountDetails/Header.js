import React , { useContext , useState , useEffect } from 'react'
import {Link, Routes, Route, useNavigate} from "react-router-dom";
import {Navbar,Container, Nav, FormControl} from "react-bootstrap"
import './Registration_css.css';

export default function Header() {
   const navigate = useNavigate();

   return (     
      <div className='top-bar'>
         <span className='icon_back'>
            <button className='back-button' onClick={() => navigate(-1)}><span>&#60;</span> Back</button>
         </span>
         <span class="header-push text-white">
            Account
         </span>
      </div>
   )
}