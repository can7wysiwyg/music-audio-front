import { useParams } from "react-router-dom"
import axios from "axios";
import { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";


function UpdateUserImage() {
   const {id} = useParams()
   const state = useContext(GlobalState);
    const token = state.token;
    const[AuthorImage, setImage] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault()
        let formData = new FormData();

        formData.append("AuthorImage", AuthorImage)

        await axios.put(`https://audiobooksapi.onrender.com/author/update_profilePic/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        window.location.href = `/author_single/${id}`




    }

    

    return(<>
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
          <h1>upload new author image</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicAuthorImage">
                <Form.Label>upload author image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={event => setImage(event.target.files[0])}
                required/>
              </Form.Group>
              <Button variant="warning" type="submit">
                update author picture
              </Button>
    </Form>
    </Col>
    </Row>
    </Container>
    
    </>)
}

export default UpdateUserImage