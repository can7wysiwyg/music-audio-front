import { Card, Button, Modal } from 'react-bootstrap';
import "./authoredit.css"
import { useState } from 'react';


function AuthorEdit() {

    const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
    
    
    return(<>
    <Card className="author-card">
        <Card.Img variant="top" src="author-image.jpg" alt="Author Image" />
        <Card.Body>
          <Card.Title>Author Name</Card.Title>
          <Card.Text>Bio</Card.Text>
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
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Edit the author's links:</p>
          <ul>
            <li>
              <a href="/">Website</a>
            </li>
            <li>
              <a href="/">Social Media</a>
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

export default AuthorEdit