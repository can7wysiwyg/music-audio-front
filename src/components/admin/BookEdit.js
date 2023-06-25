import React, { useState } from 'react';

import "./bookedit.css"
import { Card, Button, Modal } from 'react-bootstrap';


function BookEdit() {

  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };




    return(<>
    <Card className="book-card">
        <Card.Img variant="top" src="book-cover.jpg" alt="Book Cover" />
        <Card.Body>
          <Card.Title>Book Title</Card.Title>
          <Card.Text>Author Name</Card.Text>
          <div className="btn-group">
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger">Delete</Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Edit the book's links:</p>
          <ul>
            <li>
              <a href="/">Website</a>
            </li>
            <li>
              <a href="/">Purchase</a>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    
    
    
    </>)
}

export default BookEdit