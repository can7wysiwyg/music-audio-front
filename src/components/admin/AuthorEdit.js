import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Row, Col, Pagination, Form } from 'react-bootstrap';
import axios from 'axios';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import "./authoredit.css"

function AuthorEdit() {
  const [results, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get('https://audiobooksapi.onrender.com/author/show_all');
      setAuthors(res.data.authors);
    };
    getAuthors();
  }, []);

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page to 1 when search query changes
  };

  // Filter authors based on search query
  const filteredAuthors = results.filter((author) =>
    author.AuthorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current authors
  const indexOfLastAuthor = currentPage * itemsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - itemsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (results.length === 0) {
    return (
      <>
        <h1 className="text-center">as users load</h1>
      </>
    );
  }

  return (
    <>
    <div  className="container d-flex justify-content-center align-items-center " style={{marginTop: "2rem"}} >
      <div className="col-md-6">
      <Form>
        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Search by author name"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </Form.Group>
      </Form>

      </div>
      </div>
      <br />

      <Row style={{marginTop: "3rem"}}>
        {currentAuthors.map((result) => (
          <Col key={result._id} md={4} className="d-flex align-items-stretch">
            <EditAuthors result={result} />
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center" style={{marginTop: "2rem"}}>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: Math.ceil(filteredAuthors.length / itemsPerPage) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredAuthors.length / itemsPerPage)}
        />
      </Pagination>
    </>
  );
}


const EditAuthors = ({ result }) => {
  const state = useContext(GlobalState);
  const token = state.token;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [content, setBooks] = useState([]);
  const [filterDelete, setFilter] = useState({});

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get('https://audiobooksapi.onrender.com/audio/show_all');
      setBooks(res.data.books);
    };

    getBooks();
  }, []);

  useEffect(() => {
    if (result._id) {
      content.forEach((item) => {
        if (item.authorName === result._id) setFilter(item);
      });
    }
  }, [result._id, content]);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleAction = () => {
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await axios.delete(`https://audiobooksapi.onrender.com/author/delete_author/${result._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.href = '/author_edit';
  };

  function ShowAuthors() {
   
      return (
        <>
          <Card className="author-card d-flex flex-column author-card ">
            <Card.Img
              variant="top"
              src={result.AuthorImage}
              alt="Author Image"
              style={{ width: "100%", height: "30vh",  objectFit: 'contain' }}
              className="card-image"
            />

            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{result.AuthorName}</Card.Title>
                <Card.Link href={`/author_single/${result._id}`}>More Info</Card.Link>
              </div>
              <pre> </pre>
              <div className="btn-group" style={{margin: "1rem"}}>
                <Button variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
                {filterDelete.authorName === result._id ? (
                  <Button variant="secondary" onClick={handleAction}>
                    Choose Action
                  </Button>
                ) : (
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
          <br />

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Choose Action:</p>
              <ul>
                <li>
                  <a href={`/edit_info/${result._id}`}>Edit User Info</a>
                </li>
                <li>
                  <a href={`/update_user_image/${result._id}`}>Update Photo</a>
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>This Author Has Books, So Delete The Books First..</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Choose Action:</p>
              <ul>
                <li>
                  <a href={`/book_delete_all/${result._id}`}>Delete All Books At Once</a>
                </li>
                <li>
                  <a href={`/authors_books/${result._id}`}>Delete Select Books</a>
                </li>
              </ul>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {/* <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button> */}
            </Modal.Footer>
          </Modal>
        </>
      );
     }

  return <>{ShowAuthors()}</>;
};




export default AuthorEdit;
