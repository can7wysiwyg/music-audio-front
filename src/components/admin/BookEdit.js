import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { GlobalState } from '../../GlobalState';
import { Card, Button, Modal, Pagination, Row, Col, Container } from 'react-bootstrap';

function BookEdit() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [booksPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getItems = async () => {
      const res = await axios.get('https://audiobooksapi.onrender.com/audio/show_all');
      setItems(res.data.books);
    };
    getItems();
  }, []);

  if (items.length === 0) {
    return (
      <div style={{marginTop: "2rem"}}>
        <h1 className="text-center">please wait....</h1>
      </div>
    );
  }

  const filteredBooks = items.filter((book) => book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="book-list">
      <Container style={{marginTop: "2rem"}}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <input
              type="text"
              placeholder="Search by book title"
              className="form-control"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Container>
      <br />
      <Row>
        {currentBooks.map((book) => (
          <Col key={book._id} md={4}>
            <BooksToEdit book={book} />
          </Col>
        ))}
      </Row>

      <Pagination className="mt-3">
        {Array.from(Array(Math.ceil(filteredBooks.length / booksPerPage)), (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

const BooksToEdit = ({ book }) => {
  const state = useContext(GlobalState);
  const token = state.token;
  const [results, setAuthors] = useState([]);
  const [newAuthor, setNew] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get('https://audiobooksapi.onrender.com/author/show_all');
      setAuthors(res.data.authors);
    };
    getAuthors();
  }, []);

  useEffect(() => {
    if (book.authorName) {
      results.forEach((result) => {
        if (result._id === book.authorName) setNew(result);
      });
    }
  }, [book.authorName, results]);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    await axios.delete(`https://audiobooksapi.onrender.com/audio/delete_audio_book/${book._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.href = '/book_edit';
  };

  return (
    <div style={{marginBottom: "3rem", textAlign: "center"}}>
      <Card className="book-item" style={{ height: '100%',  }}>
        <div style={{margin: "1rem"}}>
          <Card.Img
            variant="top"
            src={book.audioImage}
            alt="Book Cover"
            style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }}
          />
        </div>
        <Card.Body>
          <Card.Link href={`/book_single/${book._id}`} style={{ textDecoration: 'none' }}>
            {book.bookTitle}
          </Card.Link>
          <Card.Text>{newAuthor.AuthorName}</Card.Text>
          
          <audio controls>
            <source src={book.audioBook} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="btn-group" >
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Edit the book's info:</p>
          <ul>
            <li>
              <a href={`/book_update_info/${book._id}`}>update book info</a>
            </li>
            <li>
              <a href={`/book_update_audio/${book._id}`}>update book audio</a>
            </li>
            <li>
              <a href={`/book_update_picture/${book._id}`}>update book picture</a>
            </li>
            <li>
              <a href={`/book_update_sell_link/${book._id}`}>update book link</a>
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
};

export default BookEdit;
