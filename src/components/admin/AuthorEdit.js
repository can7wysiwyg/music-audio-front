import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Row, Col, Pagination, Form } from 'react-bootstrap';
import axios from 'axios';

function AuthorEdit() {
  const [results, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get('/author/show_all');
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
    <div  className="container d-flex justify-content-center align-items-center " >
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

      <Row>
        {currentAuthors.map((result) => (
          <Col key={result._id} md={4} className="d-flex align-items-stretch">
            <EditAuthors result={result} />
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center">
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
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  function ShowAuthors() {
    let imagePath = result.AuthorImage.authorImageLink.replace(/\\/g, '/'); // Convert backslashes to forward slashes

    if (imagePath.startsWith('uploads/')) {
      let imageUrl = `http://localhost:5000/${imagePath}`;

      return (
        <>
          <Card className="author-card d-flex flex-column">
            <Card.Img
              variant="top"
              src={imageUrl}
              alt="Author Image"
              style={{ width: '100%', height: '200px', borderRadius: '10px', objectFit: 'cover' }}
              className="card-image"
            />

            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{result.AuthorName}</Card.Title>
                <Card.Link href={`/author_single/${result._id}`}>More Info</Card.Link>
              </div>
              <div className="btn-group">
                <Button variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </div>
            </Card.Body>
          </Card>
          <br />

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
        </>
      );
    } else {
      let imageUrl = `http://localhost:5000${imagePath}`;

      return (
        <>
          <Card className="author-card d-flex align-items-center justify-content-center">
            <Card.Img variant="top" src={imageUrl} alt="Author Image" />
            <Card.Body>
              <Card.Title>{result.AuthorName}</Card.Title>
              <Card.Link href={`/author_single/${result._id}`}>More Info</Card.Link>
              <div className="btn-group">
                <Button variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </div>
            </Card.Body>
          </Card>
          <br />

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
        </>
      );
    }
  }

  return <>{ShowAuthors()}</>;
};

export default AuthorEdit;
