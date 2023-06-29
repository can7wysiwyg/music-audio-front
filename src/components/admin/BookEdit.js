import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Button, Modal, Pagination, Row, Col } from 'react-bootstrap';

function BookEdit() {
 
  const [currentPage, setCurrentPage] = useState(1);
  const[items, setItems] = useState([])
  const [booksPerPage] = useState(5);



  useEffect(() => {

    const getItems = async() => {

      const res = await axios.get("/audio/show_all")

      setItems(res.data.books)

    }

    getItems()


  }, [])




  
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = items.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="book-list">
      <Row>
        {currentBooks.map((book) => (
          <Col key={book.id} md={4}>
               <BooksToEdit book={book} />

                      </Col>
        ))}
      </Row>

      <Pagination className="mt-3">
        {Array.from(Array(Math.ceil(items.length / booksPerPage)), (_, index) => (
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

const BooksToEdit = ({book}) => {

  // console.log(book);

  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);


  };


  function showItems() {

    let audioPath = book.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    let imagePath = book.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    console.log(imagePath);

      
    if (audioPath.startsWith("uploads/")) {
      let audioUrl = `http://localhost:5000/${audioPath}`;
      let imageUrl = `http://localhost:5000/${imagePath}`;

      

      return(<>

<Card className="book-card">
              <Card.Img variant="top" src={imageUrl} alt="Book Cover" />
              <Card.Body>
                <Card.Title>{book.bookTitle}</Card.Title>
                <Card.Text>{book.authorName}</Card.Text>
                <Card.Text>{book.bookDescription}</Card.Text>
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
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




    } else{
      let audioUrl = `http://localhost:5000/${audioPath}`;
      let imageUrl = `http://localhost:5000/${imagePath}`;

      

      
    return(<>


<Card className="book-card">
              <Card.Img variant="top" src={imageUrl} alt="Book Cover" />
              <Card.Body>
                <Card.Title>{book.bookTitle}</Card.Title>
                <Card.Text>{book.authorName}</Card.Text>
                <Card.Text>{book.bookDescription}</Card.Text>
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
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




  }



 

  return(<>

{
  showItems()
}
  
  </>)
}

export default BookEdit;
