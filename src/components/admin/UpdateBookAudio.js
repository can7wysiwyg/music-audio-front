import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { useState } from "react";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function UpdateBookAudio() {
    const { id } = useParams();
    const state = useContext(GlobalState);
    const token = state.token;
    const [audioBook, setAudio] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();

    let formData = new FormData();

    formData.append("audioBook", audioBook);

    await axios.put(`https://audiobooksapi.onrender.com/audio/update_audio_only/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    window.location.href = `/book_single/${id}`



    }


    return(<div style={{marginTop: "2rem"}}>
    
<Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
          <h1>upload new book audio</h1>
 
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicBookAudio">
                <Form.Label>upload book audio</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => setAudio(event.target.files[0])}
                  required
                />
              </Form.Group>

              <Button variant="warning" type="submit">
                upload new audio
              </Button>

                </Form>
                </Col>
                </Row>
                </Container>

    
    
    
    </div>)
}

export default UpdateBookAudio