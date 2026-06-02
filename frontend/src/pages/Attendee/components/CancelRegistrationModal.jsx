import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CancelRegistrationModal = ({ show, onHide, onConfirm, isCancelling }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to cancel your registration for this event? This action cannot be undone. 
        If there is a waitlist, your spot will be given to the next person in line.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isCancelling}>
          Keep Registration
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isCancelling}>
          {isCancelling ? 'Cancelling...' : 'Yes, Cancel Registration'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelRegistrationModal;
