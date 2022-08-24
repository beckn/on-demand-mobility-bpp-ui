import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CallLogIcon } from '../../shared/icons/CallLog';
import { CarLogIcon } from '../../shared/icons/Carlog';
import { LocationIcon } from '../../shared/icons/Location';
import './NavigateButton.css'

function NavigateButton() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2">
        Navigate
      </Button>
      <Modal
        className='popup'
        size="sm"
        show={smShow}
        
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
           Going for Pickup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='container'>
        <CarLogIcon className='carLog' />
        <CallLogIcon className='callLog'/>
          <h6>Reach pick  up location in 5 mins</h6>
          <LocationIcon />
        </Modal.Body>
      </Modal>   
    </>
  );
}

export default NavigateButton