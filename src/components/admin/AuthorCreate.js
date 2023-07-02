import axios from "axios";
import { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'




function AuthorCreate() {
    const state = useContext(GlobalState);
    const token = state.token;
     
    const[values, setValues] = useState({AuthorName: "", AuthorLocation: "", AuthorEmail: "" })
    const[AuthorPhoneNumber, setNumber] = useState()
    const[AuthorImage, setImage] = useState("")

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    

    }


    const handleSubmit = async(event) => {
        event.preventDefault()
        let formData = new FormData();

    formData.append("AuthorName", values.AuthorName);
    formData.append("AuthorLocation", values.AuthorLocation)
    formData.append("AuthorEmail", values.AuthorEmail)
    formData.append("AuthorPhoneNumber",  AuthorPhoneNumber)
    formData.append("AuthorImage", AuthorImage)

     await axios.post("/author/create", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    window.location.href = `/books`


        
    }


       

    return(<>
        <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicAuthorImage">
                <Form.Label>upload author image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={event => setImage(event.target.files[0])}
                required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAuthorName">
                
                <Form.Control
                  type="text"
                  name="AuthorName"
                  value={ values.AuthorName }
                  onChange={handleChange}

                  placeholder="Author Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAuthorEmail">
                
                <Form.Control
                  type="text"
                  name="AuthorEmail"
                  value={values.AuthorEmail}
                  onChange={handleChange}
                
                  placeholder="write Author Email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput placeholder="author phone number"  name="AuthorPhoneNumber"
                  value={AuthorPhoneNumber}
                  onChange={setNumber}  /> 

              
            </Form.Group>


            
              <Form.Group className="mb-3" controlId="formBasicAuthorLocation">
                
                <Form.Control
                  type="text"
                  name="AuthorLocation"
                  value={values.AuthorLocation}
                  onChange={handleChange}
                
                  placeholder="write author location"
                  
                />
              </Form.Group>

              <Button variant="warning" type="submit">
                create your author
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>


    
    
    </>)
}

export default AuthorCreate