import React, { useState } from 'react';
import { Card, Button, Modal, Pagination, Row, Col } from 'react-bootstrap';

function BookEdit() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const books = [
    {
      id: 1,
      title: 'Book 1',
      author: 'John Doe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'book1.jpg',
      audioUrl: 'audio1.mp3',
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Jane Smith',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'book2.jpg',
      audioUrl: 'audio2.mp3',
    },
    // Add more books as needed
  ];

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="book-list">
      <Row>
        {currentBooks.map((book) => (
          <Col key={book.id} md={4}>
            <Card className="book-card">
              <Card.Img variant="top" src={book.image} alt="Book Cover" />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text>{book.description}</Card.Text>
                <audio controls>
                  <source src={book.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="btn-group">
                  <Button variant="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="mt-3">
        {Array.from(Array(Math.ceil(books.length / booksPerPage)), (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

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
    </div>
  );
}

export default BookEdit;
