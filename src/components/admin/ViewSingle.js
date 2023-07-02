import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect,  } from 'react';
import { GlobalState } from '../../GlobalState';
import { useState } from 'react';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';



function ViewSingle() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const[author, setAuthor] = useState({})
    const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [content, setBooks] = useState([]);
  const [filterDelete, setFilter] = useState({});


  useEffect(() => {

    const getUser = async() => {
        const res = await axios.get(`/author/show_single/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAuthor(res.data.result)
    }

    getUser()


  }, [id, token])


  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get('/audio/show_all');
      setBooks(res.data.books);
    };

    getBooks();
  }, []);

  
  useEffect(() => {
    if (author._id) {
      content.forEach((item) => {
        if (item.authorName === author._id) setFilter(item);
      });
    }
  }, [author._id, content]);




  if(Object.keys(author).length < 5) {
    return(<>
    
    <h1 className='text-center'>user is loading....</h1>
    </>)
  }

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
    await axios.delete(`/author/delete_author/${author._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.href = '/author_edit';
  };




  function ShowingUser() {
    let imagePath = author.AuthorImage.authorImageLink.replace(/\\/g, '/'); // Convert backslashes to forward slashes
   
    if (imagePath.startsWith('uploads/')) {
        let imageUrl = `http://localhost:5000/${imagePath}`;
        

        return (
            <>
            <Row className="justify-content-md-center">
            <Col md={6}  >
              <Card className="author-card d-flex align-items-center justify-content-center" >
                <Card.Img variant="top" src={imageUrl} alt="Book Image" width="50%" />
                <Card.Body>
                  <Card.Title>{author.AuthorName}</Card.Title>
                 
                   <div className="btn-group">
                    <Button variant="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                    
                     {filterDelete.authorName === author._id ? (
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

              </Col>
              </Row>

              <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Choose Action:</p>
              <ul>
                <li>
                  <a href={`/edit_info/${author._id}`}>Edit User Info</a>
                </li>
                <li>
                  <a href={`/update_user_image/${author._id}`}>Update Photo</a>
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
                  <a href={`/book_delete_all/${author._id}`}>Delete All Books At Once</a>
                </li>
                <li>
                  <a href={`/authors_books/${author._id}`}>Delete Select Books</a>
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

              </>)



    } else{

        let imageUrl = `http://localhost:5000${imagePath}`; 

        return (
            <>
             <Row className="justify-content-md-center">
            <Col md={6}  >
              <Card className="author-card d-flex align-items-center justify-content-center" >
                <Card.Img variant="top" src={imageUrl} alt="Book Image" width="50%" />
                <Card.Body>
                  <Card.Title>{author.AuthorName}</Card.Title>
                 
                   <div className="btn-group">
                    <Button variant="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                    
                     {filterDelete.authorName === author._id ? (
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

              </Col>
              </Row>

              <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Choose Action:</p>
              <ul>
                <li>
                  <a href={`/edit_info/${author._id}`}>Edit User Info</a>
                </li>
                <li>
                  <a href={`/update_user_image/${author._id}`}>Update Photo</a>
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
                  <a href={`/book_delete_all/${author._id}`}>Delete All Books At Once</a>
                </li>
                <li>
                  <a href={`/authors_books/${author._id}`}>Delete Select Books</a>
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




             
              </>)
    



    }
  




    
  }

    return(<>
    

    {
        ShowingUser()
    }
    
    
    </>)
}


export default ViewSingle