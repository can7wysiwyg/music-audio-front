import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect,  } from 'react';
import { GlobalState } from '../../GlobalState';
import { useState } from 'react';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';




function ViewSingleBook() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const [singleBook, setSingleBook] = useState({});
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const getSingleBook = async () => {
          const res = await axios.get(`https://audiobooksapi.onrender.com/audio/show_single/${id}`);
          setSingleBook(res.data.book);
        };
    
        getSingleBook();
      }, [id]);

      if (Object.keys(singleBook).length < 8) {
        return (
          <>
            <h1 className="text-center">please wait as audio loads</h1>
          </>
        );
      }

      const handleEdit = () => {
        setShowModal(true);
      };

      const handleClose = () => {
        setShowModal(false);
        
      };

      const handleDelete = async() => {

        await axios.delete(`https://audiobooksapi.onrender.com/audio/delete_audio_book/${singleBook._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
    
        window.location.href = `/books`
    
      }
    
    


      function ShowBook() {

        const baseUrl = "https://audiobooksapi.onrender.com";
        let audioPath = singleBook.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
        let imagePath = singleBook.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
      
        
        if (audioPath.startsWith("uploads/") || audioPath.startsWith("/uploads/")) {
          const audioUrl = audioPath.startsWith("/") ? `${baseUrl}${audioPath}` : `${baseUrl}/${audioPath}`;
          const imageUrl = imagePath.startsWith("/") ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;

       
   return(   <>
            <Row className="justify-content-md-center">
            <Col md={6}  >

            <Card className="author-card d-flex align-items-center justify-content-center" >
                <Card.Img variant="top" src={imageUrl} alt="Author Image" width="50%" />
                <Card.Body>
                  <Card.Title> {singleBook.bookTitle} </Card.Title>
                  <div className="audio-player">
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
                 
                   <div className="btn-group">
                     <Button variant="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                     
                      
                       <Button variant="danger" onClick={handleDelete}>
                        Delete
                      </Button> 
                    
    
                  </div>  
     
    
                </Card.Body>
              </Card>
              <br />

              <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Edit the book's info:</p>
          <ul>
            <li>
              <a href={`/book_update_info/${singleBook._id}`}>update book info</a>
            </li>
            <li>
              <a href={`/book_update_audio/${singleBook._id}`}>update book audio</a>
            </li>
            <li>
              <a href={`/book_update_picture/${singleBook._id}`}>update book picture</a>
            </li>
            </ul>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>








            </Col>


</Row>

            </>)




    } else{

      let audioUrl = `${baseUrl}/${audioPath}`;
      let imageUrl = `${baseUrl}/${imagePath}`;
  

       
        return(   <>
            <Row className="justify-content-md-center">
            <Col md={6}  >

            <Card className="author-card d-flex align-items-center justify-content-center" >
                <Card.Img variant="top" src={imageUrl} alt="Author Image" width="50%" />
                <Card.Body>
                  <Card.Title> {singleBook.bookTitle} </Card.Title>

                  <div className="audio-player">
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
                 
                   <div className="btn-group">
                 <Button variant="primary" onClick={handleEdit}>
                      Edit
                    </Button>
                     
                     
                       <Button variant="danger" onClick={handleDelete}>
                        Delete
                      </Button> 
                    
    
                  </div>  
     
    
                </Card.Body>
              </Card>
              <br />


              <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Edit the book's info:</p>
          <ul>
            <li>
              <a href={`/book_update_info/${singleBook._id}`}>update book info</a>
            </li>
            <li>
              <a href={`/book_update_audio/${singleBook._id}`}>update book audio</a>
            </li>
            <li>
              <a href={`/book_update_picture/${singleBook._id}`}>update book picture</a>
            </li>
            </ul>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>









            </Col>


</Row>

            </>)


    
    }



      }
    
    
    


    return(<>


    {
        ShowBook()
    }
    
    </>)
}

export default ViewSingleBook