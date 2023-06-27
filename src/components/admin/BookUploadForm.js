import { useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import { useState } from "react"
import axios from "axios"
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function BookUploadForm() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const authorName = id
    const[values, setValues] = useState({ audioGenre: "", bookTitle: "", released: "" })
    const[audioBook, setAudio] = useState("")
    const[audioImage, setImage] = useState("")

   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    

    }

    const handleSubmit = async(event) => {
        event.preventDefault()

        let formData = new FormData()

        formData.append("authorName", authorName)
        formData.append("bookTitle", values.bookTitle)
        formData.append("audioGenre", values.audioGenre)
        formData.append("released", values.released)
        formData.append("audioImage", audioImage)
        formData.append("audioBook", audioBook)

         await axios.post("/audio/create_audio", formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        window.location.href = "/books"


    }


    return(<>
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicBookImage">
                <Form.Label>upload book image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={event => setImage(event.target.files[0])}
                required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBookAudio">
                <Form.Label>upload book audio</Form.Label>
                <Form.Control
                  type="file"
                  onChange={event => setAudio(event.target.files[0])}
                required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBookName">
                
                <Form.Control
                  type="text"
                  name="bookTitle"
                  value={ values.bookTitle }
                  onChange={handleChange}

                  placeholder="Book Title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBookGenre">
                
                <Form.Control
                  type="text"
                  name="audioGenre"
                  value={ values.audioGenre }
                  onChange={handleChange}

                  placeholder="Write Book Genre"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBookRelease">
                
                <Form.Control
                  type="date"
                  name="released"
                  value={ values.released }
                  onChange={handleChange}

                  placeholder="Book Release Date"
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                upload book
              </Button>
            </Form>
            </Col>
            </Row>
            </Container>
    
    </>)
}

export default BookUploadForm