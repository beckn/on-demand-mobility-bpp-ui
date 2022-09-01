import React , { useContext , useState , useEffect } from 'react';
import './Registration_css.css';
import Upload from './upload.png';
import Header from './Header';
import DriverAppFooter from '../NavFooter/NavFooter';
import Modal from 'react-bootstrap/Modal';
import Success from './success.png';

export default function Registration() {
   const [showModal, setShowModal] = useState(false);
   const [panno, setPanNo] = useState('');
   const [drivinglicense, setDrivingLicense] = useState('');
   const [aadharno, setAadhaarNo] = useState('');

   function SubmitButton(){
      if ( panno && drivinglicense && aadharno){
        return <button onClick={() => setShowModal(true)} type="button" className='btn btn-secondary coloract' >
           <span className='cart'>Submit</span>
         </button>
      } else {
        return <button type="button" className=' btn btn-secondary' disabled>Submit</button>
      };
    };
   return (
   <>
      <Header/>
      <div class="Registration-body">
        
         <div className='top-padding'>
            <span className='bold-text'>
               Aadhaar Card:
            </span>
               <span class="upload-btn-wrapper top-padding4">
                  <button class="uploadbtn">
                     <img src={Upload} className="AccountIcon"/>
                  </button>
                  <input type="file" name="myfile" />
               </span>
               <input placeholder="Enter your Aadhaar Card No." type="text" className='align-left top-padding4' value={aadharno} onChange={ e => setAadhaarNo(e.target.value)} />
         </div>
         
         <div className='top-padding'>
            <span className='bold-text'>
               PAN Number:
            </span>
               <span class="upload-btn-wrapper top-padding4">
                  <button class="uploadbtn">
                     <img src={Upload} className="AccountIcon"/>
                  </button>
                  <input type="file" name="myfile" />
               </span>
               <input placeholder="Enter your PAN Number" type="text" className='align-left bold-text top-padding4' value={panno} onChange={ e => setPanNo(e.target.value)} />
         </div>

         <div className='top-padding'>
            <span className='bold-text'>
               Driving License:
            </span>
               <span class="upload-btn-wrapper top-padding4">
                  <button class="uploadbtn">
                     <img src={Upload} className="AccountIcon"/>
                  </button>
                  <input type="file" name="myfile" />
               </span>
               <input placeholder="Enter your Driving License Number" type="text" className='align-left bold-text top-padding4' value={drivinglicense} onChange={ e => setDrivingLicense(e.target.value)}/>
         </div>

        
        <div className='top-padding2'>
         <SubmitButton/>
        </div>

        <Modal
            className='popup1'
            size="sm"
            show={showModal}  
            onHide={() => setShowModal(false)}
         >

             <div >
               <button class="close" onClick={() => setShowModal(false)}>
                  ×
               </button>
            </div>
            
            <Modal.Body className='modal-dialog'>
               <div>
                  <img src={Success} className='success'/>
               </div>
               <br/>
               <span className='bold-text'>
                  Registration successfull!
               </span>
            </Modal.Body>
         </Modal>   
      </div>
      <DriverAppFooter/>
   </>
    
   )
}