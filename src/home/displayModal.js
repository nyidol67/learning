import React from 'react';
import {Modal, Button} from 'react-bootstrap';
function DisplayModal({ user,isOpen,setIsOpen}) {
    
    function closeModal(){
        setIsOpen(false);
    }
    return (
        <>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>My Info.</Modal.Title>
                </Modal.Header>
                <Modal.Body> Name: {user[0].name}<br/>Address: {user[0].address}<br/>Mobile: {user[0].mobile}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default DisplayModal;